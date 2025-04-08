import { Connection, InOut, Pin, Uid, VirtualElement } from "@lib/types";
import { MouseEvent } from "react";

export enum GateAction {
    ToggleInput = "ToggleInput",
    AddElement = "AddElement",
    AddConnection = "AddConnection",
    DeleteElement = "DeleteElement",
    SelectElement = "SelectElement",
    ResetSelectedElements = "ResetSelectedElements"
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

export type DeleteElementAction = {
    type: GateAction.DeleteElement;
    element?: VirtualElement;
    connection?: Connection;
};

export type SelectElementAction = {
    type: GateAction.SelectElement;
    element?: VirtualElement;
    connection?: Connection;
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
