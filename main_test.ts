import { assertEquals } from "@std/assert";
import { runGate } from "./main.ts";
import { Gate } from "./types.ts";
import { AND_GATE, NOT_GATE } from "./default_gates.ts";
import { simulationManager } from "./simulation.ts";


Deno.test({
    name: "Test NOT gate",
    fn() {
        assertEquals(
            runGate(
                NOT_GATE,
                {
                    "in": false
                },
                simulationManager
            ),
            { "out": true }
        );
        assertEquals(
            runGate(
                NOT_GATE,
                {
                    "in": true
                },
                simulationManager
            ),
            { "out": false }
        );
    }
});


Deno.test({
    name: "Test AND gate",
    fn() {
        assertEquals(
            runGate(
                AND_GATE,
                {
                    "in-a": true,
                    "in-b": true
                },
                simulationManager
            ),
            { "out": true }
        );
        assertEquals(
            runGate(
                AND_GATE,
                {
                    "in-a": false,
                    "in-b": true
                },
                simulationManager
            ),
            { "out": false }
        );
        assertEquals(
            runGate(
                AND_GATE,
                {
                    "in-a": true,
                    "in-b": false
                },
                simulationManager
            ),
            { "out": false }
        );
        assertEquals(
            runGate(
                AND_GATE,
                {
                    "in-a": false,
                    "in-b": false
                },
                simulationManager
            ),
            { "out": false }
        );
    }
});


const nandGate: Gate = {
    gateType: "nand",

    inputPins: [
        "input-a",
        "input-b"
    ],
    outputPins: [
        "output"
    ],
    virtualPins: [
        // vPins of the container gate
        {
            id: "input-a",
            gateId: "in",
            index: 0
        },
        {
            id: "input-b",
            gateId: "in",
            index: 1
        },
        {
            id: "output",
            gateId: "out",
            index: 0
        },

        // AND vPins
        {
            id: "and-in-a",
            gateId: "and-gate",
            index: 0
        },
        {
            id: "and-in-b",
            gateId: "and-gate",
            index: 1
        },
        {
            id: "and-out",
            gateId: "and-gate",
            index: 0
        },

        // NOT vPins
        {
            id: "not-in",
            gateId: "not-gate",
            index: 0
        },
        {
            id: "not-out",
            gateId: "not-gate",
            index: 0
        }
    ],
    virtualGates: [
        {
            id: "and-gate",
            gateType: "and",
            inputPins: [
                "and-in-a",
                "and-in-b",
            ],
            outputPins: [
                "and-out"
            ]
        },
        {
            id: "not-gate",
            gateType: "not",
            inputPins: [
                "not-in"
            ],
            outputPins: [
                "not-out"
            ]
        }
    ],
    connections: [
        {
            from: "input-b",
            to: "and-in-b"
        },
        {
            from: "input-a",
            to: "and-in-a"
        },
        {
            from: "and-out",
            to: "not-in"
        },
        {
            from: "not-out",
            to: "output"
        }
    ]
};


Deno.test({
    name: "Test NAND gate",
    fn() {
        assertEquals(
            runGate(
                nandGate,
                {
                    "input-a": false,
                    "input-b": false
                },
                simulationManager
            ),
            { "output": true }
        );
        assertEquals(
            runGate(
                nandGate,
                {
                    "input-a": false,
                    "input-b": true
                },
                simulationManager
            ),
            { "output": true }
        );
        assertEquals(
            runGate(
                nandGate,
                {
                    "input-a": true,
                    "input-b": false
                },
                simulationManager
            ),
            { "output": true }
        );
        assertEquals(
            runGate(
                nandGate,
                {
                    "input-a": true,
                    "input-b": true
                },
                simulationManager
            ),
            { "output": false }
        );
    }
});

const orGate: Gate = {
    gateType: "or",
    inputPins: ["input-a", "input-b"],
    outputPins: ["output"],
    virtualPins: [
        // Container pins
        { id: "input-a", gateId: "in", index: 0 },
        { id: "input-b", gateId: "in", index: 1 },
        { id: "output", gateId: "out", index: 0 },

        // NOT gate for input A
        { id: "not-a-in", gateId: "not-a-gate", index: 0 },
        { id: "not-a-out", gateId: "not-a-gate", index: 0 },

        // NOT gate for input B
        { id: "not-b-in", gateId: "not-b-gate", index: 0 },
        { id: "not-b-out", gateId: "not-b-gate", index: 0 },

        // NAND gate to combine the NOT outputs
        { id: "nand-in-a", gateId: "nand-gate", index: 0 },
        { id: "nand-in-b", gateId: "nand-gate", index: 1 },
        { id: "nand-out", gateId: "nand-gate", index: 0 },
    ],
    virtualGates: [
        {
            id: "not-a-gate",
            gateType: "not",
            inputPins: ["not-a-in"],
            outputPins: ["not-a-out"],
        },
        {
            id: "not-b-gate",
            gateType: "not",
            inputPins: ["not-b-in"],
            outputPins: ["not-b-out"],
        },
        {
            id: "nand-gate",
            gateType: "nand",
            inputPins: ["nand-in-a", "nand-in-b"],
            outputPins: ["nand-out"],
        },
    ],
    connections: [
        // Route container inputs to their NOT gates
        { from: "input-a", to: "not-a-in" },
        { from: "input-b", to: "not-b-in" },

        // Route NOT gate outputs to the NAND gate
        { from: "not-a-out", to: "nand-in-a" },
        { from: "not-b-out", to: "nand-in-b" },

        // Output from the NAND gate becomes the container output
        { from: "nand-out", to: "output" },
    ],
};


