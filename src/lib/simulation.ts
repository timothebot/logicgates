import { AND_GATE, NOT_GATE } from "./default_gates";
import { getGateByType, getPinFromGate, isGateConnected } from "./gates";
import { Gate, SimulationManager, Uid } from "./types";
import logger from "./utils/logger";

type SimulatedResult = {
    gate: Gate;
    pinValues: Map<Uid, boolean>;
}

export function simulateGate(
    gate: Gate,
    inputValues: boolean[], // change this to make it semi-work
    manager: SimulationManager
): SimulatedResult {
    logger.verbose("Simulating gate '" + gate.gateType + "'", inputValues)
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
    const maxIterations = 1000;
    while (changesOccurred && iterations < maxIterations) {
        iterations++;
        changesOccurred = false;

        gate.virtualGates.forEach(vGate => {
            // check if already calculated this gate
            if (vGate.outputPins.length == 0 ||
                !isGateConnected(gate, vGate) ||
                pinValues.has(vGate.outputPins[0])) {
                logger.verbose("Skipping element", vGate)
                return;
            }

            changesOccurred = true;

            const inPins: boolean[] = [];
            vGate.inputPins.forEach(pinId => {
                if (!pinValues.has(pinId)) {
                    logger.verbose("pin has no value", pinId)
                    return;
                }
                const pin = getPinFromGate(gate, pinId);
                // @ts-ignore: This is already evaluated above
                inPins[pin.index] = pinValues.get(pinId);
            });

            if (Object.keys(inPins).length !== vGate.inputPins.length) {
                logger.debug("Input pins mismatch, found " + inPins.length, vGate, gate)
                return;
            }

            const currentGate = getGateByType(manager, vGate.gateType);
            const output = runGate(currentGate, inPins, manager);
            logger.verbose("Current gateType: '" + currentGate.gateType, "', inputs / outputs: ", inPins, output)

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

    if (iterations >= maxIterations) {
        logger.error("Something went wrong; too many simulation iterations")
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

export const simulationManager: SimulationManager = {
    gatesLookup: [
        AND_GATE,
        NOT_GATE
    ],
};