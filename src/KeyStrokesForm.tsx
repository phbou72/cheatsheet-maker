import React, { useState } from "react";

import shortcutBuilder from "./shortcutBuilder";

import "./KeyStrokesForm.scss";

interface Props {
  onAddEvent: (shortcut: Shortcut) => void;
}

const onAddClick = (
  onAddEvent: (shortcut: Shortcut) => void,
  setDescription: (value: string) => void,
  setKeyStrokes: (value: string) => void,
  shortcut: Shortcut
) => {
  onAddEvent(shortcut);
  setDescription("");
  setKeyStrokes("");
};

const validKeyStrokeRegex = /[\w\W]+(\+?[\w\W]*\+?)+/;

const canSubmit = (description: string, keyStrokes: string) => {
  const isFilled = description.length > 0 && keyStrokes.length > 0;
  const isValidKeyStroke = validKeyStrokeRegex.test(keyStrokes);
  return isFilled && isValidKeyStroke;
};

const KeyStrokesForm = (props: Props) => {
  const { onAddEvent } = props;

  const [description, setDescription] = useState("");
  const [keyStrokes, setKeyStrokes] = useState("");

  const canSubmitForm = canSubmit(description, keyStrokes);

  const onClick = canSubmitForm
    ? () =>
        onAddClick(
          onAddEvent,
          setDescription,
          setKeyStrokes,
          shortcutBuilder(description, keyStrokes)
        )
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
        onChange={e => setKeyStrokes(e.currentTarget.value)}
        value={keyStrokes}
      />

      <a
        className="button is-white"
        {...{ disabled: !canSubmitForm }}
        onClick={onClick}
      >
        Add
      </a>
    </div>
  );
};

export default KeyStrokesForm;
