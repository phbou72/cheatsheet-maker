import React from "react";

import SheetItem from "./SheetItem";

import "./Sheet.scss";

interface SheetProps {
  items: Shortcut[];
}

const Sheet = (props: SheetProps) => {
  return (
    <div className="sheet sm-panel">
      <ul>
        {props.items.map(item => (
          <SheetItem shortcut={item} />
        ))}
      </ul>
    </div>
  );
};

export default Sheet;
