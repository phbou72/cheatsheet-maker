import React, { useState } from "react";

import KeyStrokesForm from "./form/KeyStrokesForm";
import Sheet from "./sheet/Sheet";

import shortcutBuilder from "./shortcutBuilder";

import "./App.scss";

const App = () => {
    const [editedShortcut, setEditedShortcut] = useState<Shortcut | null>(null);

    const [shortcuts, setShortcuts] = useState<Shortcut[]>([
        // shortcutBuilder("Supprimer la ligne", "shift+cmd+k"),
        // shortcutBuilder("Déplacer la ligne", "alt+down/up"),
        // shortcutBuilder("Renommer la variable", "fn+f2"),
    ]);

    const onEditShortcut = (oldShortcut: Shortcut, newShortcut: Shortcut) => {
        const shortcutIndex = shortcuts.findIndex(shortcut => shortcut === oldShortcut);

        const newShortcuts = shortcuts.slice(0);
        newShortcuts[shortcutIndex] = newShortcut;
        setShortcuts(newShortcuts);
        setEditedShortcut(null);
    };

    return (
        <div className="app">
            <Sheet shortcuts={shortcuts} setShortcuts={setShortcuts} setEditedShortcut={setEditedShortcut} />
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
