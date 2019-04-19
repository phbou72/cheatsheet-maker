import React, { useState } from "react";

import KeyStrokeForm from "./keyStroke/KeyStrokeForm";
import Sheet from "./sheet/Sheet";

import "./App.scss";

const App = () => {
    const [editedShortcut, setEditedShortcut] = useState<Shortcut | null>(null);

    const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);

    const onEditShortcut = (oldShortcut: Shortcut, newShortcut: Shortcut) => {
        const shortcutIndex = shortcuts.findIndex(shortcut => shortcut === oldShortcut);

        const newShortcuts = shortcuts.slice(0);
        newShortcuts[shortcutIndex] = newShortcut;
        setShortcuts(newShortcuts);
        setEditedShortcut(null);
    };

    return (
        <div className="app">
            <div className="app-sheets">
                <Sheet shortcuts={shortcuts} setShortcuts={setShortcuts} setEditedShortcut={setEditedShortcut} />
            </div>
            <KeyStrokeForm
                shortcuts={shortcuts}
                editedShortcut={editedShortcut}
                onAddEvent={shortcut => setShortcuts([...shortcuts, shortcut])}
                onEditEvent={onEditShortcut}
            />
        </div>
    );
};

export default App;
