import AddElementSelector from "@components/editor/AddElementSelector";
import AreaElement from "@components/simulation/AreaElement";
import ArrowToCursor from "@components/editor/ArrowToCursor";
import Connections from "@components/simulation/Connections";
import { simulateGate } from "@lib/simulation";
import {
    ActiveSimulation,
    AllowedGateActions,
    EditorTool,
    Gate,
    GateAction,
    Position,
    SelectedElements,
    Uid,
} from "@lib/types";
import logger from "@lib/utils/logger";
import { EquippedToolContext } from "@/App";
import { createHistoryEntry, getHistoryEntry, getSimulationManagerFromStorage } from "@lib/utils/storage";
import PanZoom, { API } from "@sasza/react-panzoom";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const SAVE_INTERVAL_MS = 1000;

export const ActiveSimulationContext = createContext<ActiveSimulation>({
    activeElements: [],
    activeInputs: [],
});

export const SelectedElementsContext = createContext<SelectedElements>({
    selectedElements: [],
});

export default function Area({
    activeGate,
    saveGate,
}: {
    activeGate: Gate;
    saveGate: (gate: Gate) => void;
}) {
    const panZoomRef = useRef<API>(null);

    const tool = useContext(EquippedToolContext);

    const [newConnections, setNewConnections] = useState<Uid[]>([]);
    const [editableGate, setEditableGate] = useState<Gate>(activeGate);
    const [activeSimulation, setActiveSimulation] = useState<ActiveSimulation>({
        activeElements: [],
        activeInputs: [],
    });
    const [selectedElements, setSelectedElements] = useState<SelectedElements>({
        selectedElements: [],
    });
    const [elementSelectorPosition, setElementSelectorPosition] =
        useState<Position>({ x: 0, y: 0 });
    const [lastElementChangedTime, setLastElementChangedTime] =
        useState<number>(0);

    /**
     * Master function that handles all actions performed on the gate
     * @param {AllowedGateActions} data Payload type depending on what action is selected
     */
    function performGateAction(data: AllowedGateActions) {
        logger.verbose("Performing gate action", data);
        switch (data.type) {
            /**
             * Handles new connecting
             */
            case GateAction.AddConnection: {
                if (data.connectionType == "in") {
                    if (
                        newConnections.length === 1 &&
                        !newConnections.includes(data.pinId)
                    ) {
                        const updatedGate = { ...editableGate };
                        updatedGate.connections.push({
                            from: newConnections[0],
                            to: data.pinId,
                        });
                        setEditableGate(updatedGate);
                        setNewConnections([]);
                    }
                    break;
                }
                if (newConnections.length === 0) {
                    setNewConnections([data.pinId]);
                }
                break;
            }

            /**
             * Toggles an input and recalculates the simulation
             */
            case GateAction.ToggleInput: {
                const newActiveSimulation = { ...activeSimulation };
                if (activeSimulation.activeInputs.includes(data.inputId)) {
                    newActiveSimulation.activeInputs =
                        newActiveSimulation.activeInputs.filter(
                            (id) => id != data.inputId,
                        );
                } else {
                    newActiveSimulation.activeInputs.push(data.inputId);
                }
                runSimulation(newActiveSimulation);
                break;
            }

            /**
             * Add a new element
             */
            case GateAction.AddElement: {
                const updatedGate = { ...editableGate };
                const element = data.element;
                updatedGate.virtualGates.push(element);
                if (element.elementType == "input") {
                    data.pins[0].index = updatedGate.inputPins.length;
                    updatedGate.inputPins.push(element.outputPins[0]);
                }
                if (element.elementType == "output") {
                    data.pins[0].index = updatedGate.outputPins.length;
                    updatedGate.outputPins.push(element.inputPins[0]);
                }
                updatedGate.virtualPins.push(...data.pins);
                setEditableGate(updatedGate);
                setElementSelectorPosition({ x: 0, y: 0 });
                break;
            }

            /**
             * Delete an element
             */
            case GateAction.DeleteElement: {
                const updatedGate = { ...editableGate };

                // Remove Input/Output pins from the gate object
                if (data.element.elementType == "input") {
                    updatedGate.inputPins = updatedGate.inputPins.filter(
                        (pin) => {
                            return !data.element.outputPins.includes(pin);
                        },
                    );
                }
                if (data.element.elementType == "output") {
                    updatedGate.outputPins = updatedGate.outputPins.filter(
                        (pin) => {
                            return !data.element.inputPins.includes(pin);
                        },
                    );
                }

                // Remove connections, pins and the element itself
                updatedGate.connections = updatedGate.connections.filter(
                    (conn) => {
                        return !(
                            data.element.inputPins.includes(conn.to) ||
                            data.element.outputPins.includes(conn.from)
                        );
                    },
                );
                updatedGate.virtualPins = updatedGate.virtualPins.filter(
                    (pin) => {
                        return pin.gateId != data.element.id;
                    },
                );
                updatedGate.virtualGates = updatedGate.virtualGates.filter(
                    (vGate) => {
                        return vGate.id != data.element.id;
                    },
                );
                setEditableGate(updatedGate);
                break;
            }

            /**
             * Select element, handle shift etc.
             */
            case GateAction.SelectElement: {
                const unselect = selectedElements.selectedElements.includes(
                    data.element.id,
                );
                let newSelectedElements: Uid[] = [];
                if (data.event && data.event.shiftKey) {
                    newSelectedElements = selectedElements.selectedElements;
                    if (unselect) {
                        newSelectedElements = newSelectedElements.filter(
                            (id) => id != data.element.id,
                        );
                    }
                }
                if (!unselect) {
                    newSelectedElements.push(data.element.id);
                }
                setSelectedElements({ selectedElements: newSelectedElements });
                break;
            }

            case GateAction.ResetSelectedElements: {
                setSelectedElements({
                    selectedElements: [],
                });
                break;
            }
        }
    }

    useEffect(() => {
        save();
    }, [editableGate])

    function handleClick({ e }: { e: MouseEvent }) {
        if (e.shiftKey) {
            // activate the AddElementSelector
            setElementSelectorPosition({
                x: e.clientX,
                y: e.clientY,
            });
        }
    }

    function runSimulation(simulation?: ActiveSimulation) {
        const currentSimulation = simulation || activeSimulation;
        logger.log(currentSimulation);
        const newActiveSimulation: ActiveSimulation = {
            activeElements: [],
            activeInputs: [...currentSimulation.activeInputs],
        };

        const inputs = activeGate.inputPins.map((pinId) => {
            logger.log(pinId);
            return newActiveSimulation.activeInputs.includes(pinId);
        });
        const manager = getSimulationManagerFromStorage();
        const simulatedResult = simulateGate(activeGate, inputs, manager);

        simulatedResult.pinValues.forEach((value, key) => {
            if (value) {
                newActiveSimulation.activeElements.push(key);

                const gate = activeGate.virtualGates.find((vGate) =>
                    vGate.inputPins.includes(key),
                );
                if (gate) {
                    newActiveSimulation.activeElements.push(gate.id);
                }
            }
        });

        setActiveSimulation(newActiveSimulation);
    }

    function save(gate?: Gate, createHistory: boolean = true) {
        const updatedGate = { ...gate || editableGate };
        Object.values(panZoomRef.current?.getElements() || {}).forEach(
            (element) => {
                const gate = updatedGate.virtualGates.find(
                    (vGate) => vGate.id == element.id,
                );
                if (gate) {
                    gate.position = element.position;
                }
            },
        );
        logger.verbose("Saving");
        saveGate(updatedGate);
        if (createHistory) {
            createHistoryEntry(updatedGate);
        }
    }

    useEffect(() => {
        // Run the simulation when the page is loaded
        setTimeout(() => {
            // without this timeout, not all arrows are rendered...
            runSimulation();
        }, 10);
    }, []);

    useEffect(() => {
        // Handle key inputs
        function handleKeyEvents(event: KeyboardEvent) {
            logger.debug(`Key '${event.key}' was pressed`);

            if (event.key == "Backspace") {
                logger.verbose("deleting", selectedElements);
                selectedElements.selectedElements.forEach((elementId) => {
                    const target = activeGate.virtualGates.find(
                        (vGate) => vGate.id == elementId,
                    );
                    if (target) {
                        performGateAction({
                            type: GateAction.DeleteElement,
                            element: target,
                        });
                    }
                });
            }

            if (event.key == "a") {
                // TODO: Select all
            }

            if (event.key == "z" && event.metaKey) {
                const history = getHistoryEntry(editableGate);
                logger.log("History: ", history)
                if (history) {
                    setEditableGate(history)
                    // save(history, false)
                }
            }
        }

        document.addEventListener("keydown", handleKeyEvents);
        return () => {
            document.removeEventListener("keydown", handleKeyEvents);
        };
    }, [selectedElements]);

    /**
     * Save after an element was moved
     */
    useEffect(() => {
        if (lastElementChangedTime == 0) {
            return;
        }
        const timeout = setTimeout(() => {
            save();
        }, 200);
        return () => {
            clearTimeout(timeout);
        };
    }, [lastElementChangedTime]);

    return (
        <div style={{ width: "100dvw", height: "100dvh" }}>
            <ActiveSimulationContext value={activeSimulation}>
                <SelectedElementsContext value={selectedElements}>
                    <PanZoom
                        onElementsChange={() =>
                            setLastElementChangedTime(Date.now())
                        }
                        onContextMenu={(props) => props.e.preventDefault()}
                        onContainerClick={handleClick}
                        height={2000}
                        width={2000}
                        selecting={tool == EditorTool.Select}
                        zoomMin={0.5}
                        boundary={{
                            left: 0,
                        }}
                        ref={panZoomRef}
                    >
                        {editableGate.virtualGates.map((vGate) => (
                            <AreaElement
                                key={vGate.id}
                                performGateAction={performGateAction}
                                element={vGate}
                            />
                        ))}
                    </PanZoom>
                    <Connections gate={editableGate} />
                    {newConnections.length > 0 && (
                        <ArrowToCursor connections={newConnections} />
                    )}
                    <AddElementSelector
                        position={elementSelectorPosition}
                        performGateAction={performGateAction}
                    />
                </SelectedElementsContext>
            </ActiveSimulationContext>
        </div>
    );
}
