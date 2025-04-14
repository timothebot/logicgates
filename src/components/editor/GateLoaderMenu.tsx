import { useEffect, useState } from "react";
import {
    listStoredGateTypes,
    removeGateFromStorage,
    setCurrentGateInStorage,
} from "@lib/utils/storage";
import {
    LuMenu,
    LuTrash2,
    LuDatabase,
    LuX,
    LuCirclePlus,
} from "react-icons/lu";
import { Gate } from "@lib/types";

export default function GateLoaderMenu({
    reloadGateType,
    activeGate,
}: {
    reloadGateType: (gateType?: string) => void;
    activeGate: Gate;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [newGateName, setNewGateName] = useState("");

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

    function createNewGate() {
        if (newGateName.length > 1) {
            setCurrentGateInStorage(newGateName);
            reloadGateType(newGateName);
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
        };
    }, []);

    useEffect(() => {
        setStoredGates(listStoredGateTypes());
    }, [isOpen])

    return (
        <>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-2 left-2 z-10 cursor-pointer rounded border-1 border-slate-400 bg-white p-1 shadow transition-colors hover:bg-blue-100"
            >
                {isOpen ? <LuX size={30} /> : <LuMenu size={30} />}
            </div>
            {isOpen && (
                <div className="fixed top-0 left-0 h-screen w-screen bg-black opacity-40"></div>
            )}
            <dialog
                open={isOpen}
                className="absolute top-1/2 left-1/2 w-96 -translate-1/2 rounded-2xl bg-slate-100 p-4 shadow"
            >
                <div className="mb-4 grid place-content-center rounded-xl bg-slate-800 p-4 text-center">
                    <img
                        src="/logo.png"
                        className="mx-auto mb-2"
                        height={80}
                        width={80}
                        alt="Logo"
                    ></img>
                    <h1 className="mb-1 text-xl font-semibold text-white">
                        LogicGates App
                    </h1>
                    <span className="text-white">made with 💙 by tiimo</span>
                </div>
                <div className="flex flex-wrap gap-y-2">
                    <div>
                        <span className="flex items-center gap-x-1 text-lg font-semibold w-full">
                            <LuDatabase />
                            Your Gates
                        </span>
                        <span>
                            Click on a gate to edit it.
                        </span>
                    </div>
                    {storedGates.map((gateType) => {
                        return (
                            <div
                                key={gateType}
                                className={
                                    "flex w-full cursor-pointer justify-between rounded border-2 bg-white pr-2 shadow transition-colors " +
                                    (activeGate.gateType == gateType
                                        ? "border-blue-500"
                                        : "border-transparent hover:border-blue-500")
                                }
                            >
                                <button
                                    className="w-full px-2 py-1.5 text-left cursor-pointer"
                                    onClick={() => onGateTypeSelect(gateType)}
                                >
                                    <span className="font-semibold">
                                        {gateType.toUpperCase()}
                                    </span>
                                </button>
                                {activeGate.gateType != gateType && (
                                    <button
                                        className="cursor-pointer pl-2 hover:text-red-800"
                                        onClick={() => deleteGateType(gateType)}
                                    >
                                        <LuTrash2 />
                                    </button>
                                )}
                            </div>
                        );
                    })}
                    <div className="mt-4 flex w-full">
                        <input
                            placeholder="New gate name"
                            className="mr-2 w-full rounded border-2 border-slate-300 focus:outline-0 focus:border-blue-500 bg-white px-2 py-1.5"
                            value={newGateName}
                            onChange={(e) => setNewGateName(e.target.value)}
                        ></input>
                        <button
                            className="flex min-w-max cursor-pointer items-center gap-x-1 rounded bg-blue-500 p-2 disabled:bg-blue-100 disabled:text-blue-400 enabled:hover:bg-blue-600 transition-colors text-white"
                            disabled={newGateName.length < 2}
                            onClick={createNewGate}
                        >
                            <LuCirclePlus /> Create Gate
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
}
