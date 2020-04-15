import React, { useState } from "react";

// material ui
import { Button, TextField } from "@material-ui/core";

// styling
import styled from "styled-components";

import shortcutBuilder from "shortcutBuilder";

// common
import Modal from "common/Modal";

// shortcut
import FormErrors from "shortcut/FormErrors";
import { isFilled, isValidKeyStroke } from "shortcut/validators";

const StyledShortcutForm = styled.div`
    min-width: 420px;
    width: 100%;
    display: inline-flex;
    flex-grow: 0;
    flex-shrink: 0;
    flex-direction: column;
    box-sizing: border-box;
    padding-left: 20px;
    padding: 24px 8px 24px 16px;
    background-color: #fff;
`;

const StyledTextField = styled(TextField)`
    margin-bottom: 10px;
`;

const ActionButton = styled(Button)`
    margin-left: 8px;
`;

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

const ShortcutForm = (props: Props) => {
    const { onAddShortcut, onEditShortcut, shortcuts, editedShortcut, isOpen } = props;

    // hooks
    const [description, setDescription] = useState("");
    const [keyStrokesString, setKeyStrokesString] = useState("");

    if ((!lastEditedShortcut && editedShortcut) || (editedShortcut && lastEditedShortcut !== editedShortcut)) {
        setDescription(editedShortcut.description);
        setKeyStrokesString(editedShortcut.keyStrokes.map((keyStroke) => keyStroke.label).join("+"));
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
            <Button className="delete" onClick={onClose} />
        </React.Fragment>
    );

    const text = !editedShortcut ? "Add" : "Edit";
    const submitAction = !editedShortcut ? onAddAction : onEditAction;

    const footer = (
        <React.Fragment>
            <Button variant="contained" onClick={onClose}>
                Cancel
            </Button>

            <ActionButton type="submit" variant="contained" color="primary" disabled={!canSubmitForm}>
                {text}
            </ActionButton>
        </React.Fragment>
    );

    return (
        <Modal isOpen={isOpen}>
            {isOpen && (
                <div className="modal-card">
                    <form onSubmit={submitAction}>
                        <header className="modal-card-head">{header}</header>

                        <StyledShortcutForm className="modal-card-body shortcut-form">
                            <StyledTextField
                                autoFocus
                                name="description"
                                placeholder="Description"
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.currentTarget.value)}
                            />

                            <StyledTextField
                                name="keyStrokes"
                                placeholder="Key strokes"
                                type="text"
                                onChange={(e) => setKeyStrokesString(e.currentTarget.value)}
                                value={keyStrokesString}
                            />

                            <FormErrors
                                description={description}
                                keyStrokesString={keyStrokesString}
                                shortcuts={shortcuts}
                            />
                        </StyledShortcutForm>

                        <footer className="modal-card-foot">{footer}</footer>
                    </form>
                </div>
            )}
        </Modal>
    );
};

export default ShortcutForm;
