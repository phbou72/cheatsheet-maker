import React, { useState } from "react";

import SheetItems from "sheet/SheetItems";
import EditTitle from "sheet/EditTitle";
import AddShortcut from "sheet/AddShortcut";
import DeleteSheet from "sheet/DeleteSheet";

import ShortcutForm from "shortcut/ShortcutForm";

import "./Sheet.scss";

interface SheetProps {
    sheet: Sheet;
    onSheetUpdate: (id: string, title: string, shortcuts: Shortcut[]) => void;
    onSheetDelete: (id: string) => void;
}

let title: string;

const Sheet = (props: SheetProps) => {
    const { sheet, onSheetUpdate: onSheetUpdateEvent } = props;

    // hooks
    const [shortcuts, setShortcuts] = useState<Shortcut[]>(sheet.shortcuts);
    const [isShortcutFormOpen, setIsShortcutFormOpen] = useState(false);
    const [editingShortcut, setEditingShortcut] = useState<Shortcut | null>(null);

    // Add/edit/close shortcut form event
    const onAddShortcut = (shortcut: Shortcut) => {
        const newShortcuts = [...shortcuts, shortcut];
        setShortcuts(newShortcuts);
        onSheetUpdateEvent(sheet.id, title, newShortcuts);
    };

    const onEditShortcut = (oldShortcut: Shortcut, newShortcut: Shortcut) => {
        const shortcutIndex = shortcuts.findIndex(shortcut => shortcut === oldShortcut);

        const newShortcuts = shortcuts.slice(0);
        newShortcuts[shortcutIndex] = newShortcut;
        setShortcuts(newShortcuts);
        setEditingShortcut(null);
        onSheetUpdateEvent(sheet.id, title, newShortcuts);
    };

    const onCloseShortcutForm = () => {
        setIsShortcutFormOpen(false);
    };

    const onEditTitle = (newTitle: string) => {
        title = newTitle;
        onSheetUpdateEvent(sheet.id, newTitle, shortcuts);
    };

    const onAddShortcutClick = () => {
        setEditingShortcut(null);
        setIsShortcutFormOpen(true);
    };

    const onEditShortcutClick = (shortcut: Shortcut) => {
        setEditingShortcut(shortcut);
        setIsShortcutFormOpen(true);
    };

    const onUpdateShortcuts = (newShortcuts: Shortcut[]) => {
        setShortcuts(newShortcuts);
        onSheetUpdateEvent(sheet.id, title, newShortcuts);
    };

    const onDeleteSheetClick = () => {
        props.onSheetDelete(sheet.id);
    };

    return (
        <div className="sheet">
            <div className="sheet-content">
                <DeleteSheet onDeleteSheetClick={onDeleteSheetClick} />
                <EditTitle onEditTitle={onEditTitle} sheet={sheet} />
                <SheetItems
                    shortcuts={shortcuts}
                    onEditShortcutClick={onEditShortcutClick}
                    onUpdateShortcuts={onUpdateShortcuts}
                />
                <AddShortcut onAddShortcutClick={onAddShortcutClick} />
            </div>
            <ShortcutForm
                shortcuts={shortcuts}
                editedShortcut={editingShortcut}
                onAddEvent={onAddShortcut}
                onEditEvent={onEditShortcut}
                onClose={onCloseShortcutForm}
                isOpen={isShortcutFormOpen}
            />
        </div>
    );
};

export default Sheet;
