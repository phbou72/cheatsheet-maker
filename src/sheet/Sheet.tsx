import React, { useState } from "react";

import SheetItem from "./SheetItem";

import download from "../download";

import "./Sheet.scss";

interface SheetProps {
    shortcuts: Shortcut[];
    setShortcuts: (shortcuts: Shortcut[]) => void;
    setEditedShortcut: (shortcut: Shortcut) => void;
}

let draggedShortcut: Shortcut;
let draggedOverShortcut: Shortcut;

const exportShortcuts = (shortcuts: Shortcut[]) => {
    const object = JSON.stringify({ shortcuts });
    download(object, "shortcuts.json", "application/json");
};

const clearShortcuts = (setShortcuts: (shortcuts: Shortcut[]) => void) => {
    setShortcuts([]);
};

const importShortcuts = (e: React.ChangeEvent<HTMLInputElement>, setShortcuts: (shortcuts: Shortcut[]) => void) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
        return;
    }

    let reader = new FileReader();
    reader.onload = function(e: any) {
        let content = e.target.result;
        const shortcuts = JSON.parse(content).shortcuts as Shortcut[];
        setShortcuts(shortcuts);
    };
    reader.readAsText(file);
};

const Sheet = (props: SheetProps) => {
    const { shortcuts, setShortcuts, setEditedShortcut } = props;

    const onDeleteShortcut = (deleteShortcut: Shortcut) => {
        setShortcuts(shortcuts.filter(shortcut => shortcut.description !== deleteShortcut.description));
    };

    const onEditShortcut = (shortcut: Shortcut) => {
        setEditedShortcut(shortcut);
    };

    const onDragStart = (shortcut: Shortcut) => {
        draggedShortcut = shortcut;
    };

    const onDragOver = (shortcut: Shortcut) => {
        if (draggedOverShortcut === shortcut) {
            return;
        }

        draggedOverShortcut = shortcut;
    };

    const onDragEnd = () => {
        const draggedIndex = shortcuts.findIndex(shortcut => shortcut.description === draggedShortcut.description);
        const draggedOverIndex = shortcuts.findIndex(
            shortcut => shortcut.description === draggedOverShortcut.description,
        );

        const newShortcuts = shortcuts.splice(0);
        newShortcuts.splice(draggedOverIndex, 1, draggedShortcut);
        newShortcuts.splice(draggedIndex, 1, draggedOverShortcut);

        setShortcuts(newShortcuts);
    };

    return (
        <div className="sheet">
            <div className="sheet-header">
                <input
                    type="file"
                    name="importInput"
                    id="importInput"
                    onChange={e => importShortcuts(e, setShortcuts)}
                />
                <label htmlFor="importInput">
                    <span className="button">Import</span>
                </label>

                <a
                    href="#"
                    className="button"
                    onClick={e => {
                        e.preventDefault();
                        exportShortcuts(shortcuts);
                    }}
                >
                    Export
                </a>

                <a
                    href="#"
                    className="button"
                    onClick={e => {
                        e.preventDefault();
                        clearShortcuts(setShortcuts);
                    }}
                >
                    Clear
                </a>
            </div>
            <div className="sheet-content">
                <ul>
                    {props.shortcuts.map(shortcut => (
                        <SheetItem
                            onDragOver={onDragOver}
                            onDragStart={onDragStart}
                            onDragEnd={onDragEnd}
                            shortcut={shortcut}
                            key={shortcut.description}
                            onDelete={onDeleteShortcut}
                            onEdit={onEditShortcut}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sheet;
