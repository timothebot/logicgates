import { useState } from "react";
import { Gate, AllowedGateActions, GateAction, Connection, ActiveSimulation, Uid, SelectedElements } from "@lib/types";
import logger from "@lib/utils/logger";
import { simulateGate } from "@lib/simulation";
import { getSimulationManagerFromStorage } from "@lib/utils/storage";
import { API } from "@sasza/react-panzoom";

export function useGateActions(
    activeGate: Gate,
    onGateUpdate: (gate: Gate) => void,
    panZoomRef: React.RefObject<API | null>,
) {
    const [activeSimulation, setActiveSimulation] = useState<ActiveSimulation>({
        activeElements: [],
        activeInputs: [],
    });
    const [selectedElements, setSelectedElements] = useState<SelectedElements>({
        selectedElements: [],
        selectedConnections: [],
    });

    // TODO: create a master context
    const [newConnections, setNewConnections] = useState<Uid[]>([]);

    function runSimulation(sim?: ActiveSimulation) {
        const currentSim = sim || activeSimulation;
        const manager = getSimulationManagerFromStorage();

        const newActiveSim: ActiveSimulation = {
            activeElements: [],
            activeInputs: [...currentSim.activeInputs],
        };

        // figure out input values and run actual simulation
        const inputs = activeGate.inputPins.map(pinId =>
            newActiveSim.activeInputs.includes(pinId),
        );
        const simulated = simulateGate(activeGate, inputs, manager);

        // update active elements from the result
        simulated.pinValues.forEach((value, key) => {
            if (value) {
                newActiveSim.activeElements.push(key);

                const gate = activeGate.virtualGates.find((vGate) =>
                    vGate.outputPins.includes(key) ||
                    (vGate.elementType == "output" && vGate.inputPins.includes(key)),
                );
                if (gate) {
                    newActiveSim.activeElements.push(gate.id);
                }
            }
        });

        setActiveSimulation(newActiveSim);
    }

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
                        const updatedGate = { ...activeGate };
                        updatedGate.connections.push({
                            from: newConnections[0],
                            to: data.pinId,
                        });
                        onGateUpdate(updatedGate);
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
                const updatedGate = { ...activeGate };
                const element = data.element;
                if (element.position.x == 0 && element.position.y == 0) {
                    const gridPos = panZoomRef.current?.getPosition();
                    const zoom = panZoomRef.current?.getZoom();
                    if (gridPos && zoom) {
                        element.position = {
                            x: -gridPos.x + window.innerWidth / 2 / zoom,
                            y: -gridPos.y + window.innerHeight / 2 / zoom
                        };
                        logger.log(element.position, gridPos, window.innerWidth, zoom);
                    }
                }
                updatedGate.virtualGates.push(element);
                if (element.elementType == "input") {
                    // TODO: set the index to highest + 1 (if n was deleted)
                    data.pins[0].index = updatedGate.inputPins.length;
                    updatedGate.inputPins.push(element.outputPins[0]);
                }
                if (element.elementType == "output") {
                    // TODO: set the index to highest + 1 (if n was deleted)
                    data.pins[0].index = updatedGate.outputPins.length;
                    updatedGate.outputPins.push(element.inputPins[0]);
                }
                updatedGate.virtualPins.push(...data.pins);
                onGateUpdate(updatedGate);
                break;
            }

            /**
             * Delete an element
             */
            case GateAction.DeleteElement: {
                const updatedGate = { ...activeGate };

                if (data.element) {
                    const element = data.element;
                    // Remove Input/Output pins from the gate object
                    if (data.element.elementType == "input") {
                        updatedGate.inputPins = updatedGate.inputPins.filter(
                            (pin) => !element.outputPins.includes(pin)
                        );
                    }
                    if (data.element.elementType == "output") {
                        updatedGate.outputPins = updatedGate.outputPins.filter(
                            (pin) => !element.inputPins.includes(pin)
                        );
                    }

                    // Remove connections, pins and the element itself
                    updatedGate.connections = updatedGate.connections.filter(
                        (conn) => {
                            return !(
                                element.inputPins.includes(conn.to) ||
                                element.outputPins.includes(conn.from)
                            );
                        },
                    );
                    updatedGate.virtualPins = updatedGate.virtualPins.filter(
                        (pin) => pin.gateId != element.id
                    );
                    updatedGate.virtualGates = updatedGate.virtualGates.filter(
                        (vGate) => vGate.id != element.id
                    );
                }
                if (data.connection) {
                    updatedGate.connections = updatedGate.connections.filter(
                        (conn) => conn != data.connection
                    );
                }

                onGateUpdate(updatedGate);
                break;
            }

            /**
             * Select element, handle shift etc.
             */
            case GateAction.SelectElement: {
                let newSelectedElements: Uid[] = [];
                let newSelectedConnections: Connection[] = [];

                const shiftKeyPressed = data.event && data.event.shiftKey;
                if (shiftKeyPressed) {
                    newSelectedElements = selectedElements.selectedElements;
                    newSelectedConnections =
                        selectedElements.selectedConnections;
                }
                if (data.element) {
                    const unselect = selectedElements.selectedElements.includes(
                        data.element.id,
                    );
                    if (shiftKeyPressed && unselect) {
                        newSelectedElements = newSelectedElements.filter(
                            (id) => id != data.element?.id,
                        );
                    }
                    if (!unselect) {
                        newSelectedElements.push(data.element.id);
                    }
                }
                if (data.connection) {
                    const unselect =
                        selectedElements.selectedConnections.includes(
                            data.connection,
                        );
                    if (shiftKeyPressed && unselect) {
                        newSelectedConnections = newSelectedConnections.filter(
                            (conn) => conn != data.connection,
                        );
                    }
                    if (!unselect) {
                        newSelectedConnections.push(data.connection);
                    }
                }
                setSelectedElements({
                    selectedElements: newSelectedElements,
                    selectedConnections: newSelectedConnections,
                });
                break;
            }

            case GateAction.ResetSelectedElements: {
                setSelectedElements({
                    selectedElements: [],
                    selectedConnections: [],
                });
                break;
            }
        }
    }

    return {
        activeSimulation,
        selectedElements,
        newConnections,
        setNewConnections,
        runSimulation,
        performGateAction,
    };
}
