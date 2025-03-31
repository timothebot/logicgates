import PanZoom, { API } from "@sasza/react-panzoom";
import AreaElement from "./AreaElement";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { ActiveSimulation, EditorTool, Gate, InOut, Uid } from "../lib/types";
import { EquippedToolContext } from "../App";
import Connections from "./Connections";
import ArrowToCursor from "./ArrowToCursor";
import { getSimulationManagerFromStorage } from "../lib/utils/storage";
import { simulateGate } from "../lib/gates";

const SAVE_INTERVAL_MS = 1000;

export const ActiveSimulationContext = createContext<ActiveSimulation>({
    activeElements: [],
    activeInputs: [],
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

    function updateNewConnections(type: InOut, pinId: Uid) {
        if (type == "in") {
            if (
                newConnections.length === 1 &&
                !newConnections.includes(pinId)
            ) {
                const updatedGate = { ...editableGate };
                updatedGate.connections.push({
                    from: newConnections[0],
                    to: pinId,
                });
                console.log(updatedGate.connections.length);
                setEditableGate(updatedGate);
                setNewConnections([]);
            }
            return;
        }
        if (newConnections.length === 0) {
            setNewConnections([pinId]);
        }
    }

    useEffect(() => {
        // without this timeout, not all arrows are rendered...
        // no idea why
        setTimeout(() => {
            runSimulation();
        }, 10)

    }, []);

    function runSimulation(simulation?: ActiveSimulation) {
        const currentSimulation = simulation || activeSimulation;
        const newActiveSimulation: ActiveSimulation = {
            activeElements: [],
            activeInputs: [...currentSimulation.activeInputs]
         };

        const inputs = activeGate.inputPins.map((pinId) => {
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
     * Toggles an input and then simulates the gate
     */
    function toggleInput(inputId: Uid) {
        const newActiveSimulation = { ...activeSimulation };
        if (activeSimulation.activeInputs.includes(inputId)) {
            newActiveSimulation.activeInputs =
                newActiveSimulation.activeInputs.filter((id) => id != inputId);
        } else {
            newActiveSimulation.activeInputs.push(inputId);
        }
        runSimulation(newActiveSimulation)
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

    return (
        <div style={{ width: "100dvw", height: "100dvh" }}>
            <ActiveSimulationContext value={activeSimulation}>
                <PanZoom
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
                            toggleInput={toggleInput}
                            updateNewConnections={updateNewConnections}
                            element={vGate}
                        />
                    ))}
                </PanZoom>
                {/* 
            <InputOutputArea
                type={"in"}
                pins={activeGate.inputPins}
                updateNewConnections={updateNewConnections}
            />
            <InputOutputArea
                type={"out"}
                pins={activeGate.outputPins}
                updateNewConnections={updateNewConnections}
            />
            */}
                <Connections gate={editableGate} />
                {newConnections.length > 0 && (
                    <ArrowToCursor connections={newConnections} />
                )}
            </ActiveSimulationContext>
        </div>
    );
}
