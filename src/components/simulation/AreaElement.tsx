import {
    ActiveSimulationContext,
    SelectedElementsContext,
} from "@components/Area";
import Pin from "@components/simulation/Pin";
import { GateAction, PerformGateAction, VirtualElement } from "@lib/types";
import { Element } from "@sasza/react-panzoom";
import { MouseEvent, ReactNode, useContext, useEffect, useState } from "react";

export default function AreaElement({
    element,
    performGateAction,
}: {
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
                return <>{element.gateType}</>;
            case "input":
                return <>Input</>;
            case "output":
                return <>Output</>;
        }
    }

    useEffect(() => {
        setIsActive(
            activeSimulation.activeElements.includes(element.id) ||
                activeSimulation.activeInputs.includes(element.id),
        );
    }, [activeSimulation]);

    return (
        <Element id={element.id} x={element.position.x} y={element.position.y}>
            <div
                className={
                    "element" +
                    (isActive ? " active" : "") +
                    (selectedElements.selectedElements.includes(element.id)
                        ? " selected"
                        : "")
                }
                onClick={handleClick}
                onDoubleClick={handleDoubleClick}
            >
                {element.inputPins.length > 0 && (
                    <div className="input">
                        {element.inputPins.map((pin) => (
                            <Pin
                                key={pin}
                                id={pin}
                                type="in"
                                performGateAction={performGateAction}
                            />
                        ))}
                    </div>
                )}
                <div className="inner">{getInnerContent()}</div>
                {element.outputPins.length > 0 && (
                    <div className="output">
                        {element.outputPins.map((pin) => (
                            <Pin
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
