import { InOut, Uid } from "../lib/types";

export default function Pin({
    id,
    type,
    updateNewConnections,
}: {
    id: Uid;
    type: InOut;
    updateNewConnections: (type: InOut, pinId: Uid) => void;
}) {
    return (
        <div
            className="bg-blue-700 w-1.5 h-1.5 block rounded-full"
            id={id} onClick={() => updateNewConnections(type, id)} />
    );
}
