import Xarrow, { useXarrow } from "react-xarrows";
import { getPositionsFromConnection } from "../lib/gates";
import { Gate, Position } from "../lib/types";
import { useEffect } from "react";

function isElementVisible(id: string): boolean {
    const rect = document.getElementById(id)?.getBoundingClientRect();
    if (!rect) {
        return true;
    }
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
    );
}

export default function Connections({ gate }: { gate: Gate }) {
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
            {gate.connections
                .filter((conn) => {
                    const pos = getPositionsFromConnection(gate, conn);
                    if (
                        pos == undefined ||
                        (!isElementVisible(conn.from) &&
                            !isElementVisible(conn.to))
                    ) {
                        return false;
                    }
                    return true;
                })
                .map((conn) => {
                    return (
                        <Xarrow
                            key={conn.to}
                            headSize={4}
                            strokeWidth={2}
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
