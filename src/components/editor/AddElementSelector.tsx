import { createVirtualGateFrom } from "@lib/gates";
import {
    ElementType,
    Gate,
    GateAction,
    PerformGateAction,
    Position,
} from "@lib/types";
import { listStoredGateTypes } from "@lib/utils/storage";
import { useEffect, useState } from "react";

type ElementOptions = {
    gateType: string;
    elementType: ElementType;
    label: string;
};

export default function AddElementSelector({
    activeGate,
    performGateAction,
}: {
    activeGate: Gate;
    performGateAction: PerformGateAction;
}) {
    const [elements, setElements] = useState<ElementOptions[]>([]);

    useEffect(() => {
        const elements: ElementOptions[] = listStoredGateTypes()
            .filter((type) => type != activeGate.gateType)
            .map((type) => {
                return {
                    gateType: type,
                    elementType: "gate",
                    label: type,
                };
            });
        elements.push(
            {
                gateType: "",
                elementType: "input",
                label: "Input",
            },
            {
                gateType: "",
                elementType: "output",
                label: "Output",
            },
            {
                gateType: "not",
                elementType: "gate",
                label: "NOT",
            },
            {
                gateType: "and",
                elementType: "gate",
                label: "AND",
            },
        );
        setElements(elements);
    }, [activeGate.gateType]);

    function handleClick(options: ElementOptions) {
        const result = createVirtualGateFrom(options.elementType, options.gateType);

        performGateAction({
            type: GateAction.AddElement,
            element: result.element,
            pins: result.pins,
        });
    }

    return (
        <div
            className={
                "absolute top-1/2 left-2.5 grid -translate-y-1/2 gap-y-1 scroll-auto rounded border-1 border-slate-500 bg-slate-100 p-2.5 shadow"
            }
        >
            {elements.map((el) => {
                return (
                    <button
                        className="cursor-pointer rounded bg-white p-2 text-left font-semibold uppercase shadow transition-colors hover:bg-blue-500 hover:text-white"
                        key={"element-" + el.label}
                        onClick={() => handleClick(el)}
                    >
                        {el.label}
                    </button>
                );
            })}
        </div>
    );
}
