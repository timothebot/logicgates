import { InOut, Uid } from "../lib/types";
import Pin from "./Pin";

export default function InputOutputArea({
    type,
    pins,
    updateNewConnections,
}: {
    type: InOut;
    pins: Uid[];
    updateNewConnections: (type: InOut, pinId: Uid) => void;
}) {
    return (
        <div
            className={
                "grid gap-y-2 border-slate-10 absolute bottom-1/2 flex min-h-8 -translate-y-1/2 gap-x-2 rounded border-1 bg-white p-2.5 shadow " +
                (type == "in" ? "left-2.5" : "right-2.5")
            }
        >
            {pins.map((pin) => {
                return (
                    <Pin
                        key={pin}
                        id={pin}
                        type={type}
                        updateNewConnections={updateNewConnections}
                    />
                );
            })}
        </div>
    );
}
