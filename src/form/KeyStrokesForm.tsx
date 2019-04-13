import React, { useState } from "react";

import shortcutBuilder from "../shortcutBuilder";

import "./KeyStrokesForm.scss";

interface Props {
  onAddEvent: (shortcut: Shortcut) => void;
}

const validKeyStrokeRegex = /[\w\W]+(\+?[\w\W]*\+?)+/;

const canSubmit = (description: string, keyStrokesString: string) => {
  const isFilled = description.length > 0 && keyStrokesString.length > 0;
  const isValidKeyStroke = validKeyStrokeRegex.test(keyStrokesString);
  return isFilled && isValidKeyStroke;
};

const KeyStrokesForm = (props: Props) => {
  const { onAddEvent } = props;

  const [description, setDescription] = useState("");
  const [keyStrokesString, setKeyStrokesString] = useState("");

  const canSubmitForm = canSubmit(description, keyStrokesString);

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
    </div>
  );
};

export default KeyStrokesForm;
