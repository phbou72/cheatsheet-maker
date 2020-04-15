import React from "react";

// styling
import styled from "styled-components";

const StyledSheetItem = styled.li`
    display: flex;
    align-items: center;
    margin: 0 0 8px 0;
    font-size: 18px;
    line-height: 32px;

    &:hover {
        .button {
            display: inline;
        }
    }

    .button {
        display: none;
        margin-left: 9px;
        &:first-child {
            margin-left: 16px;
        }
    }
`;

interface SheetItemProps {
    shortcut: Shortcut;
    onDeleteShortcutClick: (shortcut: Shortcut) => void;
    onEditShortcutClick: (shortcut: Shortcut) => void;
    onDragStart: (shortcut: Shortcut) => void;
    onDragOver: (shortcut: Shortcut) => void;
    onDragEnd: () => void;
}

const createKeyStrokesString = (keyStrokes: KeyStroke[]) => {
    const symbols = (keyStrokes && keyStrokes.map((keyStroke) => keyStroke.symbol)) || [];
    return symbols.join(" + ");
};

const SheetItem = (props: SheetItemProps) => {
    const { onDeleteShortcutClick, onEditShortcutClick, shortcut, onDragStart, onDragOver, onDragEnd } = props;
    const { description, keyStrokes } = shortcut;

    const keyStrokesString = createKeyStrokesString(keyStrokes);

    return (
        <StyledSheetItem
            className="sheet-item"
            draggable
            onDragStart={(_e) => onDragStart(shortcut)}
            onDragOver={(_e) => onDragOver(shortcut)}
            onDragEnd={(_e) => onDragEnd()}
        >
            {description}: {keyStrokesString}
            <button className="button is-danger is-small is-rounded" onClick={() => onDeleteShortcutClick(shortcut)}>
                Delete
            </button>
            <button className="button is-success is-small is-rounded" onClick={() => onEditShortcutClick(shortcut)}>
                Edit
            </button>
        </StyledSheetItem>
    );
};

export default SheetItem;
