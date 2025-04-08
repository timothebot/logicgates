import { AND_GATE, NOT_GATE } from "@lib/default_gates";
import {
    ElementType,
    Gate,
    GateAction,
    PerformGateAction,
    Pin,
    Position,
    Uid,
} from "@lib/types";
import { getGateFromStorage, listStoredGateTypes } from "@lib/utils/storage";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type ElementOptions = {
    gateType: string;
    elementType: ElementType;
    label: string;
};

export default function AddElementSelector({
    activeGate,
    position,
    performGateAction,
}: {
    activeGate: Gate,
    position: Position;
    performGateAction: PerformGateAction;
}) {
    const [elements, setElements] = useState<ElementOptions[]>([]);

    useEffect(() => {
        const elements: ElementOptions[] = listStoredGateTypes().map((type) => {
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
                label: "AND"
            }
        );
        setElements(elements);
    }, [position]);

    function handleClick(options: ElementOptions) {
        let inputPins: Uid[] = [];
        let outputPins: Uid[] = [];
        const pins: Pin[] = [];
        const gateId = uuidv4();

        if (options.elementType == "gate") {
            let targetGate;
            if (options.gateType == "and") {
                targetGate = AND_GATE;
            } else if (options.gateType == "not") {
                targetGate = NOT_GATE;
            } else {
                targetGate = getGateFromStorage(options.gateType);
            }
            targetGate.inputPins.forEach((pin) => {
                const uid = uuidv4();
                inputPins.push(uid);
                pins.push({
                    id: uid,
                    gateId: gateId,
                    index:
                        targetGate.virtualPins.find((p) => p.id == pin)
                            ?.index || 0,
                });
            });
            targetGate.outputPins.forEach((pin) => {
                const uid = uuidv4();
                outputPins.push(uid);
                pins.push({
                    id: uid,
                    gateId: gateId,
                    index:
                        targetGate.virtualPins.find((p) => p.id == pin)
                            ?.index || 0,
                });
            });
        } else {
            const uid = uuidv4();
            inputPins = options.elementType == "input" ? [] : [uid];
            outputPins = options.elementType == "output" ? [] : [uid];
            pins.push({
                id: uid,
                gateId: options.elementType == "input" ? "in" : "out",
                index: 0,
            });
        }

        performGateAction({
            type: GateAction.AddElement,
            element: {
                id: gateId,
                position: position,
                gateType: options.gateType,
                elementType: options.elementType,
                inputPins,
                outputPins,
            },
            pins,
        });
    }

    return (
        <div
            className={
                "absolute grid gap-x-2 rounded border-1 scroll-auto border-slate-100 bg-white p-2.5 shadow " +
                (position.x == 0 ? "opacity-0" : "")
            }
            style={{
                top: position.y,
                left: position.x,
            }}
        >
            {elements.map((el) => {
                return (
                    <button
                        className="shadow rounded p-2 text-left hover:bg-blue-300 cursor-pointer"
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
