import { v4 as uuidv4 } from "uuid";

export const buildEmptySheet = (): Sheet => ({
    title: "Untitled sheet",
    id: uuidv4(),
    shortcuts: [],
});
