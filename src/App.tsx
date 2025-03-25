import { createContext, useState } from "react";
import "./App.css";
import Area from "./components/Area";
import Toolbar from "./components/Toolbar";
import { xorGate } from "./lib/tests/data";
import { EditorTool } from "./lib/types";

export const EquippedToolContext = createContext<EditorTool>(
    EditorTool.Default,
);

function App() {
    const [tool, setTool] = useState<EditorTool>(EditorTool.Default);
    const activeGate = xorGate;

    return (
        <>
            <EquippedToolContext value={tool}>
                <Area activeGate={activeGate} />
                <Toolbar setTool={setTool} />
            </EquippedToolContext>
        </>
    );
}

export default App;
