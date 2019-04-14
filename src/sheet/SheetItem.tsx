import React from "react";

import "./SheetItem.scss";

interface SheetItemProps {
    shortcut: Shortcut;
    onDelete: (shortcut: Shortcut) => void;
}

const createKeyStrokesString = (keyStrokes: KeyStroke[]) => {
    const symbols = (keyStrokes && keyStrokes.map(keyStroke => keyStroke.symbol)) || [];
    return symbols.join(" + ");
};

const SheetItem = (props: SheetItemProps) => {
    const { onDelete, shortcut } = props;
    const { description, keyStrokes } = shortcut;

    const keyStrokesString = createKeyStrokesString(keyStrokes);

    return (
        <li className="sheet-item">
            {description}: {keyStrokesString}
            <button
                className="button is-danger is-small is-rounded"
                onClick={() => onDelete(shortcut)}
            >
                Delete
            </button>
            <button className="button is-success is-small is-rounded">Edit</button>
        </li>
    );
};

export default SheetItem;
