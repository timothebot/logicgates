import Xarrow, { useXarrow } from "react-xarrows";
import { Connection } from "../lib/types";
import { useContext, useEffect, useState } from "react";
import { ActiveSimulationContext } from "./Area";

const INACTIVE_COLOR = "oklch(0.208 0.042 265.755)";
const ACTIVE_COLOR = "oklch(0.715 0.143 215.221)";

export default function ConnectionArrow({ conn }: { conn: Connection; }) {
    const updateXarrow = useXarrow();
    const activeSimulation = useContext(ActiveSimulationContext);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            updateXarrow();
        }, 1);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        setIsActive(activeSimulation.activeElements.includes(conn.from) ||
            activeSimulation.activeInputs.includes(conn.from));
    }, [activeSimulation])
    
    return (
        <Xarrow
            color={isActive ? ACTIVE_COLOR : INACTIVE_COLOR}
            headSize={4}
            strokeWidth={2}
            path={"grid"}
            startAnchor={"right"}
            endAnchor={"left"}
            start={conn.from}
            end={conn.to}
        />
    );
    
}