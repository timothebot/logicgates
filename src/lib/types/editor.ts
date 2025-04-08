import { Gate, InOut, Pin, Uid, VirtualElement } from "@lib/types";

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
}

export enum GateAction {
    ToggleInput,
    AddElement,
    AddConnection,
    DeleteElement,
    SelectElement,
    ResetSelectedElements
}

export type ToggleInputAction = {
    type: GateAction.ToggleInput;
    inputId: Uid;
};

export type ElementAction = {
    element: VirtualElement;
};

export type AddElementAction = ElementAction & {
    type: GateAction.AddElement;
    pins: Pin[];
};

export type DeleteElementAction = ElementAction & {
    type: GateAction.DeleteElement;
};

export type SelectElementAction = ElementAction & {
    type: GateAction.SelectElement;
    event?: MouseEvent;
};

export type AddConnectionAction = {
    type: GateAction.AddConnection;
    connectionType: InOut;
    pinId: Uid;
};

export type ResetSelectedElementsAction = {
    type: GateAction.ResetSelectedElements;
};

export type AllowedGateActions =
    | ToggleInputAction
    | AddElementAction
    | DeleteElementAction
    | SelectElementAction
    | ResetSelectedElementsAction
    | AddConnectionAction;

export type PerformGateAction = (data: AllowedGateActions) => void;
