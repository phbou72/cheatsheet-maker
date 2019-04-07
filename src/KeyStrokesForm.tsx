import React, { useState } from "react";

import "./KeyStrokesForm.scss";

interface Props {
  onAddEvent: (description: string, keyStrokes: string) => void;
}

const onAdd = (
  onAddEvent: (description: string, keyStrokes: string) => void,
  setDescription: (value: string) => void,
  setKeyStrokes: (value: string) => void,
  description: string,
  keyStrokes: string
) => {
  onAddEvent(description, keyStrokes);
  setDescription("");
  setKeyStrokes("");
};

const KeyStrokesForm = (props: Props) => {
  const { onAddEvent } = props;

  const [description, setDescription] = useState("");
  const [keyStrokes, setKeyStrokes] = useState("");

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
        onClick={() => {
          onAdd(
            onAddEvent,
            setDescription,
            setKeyStrokes,
            description,
            keyStrokes
          );
        }}
      >
        Add
      </a>
    </div>
  );
};

export default KeyStrokesForm;
