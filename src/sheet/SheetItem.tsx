import React from "react";

import "./SheetItem.scss";

interface SheetItemProps {
    shortcut: Shortcut;
    onDelete: (shortcut: Shortcut) => void;
    onEdit: (shortcut: Shortcut) => void;
    onDragStart?: (e: any, shortcut: Shortcut) => void;
    onDragOver?: (e: any, shortcut: Shortcut) => void;
}

const createKeyStrokesString = (keyStrokes: KeyStroke[]) => {
    const symbols =
        (keyStrokes && keyStrokes.map(keyStroke => keyStroke.symbol)) || [];
    return symbols.join(" + ");
};

const SheetItem = (props: SheetItemProps) => {
    const { onDelete, onEdit, onDragStart, onDragOver, shortcut } = props;
    const { description, keyStrokes } = shortcut;

    const keyStrokesString = createKeyStrokesString(keyStrokes);

    return (
        <li
            className="sheet-item"
            draggable
            onDragStart={e => onDragStart && onDragStart(e, shortcut)}
            onDragOver={e => onDragOver && onDragOver(e, shortcut)}
        >
            {description}: {keyStrokesString}
            <button
                className="button is-danger is-small is-rounded"
                onClick={() => onDelete(shortcut)}
            >
                Delete
            </button>
            <button
                className="button is-success is-small is-rounded"
                onClick={() => onEdit(shortcut)}
            >
                Edit
            </button>
        </li>
    );
};

export default SheetItem;
