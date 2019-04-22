import React, { useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";

import SheetItem from "./SheetItem";
import SheetActions from "./SheetActions";

import "./Sheet.scss";

interface SheetProps {
    shortcuts: Shortcut[];
    setShortcuts: (shortcuts: Shortcut[]) => void;
    setEditedShortcut: (shortcut: Shortcut) => void;
    onAddShortcutEvent: () => void;
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
    return (
        <div className="sheet-edit-title">
            <input
                className="input"
                type="text"
                placeholder="Sheet title"
                value={sheetTitle}
                onChange={e => setSheetTitle(e.target.value)}
            />
            <a href="#" className="button" onClick={_e => setEditTitle(false)}>
                Save
            </a>
        </div>
    );
};

const Sheet = (props: SheetProps) => {
    const { shortcuts, setShortcuts, setEditedShortcut } = props;

    const [sheetTitle, setSheetTitle] = useState("A title");
    const [editTitle, setEditTitle] = useState(false);

    // EDIT/DELETE
    const onDeleteShortcut = (deleteShortcut: Shortcut) =>
        setShortcuts(shortcuts.filter(shortcut => shortcut.description !== deleteShortcut.description));
    const onEditShortcut = (shortcut: Shortcut) => setEditedShortcut(shortcut);

    // DRAG EVENT
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

    const onAddShortcutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        props.onAddShortcutEvent();
    };

    const sheetTitleButton = (
        <a
            href="#"
            onClick={e => {
                e.preventDefault();
                setEditTitle(true);
            }}
        >
            {sheetTitle}
        </a>
    );

    return (
        <div className="sheet">
            <SheetActions setShortcuts={setShortcuts} shortcuts={shortcuts} />

            <div className="sheet-content">
                {editTitle ? <EditTitleForm {...{ sheetTitle, setSheetTitle, setEditTitle }} /> : sheetTitleButton}
                <a href="#" className="sheet-add-shortcut" onClick={onAddShortcutClick}>
                    <MdAddCircleOutline />
                </a>
                <ul>
                    {props.shortcuts.map(shortcut => (
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
        </div>
    );
};

export default Sheet;
