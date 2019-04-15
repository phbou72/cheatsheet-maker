import React, { useState } from "react";

import shortcutBuilder from "../shortcutBuilder";
import Errors from "./Errors";
import {
    isFilled,
    isValidKeyStroke,
    hasNoDuplicateDescription,
} from "./validators";

import "./KeyStrokesForm.scss";

interface Props {
    onAddEvent: (shortcut: Shortcut) => void;
    onEditEvent: (shortcut: Shortcut, newShortcut: Shortcut) => void;
    shortcuts: Shortcut[];
    editedShortcut?: Shortcut;
}

const canSubmit = (
    description: string,
    keyStrokesString: string,
    shortcuts: Shortcut[],
) => {
    return (
        isFilled(description, keyStrokesString, shortcuts) &&
        isValidKeyStroke(description, keyStrokesString, shortcuts) &&
        hasNoDuplicateDescription(description, keyStrokesString, shortcuts)
    );
};

const buildButton = (
    canSubmitForm: boolean,
    onAddClick?: () => void,
    onEditClick?: () => void,
    editedShortcut?: Shortcut,
) => {
    const text = !editedShortcut ? "Add" : "Edit";
    const action = !editedShortcut ? onAddClick : onEditClick;

    return (
        <a
            className="button is-primary"
            {...{ disabled: !canSubmitForm }}
            onClick={action}
        >
            {text}
        </a>
    );
};

let lastEditedShortcut: Shortcut;

const KeyStrokesForm = (props: Props) => {
    const { onAddEvent, onEditEvent, shortcuts, editedShortcut } = props;

    // hooks
    const [description, setDescription] = useState("");
    const [keyStrokesString, setKeyStrokesString] = useState("");

    if (
        (!lastEditedShortcut && editedShortcut) ||
        (editedShortcut && lastEditedShortcut !== editedShortcut)
    ) {
        setDescription(editedShortcut.description);
        setKeyStrokesString(
            editedShortcut.keyStrokes
                .map(keyStroke => keyStroke.label)
                .join("+"),
        );
        lastEditedShortcut = editedShortcut;
    }

    const canSubmitForm = canSubmit(description, keyStrokesString, shortcuts);

    const onAddClick = canSubmitForm
        ? () => {
              onAddEvent(shortcutBuilder(description, keyStrokesString));
              setDescription("");
              setKeyStrokesString("");
          }
        : undefined;

    const onEditClick = canSubmitForm
        ? () => {
              onEditEvent(
                  lastEditedShortcut,
                  shortcutBuilder(description, keyStrokesString),
              );
          }
        : undefined;

    const button = buildButton(
        canSubmitForm,
        onAddClick,
        onEditClick,
        editedShortcut,
    );

    return (
        <div className="key-strokes-form">
            <input
                className="input"
                name="description"
                placeholder="Description"
                type="text"
                value={description}
                onChange={e => setDescription(e.currentTarget.value)}
            />

            <input
                className="input"
                name="keyStrokes"
                placeholder="Key strokes"
                type="text"
                onChange={e => setKeyStrokesString(e.currentTarget.value)}
                value={keyStrokesString}
            />

            {button}

            <Errors
                description={description}
                keyStrokesString={keyStrokesString}
                shortcuts={shortcuts}
            />
        </div>
    );
};

export default KeyStrokesForm;
