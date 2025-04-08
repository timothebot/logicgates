import { Gate, SimulationManager, Uid, Pin, Connection, Position, VirtualElement } from "./types";
import logger from "./utils/logger";

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
    })
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
