import React, { useState } from "react";

import KeyStrokesForm from "./form/KeyStrokesForm";
import Sheet from "./sheet/Sheet";

import "./App.scss";

const App = () => {
    const [shortcuts, setShortcuts] = useState<Shortcut[]>([
        {
            description: "Supprimer la ligne",
            keyStrokes: [
                { label: "alt", symbol: "alt" },
                { label: "k", symbol: "k" },
            ],
        },
        {
            description: "Déplacer la ligne",
            keyStrokes: [
                { label: "cmd", symbol: "cmd" },
                { label: "k", symbol: "k" },
            ],
        },
        {
            description: "Refactoriser la ligne",
            keyStrokes: [
                { label: "cmd", symbol: "cmd" },
                { label: "k", symbol: "k" },
            ],
        },
    ]);

    return (
        <div className="app">
            <Sheet shortcuts={shortcuts} setShortcuts={setShortcuts} />
            <KeyStrokesForm
                shortcuts={shortcuts}
                onAddEvent={shortcut => setShortcuts([...shortcuts, shortcut])}
            />
        </div>
    );
};

export default App;
