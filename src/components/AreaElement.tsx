import { Element } from "@sasza/react-panzoom";
import { InOut, Uid, VirtualElement } from "../lib/types";
import Pin from "./Pin";

export default function AreaElement({
    element,
    updateNewConnections,
}: {
    element: VirtualElement;
    updateNewConnections: (type: InOut, pinId: Uid) => void;
}) {
    return (
        <Element id={element.id} x={element.position.x} y={element.position.y}>
            <div className="element">
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
                <div className="inner">{element.gateType}</div>
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
            </div>
        </Element>
    );
}
