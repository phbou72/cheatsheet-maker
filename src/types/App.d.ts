interface KeyStroke {
    label: string;
    symbol: string;
}

interface Shortcut {
    description: string;
    id: string; // uuid
    keyStrokes: KeyStroke[];
}

interface Sheet {
    id: string; // uuid
    shortcuts: Shortcut[];
    title: string;
}
