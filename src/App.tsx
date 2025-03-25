import { createContext, useEffect, useState } from "react";
import "./App.css";
import Area from "./components/Area";
import Toolbar from "./components/Toolbar";
import { xorGate } from "./lib/tests/data";
import { EditorTool, Gate } from "./lib/types";

export const EquippedToolContext = createContext<EditorTool>(
    EditorTool.Default,
);

function App() {
    const [tool, setTool] = useState<EditorTool>(EditorTool.Default);
    const [activeGate, setActiveGate] = useState<Gate | null>(null);

    useEffect(() => {
        let selectedGate = localStorage.getItem("active-gate");
        if (selectedGate === null) {
            selectedGate = "session-" + Math.floor(Math.random() * 1000);
            localStorage.setItem("active-gate", selectedGate);
        }
        let storedGate = localStorage.getItem("gate-" + selectedGate);
        let parsedGate = xorGate;
        if (storedGate !== null) {
            parsedGate = JSON.parse(storedGate) as Gate;
        }
        setActiveGate(parsedGate)
    }, []);

    function saveGate(gate: Gate) {
        const selectedGate = localStorage.getItem("active-gate");
        if (selectedGate === null || selectedGate == "default") {
            return;
        }
        setActiveGate(gate);
        localStorage.setItem("gate-" + selectedGate, JSON.stringify(activeGate));
    }

    return (
        <EquippedToolContext value={tool}>
            {activeGate && (
                <>
                <h1>{activeGate.connections.map(conn => conn.to)}</h1>
                    <Area activeGate={activeGate} setActiveGate={saveGate} />
                    <Toolbar setTool={setTool} />
                </>
            )}
        </EquippedToolContext>
    );
}

export default App;
