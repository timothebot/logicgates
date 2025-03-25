import { useContext } from "react";
import { Uid } from "../lib/types";
import { IsConnectingContext } from "./Area";

export default function Pin({
    id,
    type,
    setIsConnecting,
}: {
    id: Uid;
    type: "input" | "output";
    setIsConnecting: (state: Uid[]) => void;
    }) {
    const isConnecting = useContext(IsConnectingContext);

    function onClick() {
        if (type == "input") {
            if (isConnecting.length === 1 && !isConnecting.includes(id)) {
                setIsConnecting([ ...isConnecting, id ]);
            }
            return;
        }
        if (isConnecting.length === 0) {
            setIsConnecting([ id ]);
        }
    }

    return (
        <>
            <div id={id} onClick={onClick} />
        </>
    );
}
