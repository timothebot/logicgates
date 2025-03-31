import { Element } from "@sasza/react-panzoom";
import { InOut, Uid, VirtualElement } from "../lib/types";
import Pin from "./Pin";
import { ReactNode } from "react";

export default function AreaElement({
    element,
    updateNewConnections,
}: {
    element: VirtualElement;
    updateNewConnections: (type: InOut, pinId: Uid) => void;
    }) {
    
    function getInnerContent(): ReactNode {
        switch (element.elementType) {
            case "gate": return <>{element.gateType}</>
            case "input":
            case "output": return <>Input/Output</>
        }
    }
    
    return (
        <Element id={element.id} x={element.position.x} y={element.position.y}>
            <div className="element">
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
