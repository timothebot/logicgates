import { useRef, useState } from "react";
import { Gate } from "@lib/types";

export default function GateTitle({
    saveGate,
    activeGate,
}: {
    saveGate: (gate: Gate) => void;
    activeGate: Gate;
}) {
    const [isChanged, setIsChanged] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    function onGateNameChangeConfirm() {
        if (inputRef.current && inputRef.current.value.length >= 2) {
            // TODO: check if gate name already exists
            const updatedGate = { ...activeGate };
            updatedGate.gateType = inputRef.current.value.toLowerCase();
            saveGate(updatedGate);
            setIsChanged(false);
        }
    }

    return (
        <div className="fixed top-2 left-1/2 z-10 grid -translate-x-1/2 content-center">
            <input
                minLength={2}
                className="text-center text-2xl font-semibold hover:underline focus:outline-none"
                type="text"
                ref={inputRef}
                defaultValue={activeGate.gateType}
                onChange={() => setIsChanged(true)}
            ></input>
            {isChanged && (
                <button
                    onClick={onGateNameChangeConfirm}
                    className="mt-2 inline w-auto cursor-pointer rounded bg-blue-500 py-1 text-white shadow transition-colors hover:bg-blue-800">
                    Confirm
                </button>
            )}
        </div>
    );
}
