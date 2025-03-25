import PanZoom, { API } from "@sasza/react-panzoom";
import AreaElement from "./AreaElement";
import { getPositionsFromConnection } from "../lib/gates";
import Xarrow, { useXarrow } from "react-xarrows";
import { useContext, useEffect, useRef } from "react";
import { EditorTool, Gate } from "../lib/types";
import { EquippedToolContext } from "../App";

export default function Area({ activeGate }: { activeGate: Gate }) {
    const updateXarrow = useXarrow();
    const panZoomRef = useRef<API>(null);
    const tool = useContext(EquippedToolContext);

    useEffect(() => {
        const interval = setInterval(() => {
            updateXarrow();
        }, 1);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div style={{ width: "100dvw", height: "100dvh" }}>
            <PanZoom
                height={2000}
                width={2000}
                selecting={tool == EditorTool.Select}
                boundary={true}
                zoomMin={0.9}
                ref={panZoomRef}
            >
                {activeGate.virtualGates.map((vGate) => (
                    <AreaElement key={vGate.id} element={vGate} />
                ))}
            </PanZoom>
            {activeGate.connections.map((conn) => {
                const pos = getPositionsFromConnection(activeGate, conn);
                if (pos == undefined) {
                    return <></>;
                }

                return (
                    <Xarrow
                        headSize={4}
                        strokeWidth={2}
                        key={conn.to}
                        // path={"grid"}
                        startAnchor={"right"}
                        endAnchor={"left"}
                        start={conn.from}
                        end={conn.to}
                    />
                );
            })}
        </div>
    );
}
