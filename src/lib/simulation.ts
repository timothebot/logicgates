import { AND_GATE, NOT_GATE } from "./default_gates";
import { Gate, SimulationManager } from "./types";
import logger from "./utils/logger";

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

export const simulationManager: SimulationManager = {
    gatesLookup: [
        AND_GATE,
        NOT_GATE
    ],
};