import { Connection, Gate, Uid } from "@lib/types";

export type SimulationManager = {
    gatesLookup: Gate[];
};

export enum EditorTool {
    Default,
    Select
}

export type ActiveSimulation = {
    activeElements: Uid[];
    activeInputs: Uid[];
};

export type SelectedElements = {
    selectedElements: Uid[];
    selectedConnections: Connection[];
}
