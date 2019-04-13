import React from "react";

import SheetItem from "./SheetItem";

import "./Sheet.scss";

interface SheetProps {
  shortcuts: Shortcut[];
  setShortcuts: (shortcuts: Shortcut[]) => void;
}

const Sheet = (props: SheetProps) => {
  const { shortcuts, setShortcuts } = props;

  const onDeleteItem = (deleteShortcut: Shortcut) => {
    setShortcuts(shortcuts.filter(shortcut => shortcut.description !== deleteShortcut.description));
  };

  return (
    <div className="sheet sm-panel">
      <ul>
        {props.shortcuts.map(item => (
          <SheetItem shortcut={item} key={item.description} onDelete={onDeleteItem} />
        ))}
      </ul>
    </div>
  );
};

export default Sheet;
