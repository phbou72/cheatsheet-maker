import React, { useState } from "react";

import ShortcutForm from "./shortcut/ShortcutForm";
import Sheet from "./sheet/Sheet";

import "./App.scss";

const App = () => {
    const [editedShortcut, setEditedShortcut] = useState<Shortcut | null>(null);

    const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
    const [isAddShortcutOpen, setIsAddShortcutOpen] = useState(false);

    const onEditShortcut = (oldShortcut: Shortcut, newShortcut: Shortcut) => {
        const shortcutIndex = shortcuts.findIndex(shortcut => shortcut === oldShortcut);

        const newShortcuts = shortcuts.slice(0);
        newShortcuts[shortcutIndex] = newShortcut;
        setShortcuts(newShortcuts);
        setEditedShortcut(null);
    };

    const onCloseForm = () => {
        setIsAddShortcutOpen(false);
    };

    const onAddShortcutEvent = () => {
        setIsAddShortcutOpen(true);
    };

    return (
        <div className="app">
            <div className="app-sheets">
                <Sheet
                    shortcuts={shortcuts}
                    setShortcuts={setShortcuts}
                    setEditedShortcut={setEditedShortcut}
                    onAddShortcutEvent={onAddShortcutEvent}
                />
            </div>
            <ShortcutForm
                shortcuts={shortcuts}
                editedShortcut={editedShortcut}
                onAddEvent={shortcut => setShortcuts([...shortcuts, shortcut])}
                onEditEvent={onEditShortcut}
                onClose={onCloseForm}
                isOpen={isAddShortcutOpen}
            />
        </div>
    );
};

export default App;
