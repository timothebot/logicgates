import { EditorTool } from "./types";

let equippedTool: EditorTool = EditorTool.Default;

const stateListener: { [key: string]: (equippedTool: EditorTool) => void; } = {};

export function setEquippedTool(newEquippedTool: EditorTool) {
    equippedTool = newEquippedTool;
    Object.keys(stateListener).forEach(key => {
        stateListener[key](newEquippedTool);
    })
}

export function getEquippedTool(): EditorTool {
    return equippedTool;
}

export function subscribeToEquippedTool(key: string, callback: (equippedTool: EditorTool) => void) {
    stateListener[key] = callback;
}
export function unsubscribeToEquippedTool(key: string) {
    delete stateListener[key];
}