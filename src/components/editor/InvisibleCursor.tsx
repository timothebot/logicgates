import { useEffect, useState } from "react";
import { Position } from "@lib/types";

export default function InvisibleCursor() {
    const [mousePos, setMousePos] = useState<Position>({ x: 0, y: 0 });

    const onMouseMove = (e: MouseEvent) =>
        setMousePos({ x: e.clientX, y: e.clientY });

    useEffect(() => {
        document.addEventListener("mousemove", onMouseMove);

        return () => {
            document.removeEventListener("mousemove", onMouseMove);
        };
    }, []);

    return (
        <div
            id="invisible-cursor"
            style={{
                top: mousePos.y,
                left: mousePos.x,
            }}
            className="pointer-events-none absolute select-none"
        />
    );
}
