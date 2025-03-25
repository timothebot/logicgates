import { createContext, useEffect, useState } from "react";
import Area from "./components/Area";
import Toolbar from "./components/Toolbar";
import { EditorTool, Gate } from "./lib/types";
import GateLoader from "./components/GateLoader";
import { getCurrentGateFromStorage, getGateFromStorage, writeGateToStorage } from "./lib/utils/storage";

export const EquippedToolContext = createContext<EditorTool>(
    EditorTool.Default,
);

function App() {
    const [tool, setTool] = useState<EditorTool>(EditorTool.Default);
    const [activeGate, setActiveGate] = useState<Gate | null>(null);

    function loadCurrentGate(gateType?: string) {
        setActiveGate(
            getGateFromStorage(gateType || getCurrentGateFromStorage())
        );
    }

    useEffect(() => {
        loadCurrentGate();
    }, []);

    function saveGate(gate: Gate) {
        const selectedGate = getCurrentGateFromStorage();
        setActiveGate(gate);
        if (activeGate) {
            writeGateToStorage(activeGate);
        }
    }

    return (
        <>
            <EquippedToolContext value={tool}>
                {activeGate && (
                    <>
                        <Area
                            key={activeGate.gateType}
                            activeGate={activeGate}
                            saveGate={saveGate}
                        />
                        <Toolbar setTool={setTool} />
                    </>
                )}
            </EquippedToolContext>
            <GateLoader reloadGateType={(gateType?: string) => {
                loadCurrentGate(gateType);
            }} />
        </>
    );
}

export default App;
