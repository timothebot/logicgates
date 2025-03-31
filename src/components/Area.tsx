import PanZoom, { API } from "@sasza/react-panzoom";
import AreaElement from "./AreaElement";
import { useContext, useEffect, useRef, useState } from "react";
import { EditorTool, Gate, InOut, Uid } from "../lib/types";
import { EquippedToolContext } from "../App";
import Connections from "./Connections";
import ArrowToCursor from "./ArrowToCursor";

const SAVE_INTERVAL_MS = 1000;

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
        </div>
    );
}
