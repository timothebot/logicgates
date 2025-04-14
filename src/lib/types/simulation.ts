
export type Position = {
    x: number;
    y: number;
}

export type Uid = string;

export type InOut = 'in' | 'out';

export type Pin = {
    id: Uid;
    gateId: Uid | InOut;
    index: number;
};

export type ElementType = 'gate' | 'input' | 'output'; 

/**
 * Represents a gate in the physical space
 */
export type VirtualElement = {
    id: Uid;

    /**
     * Links to the related gate logic in the gates lookup
     * e.g. "not", "or", "xor"
     */
    gateType: string;

    elementType: ElementType;

    inputPins: Uid[];
    outputPins: Uid[];

    position: Position;
    label?: string;
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

    virtualPins: Pin[];
    virtualGates: VirtualElement[];
    connections: Connection[];

    decisionTable?: DecisionTable;
};
