import Xarrow, { useXarrow } from "react-xarrows";
import { Connection, GateAction, PerformGateAction } from "@lib/types";
import { MouseEvent, useContext, useEffect, useState } from "react";
import ActiveSimulationContext from "@lib/contexts/ActiveSimulationContext";
import SelectedElementsContext from "@lib/contexts/SelectedElementsContext";

const INACTIVE_COLOR = "oklch(0.208 0.042 265.755)";
const ACTIVE_COLOR = "oklch(0.715 0.143 215.221)";
const SELECTED_COLOR = "#ff3a3a";

export default function ConnectionArrow({
    conn,
    performGateAction,
}: {
    conn: Connection;
    performGateAction: PerformGateAction;
}) {
    const updateXarrow = useXarrow();
    const activeSimulation = useContext(ActiveSimulationContext);
    const selectedElements = useContext(SelectedElementsContext);
    const [isActive, setIsActive] = useState(false);
    const [color, setColor] = useState(INACTIVE_COLOR);

    useEffect(() => {
        const interval = setInterval(() => {
            updateXarrow();
        }, 1);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        if (selectedElements.selectedConnections.includes(conn)) {
            setColor(SELECTED_COLOR);
            return;
        }
        setColor(isActive ? ACTIVE_COLOR : INACTIVE_COLOR);
    }, [isActive, selectedElements]);

    useEffect(() => {
        setIsActive(
            activeSimulation.activeElements.includes(conn.from) ||
                activeSimulation.activeInputs.includes(conn.from),
        );
    }, [activeSimulation]);

    return (
        <Xarrow
            color={color}
            headSize={4}
            strokeWidth={2}
            path={"grid"}
            divContainerProps={{
                onClick: (event: MouseEvent) =>
                    performGateAction({
                        type: GateAction.SelectElement,
                        connection: conn,
                        event,
                    }),
            }}
            divContainerStyle={{
                cursor: "pointer",
                padding: "2px",
                background: "green",
            }}
            startAnchor={"right"}
            endAnchor={"left"}
            start={conn.from}
            end={conn.to}
        />
    );
}
