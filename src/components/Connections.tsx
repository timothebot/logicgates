import { getPositionsFromConnection } from "../lib/gates";
import { Gate } from "../lib/types";
import logger from "../lib/utils/logger";
import ConnectionArrow from "./ConnectionArrow";

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

export default function Connections({ gate }: { gate: Gate; }) {
    return (
        <>
            {gate.connections
                .filter((conn) => {
                    const pos = getPositionsFromConnection(gate, conn);
                    if (gate.inputPins.includes(conn.from) || gate.outputPins.includes(conn.to)) {
                        return true;
                    }

                    if (
                        pos == undefined ||
                        (!isElementVisible(conn.from) &&
                        !isElementVisible(conn.to))
                    ) {
                        logger.error(conn, pos)
                        return false;
                    }
                    return true;
                })
                .map((conn) => {
                    return <ConnectionArrow key={conn.from + conn.to} conn={conn} />
                })}
        </>
    );
}
