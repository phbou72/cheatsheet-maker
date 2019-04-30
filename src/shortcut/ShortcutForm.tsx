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

    const onAddAction = canSubmitForm
        ? (e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              onAddShortcut(shortcutBuilder(description, keyStrokesString));
              setDescription("");
              setKeyStrokesString("");
              props.onClose();
          }
        : undefined;

    const onEditAction = canSubmitForm
        ? (e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              onEditShortcut(lastEditedShortcut as Shortcut, shortcutBuilder(description, keyStrokesString));
              lastEditedShortcut = null;
              setDescription("");
              setKeyStrokesString("");
              props.onClose();
          }
        : undefined;

    const onClose = () => {
        props.onClose();
    };

    const header = (
        <React.Fragment>
            <p className="modal-card-title">{title}</p>
            <button className="delete" onClick={onClose} />
        </React.Fragment>
    );

    const text = !editedShortcut ? "Add" : "Edit";
    const submitAction = !editedShortcut ? onAddAction : onEditAction;

    const footer = (
        <React.Fragment>
            <button type="submit" className="button is-primary" disabled={!canSubmitForm}>
                {text}
            </button>

            <button className="button" onClick={onClose}>
                Cancel
            </button>
        </React.Fragment>
    );

    return (
        <Modal isOpen={isOpen}>
            <div className="modal-card">
                <form onSubmit={submitAction}>
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
                        <FormErrors
                            description={description}
                            keyStrokesString={keyStrokesString}
                            shortcuts={shortcuts}
                        />
                    </div>

                    <footer className="modal-card-foot">{footer}</footer>
                </form>
            </div>
        </Modal>
    );
};

export default KeyStrokeForm;
