import { useEffect, useState } from "react";
import { listStoredGateTypes, setCurrentGateInStorage } from "../lib/utils/storage";

export default function GateLoader({ reloadGateType }: { reloadGateType: (gateType?: string) => void; }) {
    const [isOpen, setIsOpen] = useState(true);

    const storedGates = listStoredGateTypes();

    function onKeyDown(event: KeyboardEvent) {
        if (event.key == "Escape") {
            setIsOpen(true);
        }
    }

    function onGateTypeSelect(gateType: string) {
        setCurrentGateInStorage(gateType);
        setIsOpen(false);
        reloadGateType(gateType);
    }

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown)
        return () => {
            document.removeEventListener("keydown", onKeyDown)
        }
    })

    return (
        <>
            {isOpen && (
                <div className="fixed top-0 left-0 h-screen w-screen bg-black opacity-40"></div>
            )}
            <dialog
                open={isOpen}
                className="absolute top-1/2 left-1/2 min-w-96 -translate-1/2 rounded-2xl bg-white p-4 shadow"
            >
                <div className="flex flex-wrap gap-y-2">
                    {storedGates.map((item) => {
                        return (
                            <button
                                className="w-full p-2 shadow cursor-pointer"
                                key={item}
                                onClick={() => onGateTypeSelect(item)}
                            >
                                {item}
                            </button>
                        );
                    })}
                </div>
            </dialog>
        </>
    );
}
