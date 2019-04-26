import React from "react";

import SheetItem from "sheet/SheetItem";

import "./SheetItems.scss";

interface Props {
    shortcuts: Shortcut[];
    onUpdateShortcuts: (shortcuts: Shortcut[]) => void;
    onEditShortcutClick: (shortcut: Shortcut) => void;
}

let draggedShortcut: Shortcut;
let draggedOverShortcut: Shortcut;

const SheetItems = (props: Props) => {
    const { shortcuts, onUpdateShortcuts: onUpdateShortcutsEvent } = props;

    // edit/delete button events
    const onDeleteShortcutClick = (deleteShortcut: Shortcut) => {
        const newShortcuts = shortcuts.filter(shortcut => shortcut.description !== deleteShortcut.description);
        onUpdateShortcutsEvent(newShortcuts);
    };
    const onEditShortcutClick = (shortcut: Shortcut) => {
        props.onEditShortcutClick(shortcut);
    };

    // Drag events
    const sameId = (compareShortcut: Shortcut) => (toShortcut: Shortcut) => toShortcut.id === compareShortcut.id;
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
        const draggedIndex = shortcuts.findIndex(sameId(draggedShortcut));
        const draggedOverIndex = shortcuts.findIndex(sameId(draggedOverShortcut));

        const newShortcuts = shortcuts.splice(0);
        newShortcuts.splice(draggedOverIndex, 1, draggedShortcut);
        newShortcuts.splice(draggedIndex, 1, draggedOverShortcut);

        onUpdateShortcutsEvent(newShortcuts);
    };

    return (
        <ul className="sheet-items">
            {shortcuts.map(shortcut => (
                <SheetItem
                    onDragOver={onDragOver}
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                    shortcut={shortcut}
                    key={shortcut.id}
                    onDeleteShortcutClick={onDeleteShortcutClick}
                    onEditShortcutClick={onEditShortcutClick}
                />
            ))}
        </ul>
    );
};

export default SheetItems;
