import { useContext } from "react";
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
        <div id={id} onClick={() => updateNewConnections(type, id)} />
    );
}
