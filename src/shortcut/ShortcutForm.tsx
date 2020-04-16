import React, { useState } from "react";

// i18n
import { useTranslation } from "react-i18next";

// material ui
import { Button, TextField, Dialog, DialogTitle } from "@material-ui/core";
import { Close } from "@material-ui/icons";

// styling
import styled from "styled-components";

import shortcutBuilder from "shortcutBuilder";

// shortcut
import FormErrors from "shortcut/FormErrors";
import { isFilled, isValidKeyStroke } from "shortcut/validators";

const StyledDialogTitle = styled(DialogTitle)`
    h2 {
        display: flex;
        justify-content: space-between;
        align-content: center;
    }
`;

const StyledShortcutForm = styled.div`
    width: 100%;
    display: inline-flex;
    flex-grow: 0;
    flex-shrink: 0;
    flex-direction: column;
    box-sizing: border-box;
    padding: 0 24px;
`;

const StyledForm = styled.form`
    min-width: 420px;
`;

const StyledTextField = styled(TextField)`
    margin-bottom: 10px;
`;

const ActionButton = styled(Button)`
    margin-left: 8px;
`;

const Footer = styled.div`
    padding: 16px 24px;
`;

interface Props {
    onAddShortcut: (shortcut: Shortcut) => void;
    onEditShortcut: (shortcut: Shortcut, newShortcut: Shortcut) => void;
    shortcuts: Shortcut[];
    editedShortcut: Shortcut | null;
    isOpen: boolean;
    onClose: () => void;
}

const canSubmit = (description: string, keyStrokesString: string, shortcuts: Shortcut[]) =>
    isFilled(description, keyStrokesString, shortcuts) && isValidKeyStroke(description, keyStrokesString, shortcuts);

let lastEditedShortcut: Shortcut | null = null;

const ShortcutForm = (props: Props) => {
    const { onAddShortcut, onEditShortcut, shortcuts, editedShortcut, isOpen } = props;

    // hooks
    const [description, setDescription] = useState("");
    const [keyStrokesString, setKeyStrokesString] = useState("");
    const { t } = useTranslation();

    if ((!lastEditedShortcut && editedShortcut) || (editedShortcut && lastEditedShortcut !== editedShortcut)) {
        setDescription(editedShortcut.description);
        setKeyStrokesString(editedShortcut.keyStrokes.map((keyStroke) => keyStroke.label).join("+"));
        lastEditedShortcut = editedShortcut;
    }

    const canSubmitForm = canSubmit(description, keyStrokesString, shortcuts);

    const title = editedShortcut ? t("shortcut.shortcutForm.editShortcut") : t("shortcut.shortcutForm.addShortcut");

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

    const actionText = !editedShortcut ? t("shortcut.shortcutForm.add") : t("shortcut.shortcutForm.edit");
    const submitAction = !editedShortcut ? onAddAction : onEditAction;

    return (
        <Dialog open={isOpen}>
            <StyledDialogTitle>
                {title}
                <Close onClick={onClose} />
            </StyledDialogTitle>

            <StyledForm onSubmit={submitAction}>
                <StyledShortcutForm>
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

                    <FormErrors description={description} keyStrokesString={keyStrokesString} shortcuts={shortcuts} />
                </StyledShortcutForm>

                <Footer>
                    <Button variant="contained" onClick={onClose}>
                        {t("shortcut.shortcutForm.cancel")}
                    </Button>
                    <ActionButton type="submit" variant="contained" color="primary" disabled={!canSubmitForm}>
                        {actionText}
                    </ActionButton>
                </Footer>
            </StyledForm>
        </Dialog>
    );
};

export default ShortcutForm;
