import { expect, test } from "bun:test";
import { runGate } from "../gates";
import { AND_GATE, NOT_GATE } from "../default_gates";
import { simulationManager } from "../simulation";
import { nandGate, orGate, xorGate } from "./data";


test("Test NOT gate", () => {
    expect(
        runGate(
            NOT_GATE,
            [false],
            simulationManager
        ))
        .toEqual(
            [true]
        );
    expect(
        runGate(
            NOT_GATE,
            [true],
            simulationManager
        ))
        .toEqual(
            [false]
        );
});

test("Test AND gate", () => {
    expect(
        runGate(
            AND_GATE,
            [true, true],
            simulationManager
        ))
        .toEqual(
            [true]
        );
    expect(
        runGate(
            AND_GATE,
            [false, true],
            simulationManager
        ))
        .toEqual(
            [false]
        );
    expect(
        runGate(
            AND_GATE,
            [true, false],
            simulationManager
        ))
        .toEqual(
            [false]
        );
    expect(
        runGate(
            AND_GATE,
            [false, false],
            simulationManager
        ))
        .toEqual(
            [false]
        );
});



test("Test NAND gate", () => {
    expect(
        runGate(
            nandGate,
            [false, false],
            simulationManager
        ))
        .toEqual(
            [true]
        );
    expect(
        runGate(
            nandGate,
            [false, true],
            simulationManager
        ))
        .toEqual(
            [true]
        );
    expect(
        runGate(
            nandGate,
            [true, false],
            simulationManager
        ))
        .toEqual(
            [true]
        );
    expect(
        runGate(
            nandGate,
            [true, true],
            simulationManager
        ))
        .toEqual(
            [false]
        );
});


test("Test OR gate", () => {
    const orSimManager = { ...simulationManager };
    orSimManager.gatesLookup.push(nandGate);
    expect(
        runGate(
            orGate,
            [true, true],
            orSimManager
        ))
        .toEqual(
            [true]
        );
    expect(
        runGate(
            orGate,
            [false, true],
            orSimManager
        ))
        .toEqual(
            [true]
        );
    expect(
        runGate(
            orGate,
            [true, false],
            orSimManager
        ))
        .toEqual(
            [true]
        );
    expect(
        runGate(
            orGate,
            [false, false],
            orSimManager
        ))
        .toEqual(
            [false]
        );
});

test("Test XOR gate", () => {
    const xorSimManager = { ...simulationManager };
    xorSimManager.gatesLookup.push(orGate, nandGate);
    expect(
        runGate(
            xorGate,
            [false, true],
            xorSimManager
        ))
        .toEqual(
            [true]
        );
    expect(
        runGate(
            xorGate,
            [true, false],
            xorSimManager
        ))
        .toEqual(
            [true]
        );
    expect(
        runGate(
            xorGate,
            [false, false],
            xorSimManager
        ))
        .toEqual(
            [false]
        );
    expect(
        runGate(
            xorGate,
            [true, true],
            xorSimManager
        ))
        .toEqual(
            [false]
        );
});
