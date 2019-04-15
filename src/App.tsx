import React, { useState } from "react";

import KeyStrokesForm from "./form/KeyStrokesForm";
import Sheet from "./sheet/Sheet";

import "./App.scss";

const App = () => {
    const [editedShortcut, setEditedShortcut] = useState();

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

    const onEditShortcut = (oldShortcut: Shortcut, newShortcut: Shortcut) => {
        const shortcutIndex = shortcuts.findIndex(
            shortcut => shortcut === oldShortcut,
        );

        const newShortcuts = shortcuts.slice(0);
        newShortcuts[shortcutIndex] = newShortcut;
        setShortcuts(newShortcuts);
    };

    return (
        <div className="app">
            <Sheet
                shortcuts={shortcuts}
                setShortcuts={setShortcuts}
                setEditedShortcut={setEditedShortcut}
            />
            <KeyStrokesForm
                shortcuts={shortcuts}
                editedShortcut={editedShortcut}
                onAddEvent={shortcut => setShortcuts([...shortcuts, shortcut])}
                onEditEvent={onEditShortcut}
            />
        </div>
    );
};

export default App;
