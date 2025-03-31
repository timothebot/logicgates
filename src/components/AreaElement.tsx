import { Element } from "@sasza/react-panzoom";
import { InOut, Uid, VirtualElement } from "../lib/types";
import Pin from "./Pin";
import { ReactNode, useContext, useEffect, useState } from "react";
import { ActiveSimulationContext } from "./Area";

export default function AreaElement({
    element,
    updateNewConnections,
    toggleInput,
}: {
    element: VirtualElement;
    updateNewConnections: (type: InOut, pinId: Uid) => void;
    toggleInput: (inputId: Uid) => void;
    }) {
    const activeSimulation = useContext(ActiveSimulationContext);
    const [isActive, setIsActive] = useState(false);

    function handleClick(event: any) {
        if (element.elementType == "input") {
            toggleInput(element.id);
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
        setIsActive(activeSimulation.activeElements.includes(element.id) ||
            activeSimulation.activeInputs.includes(element.id));
    }, [activeSimulation])

    return (
        <Element id={element.id} x={element.position.x} y={element.position.y}>
            <div
                className={"element " + (isActive ? "active" : "")} onDoubleClick={handleClick}>
                {element.inputPins.length > 0 && (
                    <div className="input">
                        {element.inputPins.map((pin) => (
                            <Pin
                                key={pin}
                                id={pin}
                                type="in"
                                updateNewConnections={updateNewConnections}
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
                                updateNewConnections={updateNewConnections}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Element>
    );
}
