import { useEffect, useState } from "react";
import {
    listStoredGateTypes,
    removeGateFromStorage,
    setCurrentGateInStorage,
    writeGateToStorage,
} from "../lib/utils/storage";
import { LuMenu, LuTrash2 } from "react-icons/lu";
import { Gate } from "../lib/types";
import { nandGate } from "../lib/tests/data";

export default function GateLoaderMenu({
    reloadGateType,
    activeGate,
}: {
    reloadGateType: (gateType?: string) => void;
    activeGate: Gate;
}) {
    const [isOpen, setIsOpen] = useState(false);

    const [storedGates, setStoredGates] = useState(listStoredGateTypes());

    function onKeyDown(event: KeyboardEvent) {
        if (event.key == "Escape") {
            setIsOpen(!isOpen);
        }
    }

    function onGateTypeSelect(gateType: string) {
        setCurrentGateInStorage(gateType);
        setIsOpen(false);
        reloadGateType(gateType);
    }

    function deleteGateType(gateType: string) {
        removeGateFromStorage(gateType);
        setStoredGates(listStoredGateTypes());
    }

    function debugCreateGateFromTemplate() {
        const newGate = { ...nandGate };
        newGate.gateType = "test-" + Math.floor(Math.random() * 420);
        writeGateToStorage(newGate);
    }

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
        };
    });

    return (
        <>
            <div className="fixed top-2 left-2 cursor-pointer rounded border-1 border-slate-100 bg-white p-1 shadow transition-colors hover:bg-blue-100">
                <LuMenu size={30} />
            </div>
            {isOpen && (
                <div className="fixed top-0 left-0 h-screen w-screen bg-black opacity-40"></div>
            )}
            <dialog
                open={isOpen}
                className="absolute top-1/2 left-1/2 min-w-96 -translate-1/2 rounded-2xl bg-white p-4 shadow"
            >
                <div className="flex flex-wrap gap-y-2">
                    {storedGates.map((gateType) => {
                        return (
                            <div
                                key={gateType}
                                className={
                                    "flex w-full cursor-pointer justify-between rounded border-1 border-slate-100 p-2 shadow " +
                                    (activeGate.gateType == gateType
                                        ? "bg-blue-100"
                                        : "hover:bg-blue-100")
                                }
                            >
                                <button
                                    className="w-full text-left"
                                    onClick={() => onGateTypeSelect(gateType)}
                                >
                                    <span className="font-semibold">
                                        {gateType}
                                    </span>
                                </button>
                                {activeGate.gateType != gateType && (
                                    <button
                                        className="cursor-pointer pl-2"
                                        onClick={() =>
                                            deleteGateType(gateType)
                                        }
                                    >
                                        <LuTrash2 />
                                    </button>
                                )}
                            </div>
                        );
                    })}
                    <button onClick={debugCreateGateFromTemplate}>Create new debug gate</button>
                </div>
            </dialog>
        </>
    );
}
