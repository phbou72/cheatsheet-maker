import React, { useState } from "react";

import SheetItems from "sheet/SheetItems";
import EditTitle from "sheet/EditTitle";
import AddShortcut from "sheet/AddShortcut";

import ShortcutForm from "shortcut/ShortcutForm";

import "./Sheet.scss";

interface SheetProps {
    sheet: Sheet;
    onSheetUpdateEvent: (id: String, title: string, shortcuts: Shortcut[]) => void;
}

let title: string;

const Sheet = (props: SheetProps) => {
    const { sheet, onSheetUpdateEvent } = props;

    // hooks
    const [shortcuts, setShortcuts] = useState<Shortcut[]>(sheet.shortcuts);
    const [isAddShortcutOpen, setIsAddShortcutOpen] = useState(false);
    const [editedShortcut, setEditedShortcut] = useState<Shortcut | null>(null);

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

    const onEditTitleEvent = (newTitle: string) => {
        title = newTitle;
        onSheetUpdateEvent(sheet.id, newTitle, shortcuts);
    };

    const onAddShortcutClick = () => {
        setEditedShortcut(null);
        setIsAddShortcutOpen(true);
    };
    const onEditShortcutClick = (shortcut: Shortcut) => {
        setEditedShortcut(shortcut);
        setIsAddShortcutOpen(true);
    };

    const onUpdateShortcutsEvent = (newShortcuts: Shortcut[]) => {
        setShortcuts(newShortcuts);
        onSheetUpdateEvent(sheet.id, title, newShortcuts);
    };

    return (
        <div className="sheet">
            <div className="sheet-content">
                <EditTitle onEditTitleEvent={onEditTitleEvent} sheet={sheet} />
                <AddShortcut onAddShortcutClick={onAddShortcutClick} />
                <SheetItems
                    shortcuts={shortcuts}
                    onEditShortcutClick={onEditShortcutClick}
                    onUpdateShortcutsEvent={onUpdateShortcutsEvent}
                />
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
