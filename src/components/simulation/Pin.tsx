import { InOut, Uid, GateAction, PerformGateAction } from "@lib/types";

export default function Pin({
    id,
    type,
    performGateAction,
    label,
}: {
    id: Uid;
    type: InOut;
    performGateAction: PerformGateAction;
    label: string;
}) {
    return (
        <div
            className="group relative block h-1.5 w-1.5 rounded-full bg-blue-700"
            id={id}
            onClick={() => {
                performGateAction({
                    type: GateAction.AddConnection,
                    connectionType: type,
                    pinId: id,
                });
            }}
        >
            <span
                className={
                    "absolute top-1/2 -translate-y-1/2 text-xs font-semibold text-blue-700 opacity-0 group-hover:opacity-100 " +
                    (type == "in" ? "right-2" : "left-2")
                }
            >
                {label}
            </span>
        </div>
    );
}
