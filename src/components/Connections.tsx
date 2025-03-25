import Xarrow, { useXarrow } from "react-xarrows";
import { getPositionsFromConnection } from "../lib/gates";
import { Gate } from "../lib/types";
import { useEffect } from "react";

export default function Connections({ gate }: { gate: Gate; }) {
    const updateXarrow = useXarrow();
    
    useEffect(() => {
        const interval = setInterval(() => {
            updateXarrow();
        }, 1);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <>
            {gate.connections.map((conn) => {
                const pos = getPositionsFromConnection(gate, conn);
                if (pos == undefined) {
                    return <></>;
                }

                return (
                    <Xarrow
                        headSize={4}
                        strokeWidth={2}
                        key={conn.to}
                        startAnchor={"right"}
                        endAnchor={"left"}
                        start={conn.from}
                        end={conn.to}
                    />
                );
            })}
        </>
    );
}
