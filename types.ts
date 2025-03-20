
export type Uid = string;

export type VirtualPin = {
    id: Uid;
    gateId: Uid;
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

export type Gate = {
    gateType: string;

    inputs: Uid[];
    outputs: Uid[];

    connections: Connection[];
};

export type SimulationManager = {
    gatesLookup: Gate[];
};
