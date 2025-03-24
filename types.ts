
export type Uid = string;

export type VirtualPin = {
    id: Uid;
    gateId: Uid | 'in' | 'out';
    index: number;
    // name: string;
    // sorting: number;
};

/**
 * Represents a gate in the physical space
 */
export type VirtualGate = {
    id: Uid;

    /**
     * Links to the related gate logic in the gates lookup
     */
    gateType: string;

    inputPins: Uid[];
    outputPins: Uid[];

    // positions: Position;
};

/**
 * Connects different pins
 */
export type Connection = {
    from: Uid;
    to: Uid;
};

export type DecisionTable = {
    [key: string]: number[];
}

export type Gate = {
    gateType: string;

    inputPins: Uid[];
    outputPins: Uid[];

    virtualPins: VirtualPin[];
    virtualGates: VirtualGate[];
    connections: Connection[];

    decisionTable?: DecisionTable;
};

export type SimulationManager = {
    gatesLookup: Gate[];
};
