import React, { useState } from "react";

import EditTitle from "common/EditTitle";
import ShortcutForm from "shortcut/ShortcutForm";

import SheetItems from "sheet/SheetItems";
import AddShortcut from "sheet/AddShortcut";
import DeleteSheet from "sheet/DeleteSheet";

import "./Sheet.scss";

interface SheetProps {
    sheet: Sheet;
    onSheetUpdate: (id: string, title: string, shortcuts: Shortcut[]) => void;
    onSheetDelete: (id: string) => void;
}

const Sheet = (props: SheetProps) => {
    const { sheet, onSheetUpdate } = props;

    // hooks
    const [shortcuts, setShortcuts] = useState<Shortcut[]>(sheet.shortcuts);
    const [isShortcutFormOpen, setIsShortcutFormOpen] = useState(false);
    const [editingShortcut, setEditingShortcut] = useState<Shortcut | null>(null);

    // Add/edit/close shortcut form event
    const onAddShortcut = (shortcut: Shortcut) => {
        const newShortcuts = [...shortcuts, shortcut];
        setShortcuts(newShortcuts);
        onSheetUpdate(sheet.id, sheet.title, newShortcuts);
    };

    const onEditShortcut = (oldShortcut: Shortcut, newShortcut: Shortcut) => {
        const shortcutIndex = shortcuts.findIndex(shortcut => shortcut === oldShortcut);

        const newShortcuts = shortcuts.slice(0);
        newShortcuts[shortcutIndex] = newShortcut;
        setShortcuts(newShortcuts);
        setEditingShortcut(null);
        onSheetUpdate(sheet.id, sheet.title, newShortcuts);
    };

    const onCloseShortcutForm = () => {
        setIsShortcutFormOpen(false);
    };

    const onEditTitle = (newTitle: string) => {
        onSheetUpdate(sheet.id, newTitle, shortcuts);
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
        onSheetUpdate(sheet.id, sheet.title, newShortcuts);
    };

    const onDeleteSheetClick = () => {
        props.onSheetDelete(sheet.id);
    };

    return (
        <div className="sheet">
            <div className="sheet-content">
                <DeleteSheet onDeleteSheetClick={onDeleteSheetClick} />
                <EditTitle onEditTitle={onEditTitle} title={sheet.title} />
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
                onAddShortcut={onAddShortcut}
                onEditShortcut={onEditShortcut}
                onClose={onCloseShortcutForm}
                isOpen={isShortcutFormOpen}
            />
        </div>
    );
};

export default Sheet;
