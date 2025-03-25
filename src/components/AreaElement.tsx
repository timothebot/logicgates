import { Element } from "@sasza/react-panzoom";
import { Uid, VirtualElement } from "../lib/types";
import Pin from "./Pin";

export default function AreaElement({
    element,
    setIsConnecting,
}: {
    element: VirtualElement;
    setIsConnecting: (state: Uid[]) => void;
}) {
    return (
        <Element id={element.id} x={element.position.x} y={element.position.y}>
            <div className="element">
                <div className="input">
                    {element.inputPins.map((pin) => (
                        <Pin
                            id={pin}
                            type="input"
                            setIsConnecting={setIsConnecting}
                        />
                    ))}
                </div>
                <div className="inner">{element.gateType}</div>
                <div className="output">
                    {element.outputPins.map((pin) => (
                        <Pin
                            id={pin}
                            type="output"
                            setIsConnecting={setIsConnecting}
                        />
                    ))}
                </div>
            </div>
        </Element>
    );
}
