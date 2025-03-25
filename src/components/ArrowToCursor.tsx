import Xarrow, { useXarrow } from "react-xarrows";
import { Uid } from "../lib/types";
import { useEffect } from "react";
import InvisibleCursor from "./InvisibleCursor";

export default function ArrowToCursor({ connections }: { connections: Uid[] }) {
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
            <InvisibleCursor />
            <Xarrow
                headSize={4}
                strokeWidth={2}
                startAnchor={"right"}
                endAnchor={"left"}
                start={connections[0]}
                end={"invisible-cursor"}
            />
        </>
    );
}
