import React from "react";

interface SheetItemProps {
  shortcut: Shortcut;
}

const createKeyStrokesString = (keyStrokes: KeyStroke[]) => {
  const symbols =
    (keyStrokes && keyStrokes.map(keyStroke => keyStroke.symbol)) || [];
  return symbols.join(" + ");
};

const SheetItem = (props: SheetItemProps) => {
  const { description, keyStrokes } = props.shortcut;

  const keyStrokesString = createKeyStrokesString(keyStrokes);

  return (
    <li className="sheet-item" key={keyStrokesString}>
      {description}: {keyStrokesString}
    </li>
  );
};

export default SheetItem;
