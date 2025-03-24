import { getGateByType } from "./simulation.ts";
import { Gate, SimulationManager, Uid, VirtualPin } from "./types.ts";

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


function getPinFromGate(gate: Gate, pinId: Uid): VirtualPin {
    const pin = gate.virtualPins.find(value => value.id == pinId);
    if (!pin) {
        throw Error("Pin not found");
    }
    return pin;
}

export function simulateGate(
    gate: Gate,
    inputValues: boolean[], // change this to make it semi-work
    manager: SimulationManager
): boolean[] {
    const pinValues: Map<Uid, boolean> = new Map<Uid, boolean>();

    // TODO: we need to map each input to its same input
    inputValues.forEach((value, index) => {
        const pin = gate.virtualPins.find(pin => pin.index == index && pin.gateId == "in");
        console.log("pin: ", pin)
    })
    Object.keys(inputValues).forEach(pinId => {
        gate.inputPins.indexOf
    })
    gate.inputPins.forEach(pinId => {
        const pin = getPinFromGate(gate, pinId);
        console.log(pin)
        const value = gate.inputPins[]
        pinValues.set(
            pin.id,
            value
        );
        const connections = gate.connections.filter(conn => conn.from == pinId);
        connections.forEach(conn => {
            pinValues.set(conn.to, value);
        });
    });

    let changesOccurred = true;
    while (changesOccurred) {
        changesOccurred = false;

        gate.virtualGates.forEach(vGate => {
            // check if already calculated this gate
            if (vGate.outputPins.length == 0 ||
                pinValues.has(vGate.outputPins[0])) {
                return;
            }
            changesOccurred = true;

            const inPins: Record<Uid, boolean> = {};
            vGate.inputPins.forEach(pinId => {
                if (!pinValues.has(pinId)) {
                    return;
                }
                // @ts-ignore: This is already evaluated above
                inPins[pinId] = pinValues.get(pinId);
            });

            if (Object.keys(inPins).length !== vGate.inputPins.length) {
                return;
            }

            const currentGate = getGateByType(manager, vGate.gateType);
            const output = runGate(currentGate, inPins, manager);
            
            // map currentGate outputs
            currentGate.outputPins.forEach((value, index) => {
                output[vGate.outputPins[index]] = output[value];
            });

            vGate.outputPins.forEach(pinId => {
                pinValues.set(pinId, output[pinId]);

                // add the new pin values
                const connections = gate.connections.filter(conn => conn.from == pinId);
                connections.forEach(conn => {
                    if (output[pinId] == undefined) {
                        throw Error("no output");
                    }
                    pinValues.set(conn.to, output[pinId]);
                });
            });
        });
    }

    const outputValues: Record<Uid, boolean> = {};
    gate.outputPins.forEach((pinId) => {
        if (!pinValues.has(pinId)) {
            throw Error("no pinValue output")
        }
        const value = pinValues.get(pinId);
        // @ts-ignore
        outputValues[pinId] = value;
    });

    console.log(outputValues)

    return outputValues;
}

export function runGate(
    gate: Gate,
    inputs: Record<Uid, boolean>,
    manager: SimulationManager
): Record<Uid, boolean> {
    if (gate.gateType === "not" || gate.gateType === "and") {
        const output: Record<Uid, boolean> = {};
        if (gate.gateType == "not") {
            if (Object.values(inputs).length != 1) {
                throw Error("gate 'not' needs exactly 1 input");
            }
            gate.outputPins.forEach(outPinId => {
                output[outPinId] = !Object.values(inputs)[0];
            });
        }
        if (gate.gateType == "and") {
            gate.outputPins.forEach(outPinId => {
                output[outPinId] = Object.values(inputs).every(value => value);
            });
        }
        return output;
    }

    if (gate.inputPins.length != Object.keys(inputs).length) {
        throw Error("Input length mismatch");
    }

    return simulateGate(
        gate,
        inputs,
        manager
    );
}
