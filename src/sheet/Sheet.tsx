import React, { useState } from "react";

// styling
import styled from "styled-components";

// common
import EditTitle from "common/EditTitle";

import ShortcutForm from "shortcut/ShortcutForm";

// sheet
import SheetItems from "sheet/SheetItems";
import AddShortcutButton from "sheet/AddShortcutButton";
import DeleteSheetButton from "sheet/DeleteSheetButton";

const StyledSheet = styled.div`
    padding: 16px;
    width: 100%;
    box-sizing: border-box;
`;

const SheetContent = styled.div`
    position: relative;
    box-sizing: border-box;
    width: 100%;
    min-height: 250px;
    border-radius: 8px;
    border: solid 1px rgba(0, 10, 20, 0.3);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
    padding: 16px;
    background-color: rgba(255, 255, 255, 0.3);
`;

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
        const shortcutIndex = shortcuts.findIndex((shortcut) => shortcut === oldShortcut);

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
        <StyledSheet>
            <SheetContent>
                <DeleteSheetButton onDeleteSheetClick={onDeleteSheetClick} />
                <EditTitle onEditTitle={onEditTitle} title={sheet.title} />
                <SheetItems
                    shortcuts={shortcuts}
                    onEditShortcutClick={onEditShortcutClick}
                    onUpdateShortcuts={onUpdateShortcuts}
                />
                <AddShortcutButton onAddShortcutClick={onAddShortcutClick} />
            </SheetContent>
            <ShortcutForm
                shortcuts={shortcuts}
                editedShortcut={editingShortcut}
                onAddShortcut={onAddShortcut}
                onEditShortcut={onEditShortcut}
                onClose={onCloseShortcutForm}
                isOpen={isShortcutFormOpen}
            />
        </StyledSheet>
    );
};

export default Sheet;
