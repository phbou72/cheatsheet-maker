import uuidv4 from "uuid/v4";

export const buildEmptySheet = (): Sheet => ({
    title: "Untitled sheet",
    id: uuidv4(),
    shortcuts: [],
});
