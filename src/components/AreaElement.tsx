import { Element } from "@sasza/react-panzoom";
import { VirtualElement } from "../lib/types";

export default function AreaElement({ element }: { element: VirtualElement }) {
    return (
        <Element
            id={element.id}
            x={element.position.x}
            y={element.position.y}>
            <div className="element">
                <div className="input">
                    {element.inputPins.map(pin => <span id={pin} />)}
                </div>
                <div className="inner">
                    {element.gateType}
                </div>
                <div className="output">
                    {element.outputPins.map(pin => <span id={pin} />)}
                </div>
            </div>
        </Element>
    );
}
