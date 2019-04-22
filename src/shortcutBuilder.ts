import uuidv4 from "uuid/v4";

import KEYS from "./KeysSymbol";

const createSplitteStroke = (value: string) =>
    value.split("/").map(valueSplitted => KEYS[valueSplitted] || valueSplitted);

const createKeyStroke = (value: string): KeyStroke => ({
    label: value,
    symbol: createSplitteStroke(value).join("/"),
});

const createKeyStrokes = (keyStroke: string) => keyStroke.split("+").map(createKeyStroke);

const buildShortcut = (description: string, keyStrokes: string): Shortcut => ({
    description,
    id: uuidv4(),
    keyStrokes: createKeyStrokes(keyStrokes),
});

export default buildShortcut;
