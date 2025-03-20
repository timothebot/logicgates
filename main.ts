import { Gate, SimulationManager } from "./types.ts";


export function createGate(gateType: string): Gate {
    return {
        gateType,
        inputPins: [],
        outputPins: [],
        virtualGates: [],
        connections: []
    };
}

const manager: SimulationManager = {
    gatesLookup: [
        createGate("and"),
        createGate("not"),
    ]
};

// function simulateGate(gate: Gate, signal: boolean, )

export function runGate(gate: Gate, inputs: boolean[]): boolean[] {
    if (gate.gateType == "not") {
        if (inputs.length != 1) {
            throw Error("gate 'not' needs exactly 1 input");
        }
        return [!inputs[0]];
    }
    if (gate.gateType == "and") {
        return [inputs.every(value => value)];
    }

    // TODO: run gate logic
    if (gate.inputPins.length != inputs.length) {
        throw Error("Input length mismatch");
    }


    return [];
}
