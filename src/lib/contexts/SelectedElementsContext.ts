import { SelectedElements } from "@lib/types";
import { createContext } from "react";


const SelectedElementsContext = createContext<SelectedElements>({
    selectedElements: [],
    selectedConnections: [],
});

export default SelectedElementsContext;
