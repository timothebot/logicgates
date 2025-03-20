import { assertEquals } from "@std/assert";
import { createGate, runGate } from "./main.ts";

Deno.test({
    name: "Test NOT gate",
    fn() {
        const GATE = createGate("not");
        assertEquals(
            runGate(GATE, [false]),
            [true]
        );
        assertEquals(
            runGate(GATE, [true]),
            [false]
        );
    }
});

Deno.test({
    name: "Test AND gate",
    fn() {
        const GATE = createGate("and");
        assertEquals(
            runGate(GATE, [true, true]),
            [true]
        );
        assertEquals(
            runGate(GATE, [true, true, true]),
            [true]
        );
        assertEquals(
            runGate(GATE, [true, false]),
            [false]
        );
        assertEquals(
            runGate(GATE, [false, false]),
            [false]
        );
        assertEquals(
            runGate(GATE, [false]),
            [false]
        );
        // TODO: is this correct?
        assertEquals(
            runGate(GATE, [true]),
            [true]
        );
    }
});



const testGate: Gate = {
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
            gateId: "in"
        },
        {
            id: "input-b",
            gateId: "in"
        },
        {
            id: "output",
            gateId: "out"
        },

        // AND vPins
        {
            id: "and-in-a",
            gateId: "and-gate"
        },
        {
            id: "and-in-b",
            gateId: "and-gate"
        },
        {
            id: "and-out",
            gateId: "and-gate"
        },

        // NOT vPins
        {
            id: "not-in",
            gateId: "not-gate"
        },
        {
            id: "not-out",
            gateId: "not-gate"
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
    name: "Test custom NAND gate",
    fn() {
        const GATE = testGate;
        assertEquals(
            runGate(GATE, [false, false]),
            [true]
        );
        assertEquals(
            runGate(GATE, [true, false]),
            [true]
        );
        assertEquals(
            runGate(GATE, [true, true]),
            [false]
        );assertEquals(
            runGate(GATE, [false, true]),
            [true]
        );
    }
});