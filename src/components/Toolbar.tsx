import { ReactNode, useContext, useEffect } from "react";
import { EditorTool } from "../lib/types";
import { EquippedToolContext } from "../App";
import { LuSquareDashedMousePointer, LuMousePointer2 } from "react-icons/lu";

type OptionButton = {
    label: string;
    tool: EditorTool;
    icon: ReactNode;
};

const tools: OptionButton[] = [
    {
        label: "Default",
        tool: EditorTool.Default,
        icon: <LuMousePointer2 />,
    },
    {
        label: "Select",
        tool: EditorTool.Select,
        icon: <LuSquareDashedMousePointer />,
    },
];

export default function Toolbar({
    setTool,
}: {
    setTool: (tool: EditorTool) => void;
}) {
    const tool = useContext(EquippedToolContext);

    function onKeyDown(event: KeyboardEvent) {
        if (event.ctrlKey && event.key == "v") {
            setTool(EditorTool.Select);
        }
        if (event.ctrlKey && event.key == "c") {
            setTool(EditorTool.Default);
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
        };
    }, []);

    return (
        <div className="absolute bottom-2.5 left-1/2 flex -translate-1/2 gap-x-2 rounded border-1 border-slate-100 bg-white p-2.5 shadow">
            {tools.map((toolButton) => {
                return (
                    <button
                        className={
                            (toolButton.tool == tool
                                ? "bg-blue-300"
                                : "bg-slate-100 hover:bg-blue-100") +
                            " cursor-pointer rounded p-1 shadow transition-colors"
                        }
                        key={toolButton.label}
                        title={toolButton.label}
                        onClick={() => setTool(toolButton.tool)}
                    >
                        {toolButton.icon}
                    </button>
                );
            })}
            <button
                        className="bg-slate-100 hover:bg-blue-100 cursor-pointer rounded p-1 shadow transition-colors"
                        onClick={() => localStorage.clear()}
                    >
                        Clear Storage
                    </button>
        </div>
    );
}
