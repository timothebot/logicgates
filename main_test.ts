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