Deno.test({
    name: "Test OR gate",
    fn() {
        const orSimManager = { ...simulationManager };
        orSimManager.gatesLookup.push(nandGate);
        assertEquals(
            runGate(
                orGate,
                {
                    "input-a": true,
                    "input-b": true
                },
                orSimManager
            ),
            { "output": true }
        );
        assertEquals(
            runGate(
                orGate,
                {
                    "input-a": false,
                    "input-b": true
                },
                orSimManager
            ),
            { "output": true }
        );
        assertEquals(
            runGate(
                orGate,
                {
                    "input-a": true,
                    "input-b": false
                },
                orSimManager
            ),
            { "output": true }
        );
        assertEquals(
            runGate(
                orGate,
                {
                    "input-a": false,
                    "input-b": false
                },
                orSimManager
            ),
            { "output": false }
        );
    }
});

const xorGate: Gate = {
    gateType: "xor",
    inputPins: [
        "input-a",
        "input-b"
    ],
    outputPins: [
        "output"
    ],
    virtualPins: [
        // Container pins
        { id: "input-a", gateId: "in", index: 0 },
        { id: "input-b", gateId: "in", index: 1 },
        { id: "output", gateId: "out", index: 0 },

        // NOT gate for A
        { id: "not-a-in", gateId: "not-a-gate", index: 0 },
        { id: "not-a-out", gateId: "not-a-gate", index: 0 },

        // NOT gate for B
        { id: "not-b-in", gateId: "not-b-gate", index: 0 },
        { id: "not-b-out", gateId: "not-b-gate", index: 0 },

        // AND gate for A AND (NOT B)
        { id: "and1-in-a", gateId: "and1-gate", index: 0 },
        { id: "and1-in-b", gateId: "and1-gate", index: 1 },
        { id: "and1-out", gateId: "and1-gate", index: 0 },

        // AND gate for (NOT A) AND B
        { id: "and2-in-a", gateId: "and2-gate", index: 0 },
        { id: "and2-in-b", gateId: "and2-gate", index: 1 },
        { id: "and2-out", gateId: "and2-gate", index: 0 },

        // OR gate to combine AND outputs
        { id: "or-in-a", gateId: "or-gate", index: 0 },
        { id: "or-in-b", gateId: "or-gate", index: 1 },
        { id: "or-out", gateId: "or-gate", index: 0 }
    ],
    virtualGates: [
        {
            id: "not-a-gate",
            gateType: "not",
            inputPins: ["not-a-in"],
            outputPins: ["not-a-out"]
        },
        {
            id: "not-b-gate",
            gateType: "not",
            inputPins: ["not-b-in"],
            outputPins: ["not-b-out"]
        },
        {
            id: "and1-gate",
            gateType: "and",
            inputPins: ["and1-in-a", "and1-in-b"],
            outputPins: ["and1-out"]
        },
        {
            id: "and2-gate",
            gateType: "and",
            inputPins: ["and2-in-a", "and2-in-b"],
            outputPins: ["and2-out"]
        },
        {
            id: "or-gate",
            gateType: "or",
            inputPins: ["or-in-a", "or-in-b"],
            outputPins: ["or-out"]
        }
    ],
    connections: [
        // Connect container inputs to sub-gates
        { from: "input-a", to: "and1-in-a" },
        { from: "input-b", to: "and2-in-b" },
        { from: "input-a", to: "not-a-in" },
        { from: "input-b", to: "not-b-in" },

        // Connect NOT outputs to AND gates
        { from: "not-a-out", to: "and2-in-a" },
        { from: "not-b-out", to: "and1-in-b" },

        // Combine AND gate outputs via OR gate
        { from: "and1-out", to: "or-in-a" },
        { from: "and2-out", to: "or-in-b" },

        // Output the OR result
        { from: "or-out", to: "output" }
    ]
};

Deno.test({
    name: "Test XOR gate",
    fn() {
        const xorSimManager = { ...simulationManager };
        xorSimManager.gatesLookup.push(orGate, nandGate);
        assertEquals(
            runGate(
                xorGate,
                {
                    "input-a": false,
                    "input-b": true
                },
                xorSimManager
            ),
            { "output": true }
        );
        assertEquals(
            runGate(
                xorGate,
                {
                    "input-a": true,
                    "input-b": false
                },
                xorSimManager
            ),
            { "output": true }
        );
        assertEquals(
            runGate(
                xorGate,
                {
                    "input-a": false,
                    "input-b": false
                },
                xorSimManager
            ),
            { "output": false }
        );
        assertEquals(
            runGate(
                xorGate,
                {
                    "input-a": true,
                    "input-b": true
                },
                xorSimManager
            ),
            { "output": false }
        );
    }
});
