import React from "react";

import "./Sheet.scss";

interface ItemProps {
  item: Shortcut;
}

interface ItemsProps {
  items: Shortcut[];
}

interface SheetProps {
  items: Shortcut[];
}

const Item = (props: ItemProps) => {
  const { description, keyStrokes } = props.item;

  return (
    <li key={keyStrokes}>
      {description}: {keyStrokes}
    </li>
  );
};

const Items = (props: ItemsProps) => (
  <div className="sheet-items">
    {props.items.map(item => (
      <Item item={item} />
    ))}
  </div>
);

const Sheet = (props: SheetProps) => {
  return (
    <div className="sheet sm-panel">
      <Items items={props.items} />
    </div>
  );
};

export default Sheet;
