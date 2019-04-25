import React, { useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";

import SheetItem from "sheet/SheetItem";
import EditTitle from "sheet/EditTitle";
import ShortcutForm from "shortcut/ShortcutForm";

import "./Sheet.scss";

interface SheetProps {
    sheet: Sheet;
    onSheetUpdateEvent: (id: String, title: string, shortcuts: Shortcut[]) => void;
}

let isSheetInitialized: { [id: string]: boolean } = {};
let draggedShortcut: Shortcut;
let draggedOverShortcut: Shortcut;
let title: string;

const Sheet = (props: SheetProps) => {
    const { sheet, onSheetUpdateEvent } = props;

    // hooks
    const [editedShortcut, setEditedShortcut] = useState<Shortcut | null>(null);
    const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
    const [isAddShortcutOpen, setIsAddShortcutOpen] = useState(false);

    if (!isSheetInitialized[sheet.id]) {
        setShortcuts(sheet.shortcuts);
        isSheetInitialized[sheet.id] = true;
    }

    // Add/edit/close shortcut form event
    const onAddShortcutEvent = (shortcut: Shortcut) => {
        const newShortcuts = [...shortcuts, shortcut];
        setShortcuts(newShortcuts);
        onSheetUpdateEvent(sheet.id, title, newShortcuts);
    };
    const onEditShortcutEvent = (oldShortcut: Shortcut, newShortcut: Shortcut) => {
        const shortcutIndex = shortcuts.findIndex(shortcut => shortcut === oldShortcut);

        const newShortcuts = shortcuts.slice(0);
        newShortcuts[shortcutIndex] = newShortcut;
        setShortcuts(newShortcuts);
        setEditedShortcut(null);
        onSheetUpdateEvent(sheet.id, title, newShortcuts);
    };
    const onCloseAddShortcutForm = () => {
        setIsAddShortcutOpen(false);
    };

    // Add/edit/delete shortcut
    const onAddShortcutClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setEditedShortcut(null);
        setIsAddShortcutOpen(true);
    };
    const onDeleteShortcut = (deleteShortcut: Shortcut) =>
        setShortcuts(shortcuts.filter(shortcut => shortcut.description !== deleteShortcut.description));
    const onEditShortcut = (shortcut: Shortcut) => {
        setEditedShortcut(shortcut);
        setIsAddShortcutOpen(true);
    };

    // Drag event
    const onDragStart = (shortcut: Shortcut) => {
        draggedShortcut = shortcut;
    };
    const onDragOver = (shortcut: Shortcut) => {
        if (draggedOverShortcut === shortcut) {
            return;
        }

        draggedOverShortcut = shortcut;
    };
    const sameId = (compareShortcut: Shortcut) => (toShortcut: Shortcut) => toShortcut.id === compareShortcut.id;
    const onDragEnd = () => {
        const draggedIndex = shortcuts.findIndex(sameId(draggedShortcut));
        const draggedOverIndex = shortcuts.findIndex(sameId(draggedOverShortcut));

        const newShortcuts = shortcuts.splice(0);
        newShortcuts.splice(draggedOverIndex, 1, draggedShortcut);
        newShortcuts.splice(draggedIndex, 1, draggedOverShortcut);

        setShortcuts(newShortcuts);
        onSheetUpdateEvent(sheet.id, title, newShortcuts);
    };

    const onEditTitleEvent = (newTitle: string) => {
        title = newTitle;
        onSheetUpdateEvent(sheet.id, newTitle, shortcuts);
    };

    return (
        <div className="sheet">
            <div className="sheet-content">
                <EditTitle onEditTitleEvent={onEditTitleEvent} sheet={sheet} />
                <div className="sheet-add-shortcut" onClick={onAddShortcutClick}>
                    Add Shortcut
                    <MdAddCircleOutline />
                </div>
                <ul>
                    {shortcuts.map(shortcut => (
                        <SheetItem
                            onDragOver={onDragOver}
                            onDragStart={onDragStart}
                            onDragEnd={onDragEnd}
                            shortcut={shortcut}
                            key={shortcut.id}
                            onDelete={onDeleteShortcut}
                            onEdit={onEditShortcut}
                        />
                    ))}
                </ul>
            </div>
            <ShortcutForm
                shortcuts={shortcuts}
                editedShortcut={editedShortcut}
                onAddEvent={onAddShortcutEvent}
                onEditEvent={onEditShortcutEvent}
                onClose={onCloseAddShortcutForm}
                isOpen={isAddShortcutOpen}
            />
        </div>
    );
};

export default Sheet;
