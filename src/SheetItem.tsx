import React from "react";

interface SheetItemProps {
  shortcut: Shortcut;
}

const SheetItem = (props: SheetItemProps) => {
  const { description, keyStrokes } = props.shortcut;
  return (
    <li className="sheet-item" key={keyStrokes}>
      {description}: {keyStrokes}
    </li>
  );
};

export default SheetItem;
