import { createGate } from "./main";

export const AND_GATE = createGate("and");
AND_GATE.decisionTable = {
    "00": [0],
    "10": [0],
    "01": [0],
    "11": [1]
};
AND_GATE.inputPins = [
    "in-a",
    "in-b"
];
AND_GATE.outputPins = [
    "out"
]

export const NOT_GATE = createGate("not");
NOT_GATE.decisionTable = {
    "1": [0],
    "0": [1]
};
NOT_GATE.inputPins = [
    "in-a"
];
NOT_GATE.outputPins = [
    "out"
];