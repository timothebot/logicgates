import PanZoom, { API } from "@sasza/react-panzoom";
import AreaElement from "./AreaElement";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { EditorTool, Gate, Uid } from "../lib/types";
import { EquippedToolContext } from "../App";
import Connections from "./Connections";
import ArrowToCursor from "./ArrowToCursor";

export const IsConnectingContext = createContext<Uid[]>([]);

export default function Area({
    activeGate,
    setActiveGate,
}: {
    activeGate: Gate;
    setActiveGate: (gate: Gate) => void;
}) {
    const [isConnecting, setIsConnecting] = useState<Uid[]>([]);
    const panZoomRef = useRef<API>(null);
    const tool = useContext(EquippedToolContext);
    const [editableGate, setEditableGate] = useState<Gate>(activeGate);

    useEffect(() => {
        if (isConnecting.length == 2) {
            const updatedGate = { ...editableGate };
            updatedGate.connections.push({ from: isConnecting[0], to: isConnecting[1] });
            setEditableGate(updatedGate);
            setIsConnecting([]);
        }
    }, [isConnecting]);

    useEffect(() => {
        const saveInterval = setInterval(() => {
            const updatedGate = { ...editableGate };
            Object.values(panZoomRef.current?.getElements() || {}).forEach(element => {
                const gate = updatedGate.virtualGates.find(vGate => vGate.id == element.id);
                if (gate) {
                    gate.position = element.position;
                }
            })
            setActiveGate(editableGate);
        }, 1000);

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
                zoomMin={0.9}
                ref={panZoomRef}
            >
                <IsConnectingContext.Provider value={isConnecting}>
                    {editableGate.virtualGates.map((vGate) => (
                        <AreaElement
                            key={vGate.id}
                            setIsConnecting={setIsConnecting}
                            element={vGate}
                        />
                    ))}
                </IsConnectingContext.Provider>
            </PanZoom>
            <Connections gate={editableGate} />
            {isConnecting.length > 0 && (
                <ArrowToCursor connections={isConnecting} />
            )}
        </div>
    );
}
