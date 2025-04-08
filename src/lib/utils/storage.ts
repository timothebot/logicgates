import { AND_GATE, NOT_GATE } from "../default_gates";
import { createGate } from "../gates";
import { Gate, SimulationManager } from "../types";
import logger from "./logger";

const ACTIVE_GATE_KEY = "active-gate";
const GATE_DATA_PREFIX = "gate-";
const HISTORY_KEY = "logicgates-history";

/**
 * Returns the current gate. Sets a new one if none found
 * TODO: why did i add the or
 */
export function getCurrentGateFromStorage(or: string = "default"): string {
    let selectedGate = localStorage.getItem(ACTIVE_GATE_KEY);
    if (selectedGate === null || selectedGate === "") {
        selectedGate = or;
        setCurrentGateInStorage(selectedGate);
    }
    return selectedGate;
}

export function getGateFromStorage(gateType: string): Gate {
    const storedGate = localStorage.getItem(GATE_DATA_PREFIX + gateType);
    if (storedGate !== null) {
        return JSON.parse(storedGate) as Gate;
    }
    logger.warn("Couldn't find gate of type '" + GATE_DATA_PREFIX + gateType + "', creating it.");
    return createGate(gateType);
}

export function setCurrentGateInStorage(currentGate: string) {
    localStorage.setItem(ACTIVE_GATE_KEY, currentGate);
}

export function writeGateToStorage(gate: Gate) {
    localStorage.setItem(GATE_DATA_PREFIX + gate.gateType, JSON.stringify(gate));
}

export function listStoredGateTypes(): string[] {
    const storedGateTypes = [];
    for (let i = 0; i <= localStorage.length; i++) {
        const currentItem = localStorage.key(i) || "";
        if (currentItem.startsWith(GATE_DATA_PREFIX)) {
            storedGateTypes.push(currentItem.substring(GATE_DATA_PREFIX.length));
        }
    }
    return storedGateTypes;
}

export function removeGateFromStorage(gateType: string) {
    localStorage.removeItem(GATE_DATA_PREFIX + gateType);
}

export function getSimulationManagerFromStorage(): SimulationManager {
    const allGates: Gate[] = listStoredGateTypes().map(gateType => getGateFromStorage(gateType));
    allGates.push(NOT_GATE, AND_GATE);
    return {
        gatesLookup: allGates
    }
}

type HistoryStorage = {
    gateType: string;
    history: Gate[];
}

function getHistory(gateType: string) {
    const historyRaw = localStorage.getItem(HISTORY_KEY);
    let history: HistoryStorage | undefined = undefined;
    if (historyRaw) {
        history = JSON.parse(historyRaw);
    }
    if (!historyRaw || !history || history.gateType != gateType) {
        history = {
            gateType: gateType,
            history: []
        }
    }
    return history;
}

function saveHistory(history: HistoryStorage) {
    if (history.history.length > 10) {
        history.history.shift();
    }
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function createHistoryEntry(gate: Gate) {
    const history = getHistory(gate.gateType);
    history.history.push(gate);
    saveHistory(history);
}

export function getHistoryEntry(gate: Gate): Gate | undefined {
    const history = getHistory(gate.gateType);
    if (history.history.length > 2) {
        history.history.pop();
    }
    const item = history.history.pop();
    saveHistory(history);
    return item;
}
