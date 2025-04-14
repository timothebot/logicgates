import { ActiveSimulation } from "@lib/types";
import { createContext } from "react";

const ActiveSimulationContext = createContext<ActiveSimulation>({
    activeElements: [],
    activeInputs: [],
});

export default ActiveSimulationContext;
