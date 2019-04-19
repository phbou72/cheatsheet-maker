import React from "react";

import "./SheetItem.scss";

interface SheetItemProps {
    shortcut: Shortcut;
    onDelete: (shortcut: Shortcut) => void;
    onEdit: (shortcut: Shortcut) => void;
    onDragStart?: (shortcut: Shortcut) => void;
    onDragOver?: (shortcut: Shortcut) => void;
    onDragEnd?: () => void;
}

const createKeyStrokesString = (keyStrokes: KeyStroke[]) => {
    const symbols = (keyStrokes && keyStrokes.map(keyStroke => keyStroke.symbol)) || [];
    return symbols.join(" + ");
};

const SheetItem = (props: SheetItemProps) => {
    const { onDelete, onEdit, shortcut, onDragStart, onDragOver, onDragEnd } = props;
    const { description, keyStrokes } = shortcut;

    const keyStrokesString = createKeyStrokesString(keyStrokes);

    return (
        <li
            className="sheet-item"
            draggable
            onDragStart={e => onDragStart && onDragStart(shortcut)}
            onDragOver={e => onDragOver && onDragOver(shortcut)}
            onDragEnd={e => onDragEnd && onDragEnd()}
        >
            {description}: {keyStrokesString}
            <button className="button is-danger is-small is-rounded" onClick={() => onDelete(shortcut)}>
                Delete
            </button>
            <button className="button is-success is-small is-rounded" onClick={() => onEdit(shortcut)}>
                Edit
            </button>
        </li>
    );
};

export default SheetItem;
