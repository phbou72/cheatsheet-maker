import React, { useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";

import SheetItem from "sheet/SheetItem";
import ShortcutForm from "shortcut/ShortcutForm";

import "./Sheet.scss";

interface SheetProps {
    sheet: Sheet;
    onSheetUpdateEvent: (id: String, title: string, shortcuts: Shortcut[]) => void;
}

let draggedShortcut: Shortcut;
let draggedOverShortcut: Shortcut;

interface EditTitleFormProps {
    sheetTitle: string;
    setSheetTitle: (sheetTitle: string) => void;
    setEditTitle: (editTitle: boolean) => void;
}

const EditTitleForm = (props: EditTitleFormProps) => {
    const { sheetTitle, setSheetTitle, setEditTitle } = props;

    const onSaveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setEditTitle(false);
    };

    return (
        <div className="sheet-edit-title">
            <input
                className="input"
                type="text"
                placeholder="Sheet title"
                value={sheetTitle}
                onChange={e => setSheetTitle(e.target.value)}
            />
            <button className="button" onClick={onSaveClick}>
                Save
            </button>
        </div>
    );
};

let isSheetInitialized: { [id: string]: boolean } = {};

const Sheet = (props: SheetProps) => {
    const { sheet } = props;

    // hooks
    const [editedShortcut, setEditedShortcut] = useState<Shortcut | null>(null);
    const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
    const [isAddShortcutOpen, setIsAddShortcutOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [editTitle, setEditTitle] = useState(false);

    if (!isSheetInitialized[sheet.id]) {
        setTitle(sheet.title);
        setShortcuts(sheet.shortcuts);
        isSheetInitialized[sheet.id] = true;
    }

    // Form Events
    const onAddShortcutEvent = (shortcut: Shortcut) => setShortcuts([...shortcuts, shortcut]);
    const onEditShortcutEvent = (oldShortcut: Shortcut, newShortcut: Shortcut) => {
        const shortcutIndex = shortcuts.findIndex(shortcut => shortcut === oldShortcut);

        const newShortcuts = shortcuts.slice(0);
        newShortcuts[shortcutIndex] = newShortcut;
        setShortcuts(newShortcuts);
        setEditedShortcut(null);
    };
    const onCloseAddShortcutForm = () => {
        setIsAddShortcutOpen(false);
    };

    const onAddShortcutClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setEditedShortcut(null);
        setIsAddShortcutOpen(true);
    };

    // edit/delete
    const onDeleteShortcut = (deleteShortcut: Shortcut) =>
        setShortcuts(shortcuts.filter(shortcut => shortcut.description !== deleteShortcut.description));

    const onEditShortcut = (shortcut: Shortcut) => {
        setEditedShortcut(shortcut);
        setIsAddShortcutOpen(true);
    };

    // drag event
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
    };

    const onEditTitle = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setEditTitle(true);
    };

    const sheetTitleButton = (
        <a href="#sheettitle" onClick={onEditTitle}>
            {title}
        </a>
    );

    return (
        <div className="sheet">
            <div className="sheet-content">
                {editTitle ? (
                    <EditTitleForm {...{ sheetTitle: title, setSheetTitle: setTitle, setEditTitle }} />
                ) : (
                    sheetTitleButton
                )}
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
