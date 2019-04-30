import React, { useState } from "react";

import shortcutBuilder from "shortcutBuilder";

import Modal from "common/Modal";

import FormErrors from "shortcut/FormErrors";
import { isFilled, isValidKeyStroke } from "shortcut/validators";

import "./ShortcutForm.scss";

interface Props {
    onAddShortcut: (shortcut: Shortcut) => void;
    onEditShortcut: (shortcut: Shortcut, newShortcut: Shortcut) => void;
    shortcuts: Shortcut[];
    editedShortcut: Shortcut | null;
    isOpen: boolean;
    onClose: () => void;
}

const canSubmit = (description: string, keyStrokesString: string, shortcuts: Shortcut[]) => {
    return (
        isFilled(description, keyStrokesString, shortcuts) && isValidKeyStroke(description, keyStrokesString, shortcuts)
    );
};

const buildSubmitButton = (
    canSubmitForm: boolean,
    editedShortcut: Shortcut | null,
    onAddClick?: () => void,
    onEditClick?: () => void,
) => {
    const text = !editedShortcut ? "Add" : "Edit";
    const action = !editedShortcut ? onAddClick : onEditClick;

    return (
        <a className="button is-primary" {...{ disabled: !canSubmitForm }} onClick={action}>
            {text}
        </a>
    );
};

let lastEditedShortcut: Shortcut | null;

const KeyStrokeForm = (props: Props) => {
    const { onAddShortcut, onEditShortcut, shortcuts, editedShortcut, isOpen } = props;

    // hooks
    const [description, setDescription] = useState("");
    const [keyStrokesString, setKeyStrokesString] = useState("");

    if ((!lastEditedShortcut && editedShortcut) || (editedShortcut && lastEditedShortcut !== editedShortcut)) {
        setDescription(editedShortcut.description);
        setKeyStrokesString(editedShortcut.keyStrokes.map(keyStroke => keyStroke.label).join("+"));
        lastEditedShortcut = editedShortcut;
    }

    const canSubmitForm = canSubmit(description, keyStrokesString, shortcuts);

    const title = editedShortcut ? "Edit shortcut" : "Add shortcut";

    const onAddClick = canSubmitForm
        ? () => {
              onAddShortcut(shortcutBuilder(description, keyStrokesString));
              setDescription("");
              setKeyStrokesString("");
              props.onClose();
          }
        : undefined;
    const onEditClick = canSubmitForm
        ? () => {
              onEditShortcut(lastEditedShortcut as Shortcut, shortcutBuilder(description, keyStrokesString));
              lastEditedShortcut = null;
              setDescription("");
              setKeyStrokesString("");
              props.onClose();
          }
        : undefined;
    const submitButton = buildSubmitButton(canSubmitForm, editedShortcut, onAddClick, onEditClick);

    const onClose = () => {
        props.onClose();
    };

    const header = (
        <React.Fragment>
            <p className="modal-card-title">{title}</p>
            <button className="delete" aria-label="close" onClick={onClose} />
        </React.Fragment>
    );

    const footer = (
        <React.Fragment>
            {submitButton}
            <button className="button" onClick={onClose}>
                Cancel
            </button>
        </React.Fragment>
    );

    return (
        <Modal isOpen={isOpen}>
            <div className="modal-card">
                <header className="modal-card-head">{header}</header>

                <div className="modal-card-body shortcut-form">
                    <input
                        autoFocus
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
                    <FormErrors description={description} keyStrokesString={keyStrokesString} shortcuts={shortcuts} />
                </div>

                <footer className="modal-card-foot">{footer}</footer>
            </div>
        </Modal>
    );
};

export default KeyStrokeForm;
