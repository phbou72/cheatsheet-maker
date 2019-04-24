import uuidv4 from "uuid/v4";

export const buildEmptySheet = (): Sheet => ({
    title: "A title",
    id: uuidv4(),
    shortcuts: [],
});
