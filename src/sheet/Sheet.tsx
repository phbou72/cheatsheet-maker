import React, { useState } from "react";

import SheetItems from "sheet/SheetItems";
import EditTitle from "sheet/EditTitle";
import AddShortcut from "sheet/AddShortcut";
import DeleteSheet from "sheet/DeleteSheet";

import ShortcutForm from "shortcut/ShortcutForm";

import "./Sheet.scss";

interface SheetProps {
    sheet: Sheet;
    onSheetUpdateEvent: (id: string, title: string, shortcuts: Shortcut[]) => void;
    onSheetDeleteEvent: (id: string) => void;
}

let title: string;

const Sheet = (props: SheetProps) => {
    const { sheet, onSheetUpdateEvent } = props;

    // hooks
    const [shortcuts, setShortcuts] = useState<Shortcut[]>(sheet.shortcuts);
    const [isShortcutFormOpen, setIsShortcutFormOpen] = useState(false);
    const [editingShortcut, setEditingShortcut] = useState<Shortcut | null>(null);

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
        setEditingShortcut(null);
        onSheetUpdateEvent(sheet.id, title, newShortcuts);
    };

    const onCloseShortcutForm = () => {
        setIsShortcutFormOpen(false);
    };

    const onEditTitleEvent = (newTitle: string) => {
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

    const onUpdateShortcutsEvent = (newShortcuts: Shortcut[]) => {
        setShortcuts(newShortcuts);
        onSheetUpdateEvent(sheet.id, title, newShortcuts);
    };

    const onDeleteSheetEvent = () => {
        props.onSheetDeleteEvent(sheet.id);
    };

    return (
        <div className="sheet">
            <div className="sheet-content">
                <DeleteSheet onDeleteSheetEvent={onDeleteSheetEvent} />
                <EditTitle onEditTitleEvent={onEditTitleEvent} sheet={sheet} />
                <SheetItems
                    shortcuts={shortcuts}
                    onEditShortcutClick={onEditShortcutClick}
                    onUpdateShortcutsEvent={onUpdateShortcutsEvent}
                />
                <AddShortcut onAddShortcutClick={onAddShortcutClick} />
            </div>
            <ShortcutForm
                shortcuts={shortcuts}
                editedShortcut={editingShortcut}
                onAddEvent={onAddShortcutEvent}
                onEditEvent={onEditShortcutEvent}
                onClose={onCloseShortcutForm}
                isOpen={isShortcutFormOpen}
            />
        </div>
    );
};

export default Sheet;
