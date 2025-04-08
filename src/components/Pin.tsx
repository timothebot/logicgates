import { InOut, Uid } from "../lib/types";
import { GateAction, PerformGateAction } from "@lib/types";

export default function Pin({
    id,
    type,
    performGateAction,
}: {
    id: Uid;
    type: InOut;
    performGateAction: PerformGateAction;
}) {
    return (
        <div
            className="block h-1.5 w-1.5 rounded-full bg-blue-700"
            id={id}
            onClick={() => {
                performGateAction({
                    type: GateAction.AddConnection,
                    connectionType: type,
                    pinId: id,
                });
            }}
        />
    );
}
