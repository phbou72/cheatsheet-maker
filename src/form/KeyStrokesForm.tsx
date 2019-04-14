import React, { useState } from "react";

import shortcutBuilder from "../shortcutBuilder";

import "./KeyStrokesForm.scss";

interface Props {
    onAddEvent: (shortcut: Shortcut) => void;
    shortcuts: Shortcut[];
}

const validKeyStrokeRegex = /[\w\W]+(\+?[\w\W]*\+?)+/;

const checkIsFilled = (description: string, keyStrokesString: string) =>
    description.length > 0 && keyStrokesString.length > 0;

const checkIsValidKeyStroke = (keyStrokesString: string) =>
    validKeyStrokeRegex.test(keyStrokesString);

const checkFoundDescription = (description: string, shortcuts: Shortcut[]) =>
    shortcuts.find(shortcut => shortcut.description === description);

const canSubmit = (description: string, keyStrokesString: string, shortcuts: Shortcut[]) => {
    const isFilled = checkIsFilled(description, keyStrokesString);
    const isValidKeyStroke = checkIsValidKeyStroke(keyStrokesString);
    const foundDescription = checkFoundDescription(description, shortcuts);

    return isFilled && isValidKeyStroke && !foundDescription;
};

const showErrors = (description: string, keyStrokesString: string, shortcuts: Shortcut[]) => {
    const isFilled = checkIsFilled(description, keyStrokesString);

    if (!isFilled) {
        return <div className="key-strokes-form-error">Both fields must be filled</div>;
    }

    const isValidKeyStroke = checkIsValidKeyStroke(keyStrokesString);
    if (!isValidKeyStroke) {
        return <div className="key-strokes-form-error">Invalid key stroke</div>;
    }

    const foundDescription = checkFoundDescription(description, shortcuts);
    if (foundDescription) {
        return (
            <div className="key-strokes-form-error">
                Found another shortcut with the same description
            </div>
        );
    }
};

const KeyStrokesForm = (props: Props) => {
    const { onAddEvent, shortcuts } = props;

    const [description, setDescription] = useState("");
    const [keyStrokesString, setKeyStrokesString] = useState("");

    const canSubmitForm = canSubmit(description, keyStrokesString, shortcuts);

    const errors = showErrors(description, keyStrokesString, shortcuts);

    const onAddClick = canSubmitForm
        ? () => {
              onAddEvent(shortcutBuilder(description, keyStrokesString));
              setDescription("");
              setKeyStrokesString("");
          }
        : undefined;

    return (
        <div className="key-strokes-form sm-panel">
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

            <a className="button is-white" {...{ disabled: !canSubmitForm }} onClick={onAddClick}>
                Add
            </a>

            {errors}
        </div>
    );
};

export default KeyStrokesForm;
