import { AND_GATE, NOT_GATE } from "@lib/default_gates";
import { getGateFromStorage } from "@lib/utils/storage";
import { Gate, SimulationManager, Uid, Pin, Connection, Position, VirtualElement, ElementType } from "./types";
import logger from "./utils/logger";
import { v4 as uuidv4 } from "uuid";

export function createGate(gateType: string): Gate {
    return {
        gateType,
        inputPins: [],
        outputPins: [],
        virtualGates: [],
        connections: [],
        virtualPins: []
    };
}

export function getPositionsFromConnection(gate: Gate, connection: Connection): { from: Position, to: Position; } | undefined {
    const fromPin = gate.virtualPins.find(pin => pin.id == connection.from);
    const toPin = gate.virtualPins.find(pin => pin.id == connection.to);
    const fromPos = gate.virtualGates.find(vGate => vGate.id == fromPin?.gateId)?.position || undefined;
    const toPos = gate.virtualGates.find(vGate => vGate.id == toPin?.gateId)?.position || undefined;
    if (fromPos == undefined || toPos == undefined) {
        return undefined;
    }
    return {
        from: fromPos,
        to: toPos
    };
}

export function getPinFromGate(gate: Gate, pinId: Uid): Pin {
    const pin = gate.virtualPins.find(value => value.id == pinId);
    if (!pin) {
        throw Error("Pin not found");
    }
    return pin;
}

export function isGateConnected(gate: Gate, virtualGate: VirtualElement) {
    const connections = gate.connections.filter(conn => {
        return virtualGate.inputPins.includes(conn.to);
    });
    return connections.length === virtualGate.inputPins.length;
}

export function getGateByType(
    manager: SimulationManager,
    gateType: string
): Gate {
    const gate = manager.gatesLookup.find(g => g.gateType == gateType);
    if (!gate) {
        logger.error("Gate of type '" + gateType + "' not found in lookup\n\nGate lookup: ", manager.gatesLookup);
        throw new Error("Target gate not in lookup");
    }
    return gate;
}

export function createVirtualGateFrom(
    elementType: ElementType,
    gateType: string
): {
    element: VirtualElement,
    pins: Pin[];
} {
    let inputPins: Uid[] = [];
    let outputPins: Uid[] = [];
    const pins: Pin[] = [];
    const gateId = uuidv4();

    if (elementType == "gate") {
        let targetGate;
        if (gateType == "and") {
            targetGate = AND_GATE;
        } else if (gateType == "not") {
            targetGate = NOT_GATE;
        } else {
            targetGate = getGateFromStorage(gateType);
        }
        targetGate.inputPins.forEach((pin, index) => {
            const uid = uuidv4();
            inputPins.push(uid);
            pins.push({
                id: uid,
                gateId: gateId,
                index:
                    targetGate.virtualPins.find((p) => p.id == pin)
                        ?.index || index,
            });
        });
        targetGate.outputPins.forEach((pin, index) => {
            const uid = uuidv4();
            outputPins.push(uid);
            pins.push({
                id: uid,
                gateId: gateId,
                index:
                    targetGate.virtualPins.find((p) => p.id === pin)
                        ?.index || index,
            });
        });
    } else {
        const uid = uuidv4();
        inputPins = elementType == "input" ? [] : [uid];
        outputPins = elementType == "output" ? [] : [uid];
        pins.push({
            id: uid,
            gateId: elementType == "input" ? "in" : "out",
            index: 0,
        });
    }

    return {
        element: {
            id: gateId,
            position: {
                x: 0,
                y: 0,
            },
            gateType: gateType,
            elementType: elementType,
            inputPins,
            outputPins,
        },
        pins
    };
}