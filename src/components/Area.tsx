import PanZoom, { API } from "@sasza/react-panzoom";
import AreaElement from "./AreaElement";
import { createContext, MouseEvent, useContext, useEffect, useRef, useState } from "react";
import {
    ActiveSimulation,
    EditorTool,
    Gate,
    InOut,
    Uid,
    VirtualElement,
    Position,
    Pin,
    SelectedElements,
} from "../lib/types";
import { EquippedToolContext } from "../App";
import Connections from "./Connections";
import ArrowToCursor from "./ArrowToCursor";
import { getSimulationManagerFromStorage } from "../lib/utils/storage";
import { simulateGate } from "../lib/simulation";
import AddElementSelector from "./AddElementSelector";
import logger from "../lib/utils/logger";

const SAVE_INTERVAL_MS = 1000;

export const ActiveSimulationContext = createContext<ActiveSimulation>({
    activeElements: [],
    activeInputs: [],
});

export const SelectedElementsContext = createContext<SelectedElements>({
    selectedElements: [],
});

export enum GateAction {
    ToggleInput,
    AddElement,
    AddConnection,
    DeleteElement,
    SelectElement,
    ResetSelectedElements
}

type ToggleInputAction = {
    type: GateAction.ToggleInput;
    inputId: Uid;
};

type ElementAction = {
    element: VirtualElement;
};

type AddElementAction = ElementAction & {
    type: GateAction.AddElement;
    pins: Pin[];
};

type DeleteElementAction = ElementAction & {
    type: GateAction.DeleteElement;
};

type SelectElementAction = ElementAction & {
    type: GateAction.SelectElement;
    event?: MouseEvent;
};

type AddConnectionAction = {
    type: GateAction.AddConnection;
    connectionType: InOut;
    pinId: Uid;
};

type ResetSelectedElementsAction = {
    type: GateAction.ResetSelectedElements;
};

type AllowedGateActions =
    | ToggleInputAction
    | AddElementAction
    | DeleteElementAction
    | SelectElementAction
    | ResetSelectedElementsAction
    | AddConnectionAction;

export type PerformGateAction = (data: AllowedGateActions) => void;

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
    const [selectedElements, setSelectedElements] =
        useState<SelectedElements>({
            selectedElements: [],
        });
    const [elementSelectorPosition, setElementSelectorPosition] =
        useState<Position>({ x: 0, y: 0 });

    /**
     * Master function that handles all actions performed on the gate
     * @param {AllowedGateActions} data Payload type depending on what action is selected
     */
    function performGateAction(data: AllowedGateActions) {
        switch (data.type) {
            /**
             * Handles new connecting
             */
            case GateAction.AddConnection:
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

            /**
             * Toggles an input and recalculates the simulation
             */
            case GateAction.ToggleInput:
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

            /**
             * Add a new element
             */
            case GateAction.AddElement:
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

            /**
             * Delete an element
             */
            case GateAction.DeleteElement:
                // TODO
                break;
            
            /**
             * Select element, handle shift etc.
             */
            case GateAction.SelectElement:
                const unselect = selectedElements.selectedElements.includes(data.element.id);
                let newSelectedElements: Uid[] = [];
                if (data.event && data.event.shiftKey) {
                    newSelectedElements = selectedElements.selectedElements;
                    if (unselect) {
                        newSelectedElements = newSelectedElements.filter(id => id != data.element.id);
                    }
                }
                if (!unselect) {
                    newSelectedElements.push(data.element.id);
                }
                setSelectedElements({ selectedElements: newSelectedElements });
                break;

            case GateAction.ResetSelectedElements:
                setSelectedElements({
                    selectedElements: []
                });
                break;
        }
    }

    function handleClick(props: any) {
        performGateAction({
            type: GateAction.ResetSelectedElements
        });
        if (props.e.shiftKey) {
            // activate the AddElementSelector
            setElementSelectorPosition({
                x: props.e.clientX,
                y: props.e.clientY,
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

    /**
     * Save the game every SAVE_INTERVAL_MS
     */
    useEffect(() => {
        const saveInterval = setInterval(() => {
            const updatedGate = { ...editableGate };
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
            saveGate(editableGate);
        }, SAVE_INTERVAL_MS);

        return () => {
            clearInterval(saveInterval);
        };
    }, [editableGate, activeGate]);

    useEffect(() => {
        // Run the simulation when the page is loaded
        setTimeout(() => {
            // without this timeout, not all arrows are rendered...
            // no idea why
            runSimulation();
        }, 10);

        // Handle key inputs
        function handleKeyEvents(event: KeyboardEvent) {


        }

        document.addEventListener("keydown", handleKeyEvents);
        return () => {
            document.removeEventListener("keydown", handleKeyEvents);
        }
    }, []);

    return (
        <div style={{ width: "100dvw", height: "100dvh" }}>
            <ActiveSimulationContext value={activeSimulation}>
                <SelectedElementsContext value={selectedElements}>
                    <PanZoom
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
