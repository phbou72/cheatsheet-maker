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
let currentFile: File;

const exportShortcuts = (shortcuts: Shortcut[]) => {
    const object = JSON.stringify({ shortcuts });
    download(object, "shortcuts.json", "application/json");
};

const importShortcuts = (setShortcuts: (shortcuts: Shortcut[]) => void) => {
    if (!currentFile) {
        return;
    }

    let reader = new FileReader();
    reader.onload = function(e: any) {
        let content = e.target.result;
        const shortcuts = JSON.parse(content).shortcuts as Shortcut[];
        setShortcuts(shortcuts);
    };
    reader.readAsText(currentFile);
};

const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
        return;
    }
    currentFile = file;
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
                <input type="file" id="file-input" onChange={e => onFileChange(e)} />

                <a
                    href="#"
                    className="button"
                    onClick={e => {
                        e.preventDefault();
                        importShortcuts(setShortcuts);
                    }}
                >
                    Import
                </a>
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
