import React, { useState } from "react";

import Menu from "./Menu";
import ShortcutForm from "./shortcut/ShortcutForm";
import Sheet from "./sheet/Sheet";

import "./App.scss";

const App = () => {
    // hooks
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

    const onCloseAddShortcutForm = () => {
        setIsAddShortcutOpen(false);
    };

    const onEditShortcutClick = () => {
        setIsAddShortcutOpen(true);
    };

    const onAddShortcutClick = () => {
        setEditedShortcut(null);
        setIsAddShortcutOpen(true);
    };

    return (
        <div className="app">
            <Menu shortcuts={shortcuts} setShortcuts={setShortcuts} />

            <div className="app-sheets">
                <Sheet
                    shortcuts={shortcuts}
                    setShortcuts={setShortcuts}
                    setEditedShortcut={setEditedShortcut}
                    onAddShortcutClick={onAddShortcutClick}
                    onEditShortcutClick={onEditShortcutClick}
                />
            </div>
            <ShortcutForm
                shortcuts={shortcuts}
                editedShortcut={editedShortcut}
                onAddEvent={shortcut => setShortcuts([...shortcuts, shortcut])}
                onEditEvent={onEditShortcut}
                onClose={onCloseAddShortcutForm}
                isOpen={isAddShortcutOpen}
            />
        </div>
    );
};

export default App;
