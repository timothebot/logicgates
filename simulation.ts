import { AND_GATE, NOT_GATE } from "./default_gates.ts";
import { Gate, SimulationManager } from "./types.ts";

export function getGateByType(
    manager: SimulationManager,
    gateType: string): Gate {
    const gate = manager.gatesLookup.find(g => g.gateType == gateType);
    if (!gate) {
        throw Error("Gate not found in lookup: " + gateType);
    }
    return gate;
}

export const simulationManager: SimulationManager = {
    gatesLookup: [
        AND_GATE,
        NOT_GATE
    ],
};