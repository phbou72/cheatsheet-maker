import React, { useState } from "react";

import SheetItem from "./SheetItem";

import "./Sheet.scss";

interface SheetProps {
    shortcuts: Shortcut[];
    setShortcuts: (shortcuts: Shortcut[]) => void;
    setEditedShortcut: (shortcut: Shortcut) => void;
}

// let draggedShortcut: Shortcut;
// let draggedOverShortcut: Shortcut;

const Sheet = (props: SheetProps) => {
    const { shortcuts, setShortcuts, setEditedShortcut } = props;

    const onDeleteShortcut = (deleteShortcut: Shortcut) => {
        setShortcuts(
            shortcuts.filter(
                shortcut => shortcut.description !== deleteShortcut.description,
            ),
        );
    };

    const onEditShortcut = (shortcut: Shortcut) => {
        setEditedShortcut(shortcut);
    };

    // const onDragStart = (e: any, shortcut: Shortcut) => {
    //     draggedShortcut = shortcut;
    // };

    // const onDragOver = (e: any, shortcut: Shortcut) => {
    //     if (draggedOverShortcut === shortcut) {
    //         return;
    //     }

    //     draggedOverShortcut = shortcut;

    //     const draggedIndex = shortcuts.findIndex(
    //         shortcut => shortcut.description === draggedShortcut.description,
    //     );

    //     const draggedOverIndex = shortcuts.findIndex(
    //         shortcut =>
    //             shortcut.description === draggedOverShortcut.description,
    //     );

    //     const oldShortcut = shortcuts[draggedOverIndex];
    //     shortcuts[draggedOverIndex] = shortcut;
    //     shortcuts[draggedIndex] = oldShortcut;
    // };

    // const onDrop = (e: any) => {};

    return (
        <div className="sheet">
            {/* <div className="sheet-header">
                <a href="#" className="button">
                    Import
                </a>
                <a href="#" className="button">
                    Export
                </a>
            </div> */}
            <div className="sheet-content">
                <ul
                // onDrop={onDrop}
                >
                    {props.shortcuts.map(shortcut => (
                        <SheetItem
                            // onDragOver={onDragOver}
                            // onDragStart={onDragStart}
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
