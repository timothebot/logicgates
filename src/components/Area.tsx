import { Gate, GateAction } from "@lib/types";
import logger from "@lib/utils/logger";
import { createHistoryEntry, getHistoryEntry } from "@lib/utils/storage";
import { API } from "@sasza/react-panzoom";
import { useEffect, useRef, useState } from "react";
import ActiveSimulationContext from "@lib/contexts/ActiveSimulationContext";
import SelectedElementsContext from "@lib/contexts/SelectedElementsContext";
import { useGateActions } from "@lib/hooks/useGateAction";
import AreaLayout from "@components/AreaLayout";

export default function Area({
    activeGate,
    saveGate,
}: {
    activeGate: Gate;
    saveGate: (gate: Gate) => void;
}) {
    const panZoomRef = useRef<API>(null);

    const [editableGate, setEditableGate] = useState<Gate>(activeGate);

    const {
        activeSimulation,
        newConnections,
        runSimulation,
        performGateAction,
        selectedElements,
    } = useGateActions(
        editableGate,
        (updatedGate) => {
            setEditableGate(updatedGate);
            saveGate(updatedGate);
        },
        panZoomRef,
    );

    const [lastElementChangedTime, setLastElementChangedTime] =
        useState<number>(0);

    // TODO: this needed?
    useEffect(() => {
        save();
    }, [editableGate]);

    function save(gate?: Gate, createHistory: boolean = true) {
        const updatedGate = { ...(gate || editableGate) };
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
                selectedElements.selectedConnections.forEach((conn) => {
                    performGateAction({
                        type: GateAction.DeleteElement,
                        connection: conn,
                    });
                });
            }

            if (event.key == "a") {
                // TODO: Select all
            }

            if (event.key == "z" && event.metaKey) {
                const history = getHistoryEntry(editableGate);
                logger.log("History: ", history);
                if (history) {
                    setEditableGate(history);
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
        <ActiveSimulationContext value={activeSimulation}>
            <SelectedElementsContext value={selectedElements}>
                <AreaLayout
                    panZoomRef={panZoomRef}
                    activeGate={editableGate}
                    performGateAction={performGateAction}
                    newConnections={newConnections}
                    setLastElementChangedTime={setLastElementChangedTime}
                />
            </SelectedElementsContext>
        </ActiveSimulationContext>
    );
}
