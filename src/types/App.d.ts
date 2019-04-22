interface Shortcut {
    description: string;
    id: string; // uuid
    keyStrokes: KeyStroke[];
}

interface KeyStroke {
    label: string;
    symbol: string;
}
