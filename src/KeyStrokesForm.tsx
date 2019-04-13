import React, { useState } from "react";
import classnames from "classnames";

import "./KeyStrokesForm.scss";

interface Props {
  onAddEvent: (shortcut: Shortcut) => void;
}

const createKeyStroke = (value: string): KeyStroke => {
  return {
    label: value,
    symbol: KEYS[value] || value
  };
};

const cleanupKeyStrokes = (keyStroke: string) => {
  const groups = keyStroke.split("+");

  return (groups && groups.map(createKeyStroke)) || [];
};

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

const KEYS: { [key: string]: string } = {
  alt: "⎇",
  backspace: "⌫",
  cmd: "⌘",
  ctrl: "⌃",
  down: "↓",
  left: "←",
  right: "→",
  shift: "⇧",
  up: "↑"
};

const KeyStrokesForm = (props: Props) => {
  const { onAddEvent } = props;

  const [description, setDescription] = useState("");
  const [keyStrokes, setKeyStrokes] = useState("");

  const isFilled = description.length > 0 && keyStrokes.length > 0;
  const isValidKeyStroke = validKeyStrokeRegex.test(keyStrokes);
  const canSubmit = isFilled && isValidKeyStroke;

  const onClick = canSubmit
    ? () =>
        onAddClick(onAddEvent, setDescription, setKeyStrokes, {
          description,
          keyStrokes: cleanupKeyStrokes(keyStrokes)
        })
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
      <a className="button is-white" onClick={onClick}>
        Add
      </a>
    </div>
  );
};

export default KeyStrokesForm;
