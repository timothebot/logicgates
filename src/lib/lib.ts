

export type ListElement = {
    label: string;
    type: string;
}

export function getElementList(): ListElement[] {
    return [
        {
            label: "AND",
            type: "and"
        },
        {
            label: "NOT",
            type: "not"
        }
    ]
}