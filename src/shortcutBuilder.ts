import KEYS from "./KeysSymbol";

const createKeyStroke = (value: string): KeyStroke => {
    return {
        label: value,
        symbol: KEYS[value] || value,
    };
};

const createKeyStrokes = (keyStroke: string) => {
    const groups = keyStroke.split("+");

    return (groups && groups.map(createKeyStroke)) || [];
};

const buildShortcut = (description: string, keyStrokes: string): Shortcut => ({
    description,
    keyStrokes: createKeyStrokes(keyStrokes),
});

export default buildShortcut;
