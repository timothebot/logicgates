import { createContext, useEffect, useState } from "react";
import Area from "./components/Area";
import Toolbar from "./components/editor/Toolbar";
import { EditorTool, Gate } from "./lib/types";
import GateLoaderMenu from "./components/editor/GateLoaderMenu";
import {
    getCurrentGateFromStorage,
    getGateFromStorage,
    removeGateFromStorage,
    setCurrentGateInStorage,
    writeGateToStorage,
} from "./lib/utils/storage";
import GateTitle from "./components/editor/GateTitle";

export const EquippedToolContext = createContext<EditorTool>(
    EditorTool.Default,
);

function App() {
    const [tool, setTool] = useState<EditorTool>(EditorTool.Default);
    const [activeGate, setActiveGate] = useState<Gate | null>(null);

    function loadCurrentGate(gateType?: string) {
        setActiveGate(
            getGateFromStorage(gateType || getCurrentGateFromStorage()),
        );
    }

    useEffect(() => {
        loadCurrentGate();
    }, []);

    function saveGate(gate: Gate) {
        const currentGateType = activeGate?.gateType || "";

        setActiveGate(gate);
        // check if the name was changed
        if (gate.gateType != currentGateType) {
            setCurrentGateInStorage(gate.gateType);
            removeGateFromStorage(currentGateType);
        }
        writeGateToStorage(gate);
    }

    return (
        <>
            <EquippedToolContext value={tool}>
                {activeGate && (
                    <>
                        <GateTitle
                            key={"title" + activeGate.gateType}
                            activeGate={activeGate}
                            saveGate={saveGate}
                        />
                        <Area
                            key={activeGate.gateType}
                            activeGate={activeGate}
                            saveGate={saveGate}
                        />
                        <Toolbar setTool={setTool} />
                        <GateLoaderMenu
                            key={"menu" + activeGate.gateType}
                            activeGate={activeGate}
                            reloadGateType={(gateType?: string) => {
                                loadCurrentGate(gateType);
                            }}
                        />
                    </>
                )}
            </EquippedToolContext>
        </>
    );
}

export default App;
