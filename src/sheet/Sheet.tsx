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
        setShortcuts(
            shortcuts.filter(shortcut => shortcut.description !== deleteShortcut.description),
        );
    };

    return (
        <div className="sheet">
            <div className="sheet-header">
                <a href="#" className="button">
                    Import
                </a>
                <a href="#" className="button">
                    Export
                </a>
            </div>
            <div className="sheet-content">
                <ul>
                    {props.shortcuts.map(item => (
                        <SheetItem shortcut={item} key={item.description} onDelete={onDeleteItem} />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sheet;
