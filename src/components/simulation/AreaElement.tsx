import {
    ActiveSimulationContext,
    SelectedElementsContext,
} from "@components/Area";
import Pin from "@components/simulation/Pin";
import {
    Gate,
    GateAction,
    PerformGateAction,
    VirtualElement,
} from "@lib/types";
import logger from "@lib/utils/logger";
import { Element } from "@sasza/react-panzoom";
import { MouseEvent, ReactNode, useContext, useEffect, useState } from "react";

export default function AreaElement({
    activeGate,
    element,
    performGateAction,
}: {
    activeGate: Gate;
    element: VirtualElement;
    performGateAction: PerformGateAction;
}) {
    const activeSimulation = useContext(ActiveSimulationContext);
    const selectedElements = useContext(SelectedElementsContext);

    const [isActive, setIsActive] = useState(false);

    function handleClick(event: MouseEvent) {
        performGateAction({
            type: GateAction.SelectElement,
            element: element,
            event: event,
        });
    }
    function handleDoubleClick(_: any) {
        if (element.elementType == "input") {
            performGateAction({
                type: GateAction.ToggleInput,
                inputId: element.outputPins[0],
            });
        }
    }

    function getInnerContent(): ReactNode {
        switch (element.elementType) {
            case "gate":
                return <span className="uppercase">{element.gateType}</span>;
            case "input":
                return (
                    <>{element.label || getPinLabel(element.outputPins[0])}</>
                );
            case "output":
                return (
                    <>{element.label || getPinLabel(element.inputPins[0])}</>
                );
        }
    }

    function getPinLabel(pinId: string): string {
        return (
            activeGate.virtualPins
                .find((pin) => pin.id == pinId)
                ?.index.toString() || ""
        );
    }

    useEffect(() => {
        setIsActive(
            activeSimulation.activeElements.includes(element.id) ||
                activeSimulation.activeInputs.includes(element.outputPins[0]),
        );
    }, [activeSimulation]);

    return (
        <Element id={element.id} x={element.position.x} y={element.position.y}>
            <div
                title={element.label || element.gateType}
                className={
                    "flex cursor-pointer justify-center rounded text-center text-white shadow transition-all active:shadow-2xl " +
                    (isActive ? "bg-blue-500" : "bg-slate-400") +
                    " " +
                    (selectedElements.selectedElements.includes(element.id)
                        ? "outline-2 outline-red-500"
                        : isActive
                          ? "outline-blue-300"
                          : "outline-slate-300") +
                    " " +
                    (element.elementType == "gate"
                        ? "px-1.5 py-1"
                        : "min-w-8 p-2 outline-2 outline-offset-2" +
                          " " +
                          (element.elementType == "input"
                              ? "rounded-r-full pr-3"
                              : "rounded-l-full pl-3"))
                }
                onClick={handleClick}
                onDoubleClick={handleDoubleClick}
            >
                {element.inputPins.length > 0 && (
                    <div className="absolute top-0 left-0 flex h-full -translate-x-1/2 flex-col flex-wrap justify-center gap-1">
                        {element.inputPins.map((pin) => (
                            <Pin
                                label={getPinLabel(pin)}
                                key={pin}
                                id={pin}
                                type="in"
                                performGateAction={performGateAction}
                            />
                        ))}
                    </div>
                )}
                <div className="font-semibold select-none">
                    {getInnerContent()}
                </div>
                {element.outputPins.length > 0 && (
                    <div className="absolute top-0 right-0 flex h-full translate-x-1/2 flex-col flex-wrap justify-center gap-1">
                        {element.outputPins.map((pin) => (
                            <Pin
                                label={getPinLabel(pin)}
                                key={pin}
                                id={pin}
                                type="out"
                                performGateAction={performGateAction}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Element>
    );
}
