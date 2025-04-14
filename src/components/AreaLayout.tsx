import PanZoom, { API } from "@sasza/react-panzoom";
import { useContext, useRef } from "react";
import AreaElement from "@components/simulation/AreaElement";
import Connections from "@components/simulation/Connections";
import ArrowToCursor from "@components/editor/ArrowToCursor";
import AddElementSelector from "@components/editor/AddElementSelector";
import { EquippedToolContext } from "@/App";
import { EditorTool, Gate, PerformGateAction, Uid } from "@lib/types";

export default function AreaLayout({
    activeGate,
    performGateAction,
    newConnections,
    setLastElementChangedTime,
    panZoomRef,
}: {
    activeGate: Gate;
    performGateAction: PerformGateAction;
    newConnections: Uid[];
    setLastElementChangedTime: (date: number) => void;
    panZoomRef: React.RefObject<API | null>;
}) {
    const tool = useContext(EquippedToolContext);

    return (
        <div style={{ width: "100dvw", height: "100dvh" }}>
            <PanZoom
                onElementsChange={() => setLastElementChangedTime(Date.now())}
                onContextMenu={(props) => props.e.preventDefault()}
                height={2000}
                width={2000}
                selecting={tool == EditorTool.Select}
                zoomMin={0.5}
                boundary={{
                    left: 0,
                }}
                ref={panZoomRef}
            >
                {activeGate.virtualGates.map((vGate) => (
                    <AreaElement
                        activeGate={activeGate}
                        key={vGate.id}
                        performGateAction={performGateAction}
                        element={vGate}
                    />
                ))}
            </PanZoom>
            <Connections
                performGateAction={performGateAction}
                gate={activeGate}
            />
            {newConnections.length > 0 && (
                <ArrowToCursor connections={newConnections} />
            )}
            <AddElementSelector
                activeGate={activeGate}
                performGateAction={performGateAction}
            />
        </div>
    );
}
