import { getGateByType } from "./simulation";
import { Gate, SimulationManager, Uid, Pin, Connection, Position, VirtualElement } from "./types";

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

function getPinFromGate(gate: Gate, pinId: Uid): Pin {
    const pin = gate.virtualPins.find(value => value.id == pinId);
    if (!pin) {
        throw Error("Pin not found");
    }
    return pin;
}

function isGateConnected(gate: Gate, virtualGate: VirtualElement) {
    const connections = gate.connections.filter(conn => {
        return virtualGate.inputPins.includes(conn.to);
    })
    return connections.length === virtualGate.inputPins.length;
}

type SimulatedResult = {
    gate: Gate;
    pinValues: Map<Uid, boolean>;
}

export function simulateGate(
    gate: Gate,
    inputValues: boolean[], // change this to make it semi-work
    manager: SimulationManager
): SimulatedResult {
    const pinValues: Map<Uid, boolean> = new Map<Uid, boolean>();

    gate.inputPins.forEach((pinId, index) => {
        pinValues.set(
            pinId,
            inputValues[index]
        );
        const connections = gate.connections.filter(conn => conn.from == pinId);
        connections.forEach(conn => {
            pinValues.set(conn.to, inputValues[index]);
        });
    });

    let changesOccurred = true;
    let iterations = 0;
    while (changesOccurred && iterations < 1000) {
        iterations++;
        changesOccurred = false;

        gate.virtualGates.forEach(vGate => {
            // check if already calculated this gate
            if (vGate.outputPins.length == 0 ||
                !isGateConnected(gate, vGate) ||
                pinValues.has(vGate.outputPins[0])) {
                return;
            }
            changesOccurred = true;

            const inPins: boolean[] = [];
            vGate.inputPins.forEach(pinId => {
                if (!pinValues.has(pinId)) {
                    return;
                }
                const pin = getPinFromGate(gate, pinId);
                // @ts-ignore: This is already evaluated above
                inPins[pin.index] = pinValues.get(pinId);
            });

            if (Object.keys(inPins).length !== vGate.inputPins.length) {
                return;
            }

            const currentGate = getGateByType(manager, vGate.gateType);
            const output = runGate(currentGate, inPins, manager);

            vGate.outputPins.forEach(pinId => {
                const pin = getPinFromGate(gate, pinId);

                pinValues.set(pinId, output[pin.index]);

                // add the new pin values
                const connections = gate.connections.filter(conn => conn.from == pinId);
                connections.forEach(conn => {
                    if (output[pin.index] == undefined) {
                        throw Error("no output");
                    }
                    pinValues.set(conn.to, output[pin.index]);
                });
            });
        });
    }

    return {
        gate: gate,
        pinValues: pinValues
    };
}

export function getResultFromSimulatedGate(simulatedData: SimulatedResult): boolean[] {
    const outputValues: boolean[] = [];
    simulatedData.gate.outputPins.forEach((pinId) => {
        if (!simulatedData.pinValues.has(pinId)) {
            throw Error("no pinValue output");
        }
        const pin = getPinFromGate(simulatedData.gate, pinId);
        const value = simulatedData.pinValues.get(pinId);
        // @ts-ignore
        outputValues[pin.index] = value;
    });

    return outputValues;
}

export function runGate(
    gate: Gate,
    inputs: boolean[],
    manager: SimulationManager
): boolean[] {
    if (gate.gateType == "not") {
        if (Object.values(inputs).length != 1) {
            throw Error("gate 'not' needs exactly 1 input");
        }
        return [!Object.values(inputs)[0]];
    }
    if (gate.gateType == "and") {
        return [Object.values(inputs).every(value => value)];
    }

    if (gate.inputPins.length != Object.keys(inputs).length) {
        throw Error("Input length mismatch");
    }

    return getResultFromSimulatedGate(
        simulateGate(
            gate,
            inputs,
            manager
        )
    );
}
