import React from "react";
import { MdAddCircleOutline } from "react-icons/md";

import "./AddShortcut.scss";

interface Props {
    onAddShortcutClick: () => void;
}

const AddShortcut = (props: Props) => {
    const onAddShortcutClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        props.onAddShortcutClick();
    };

    return (
        <button className="sheet-add-shortcut button is-success" onClick={onAddShortcutClick}>
            Add Shortcut
            <MdAddCircleOutline />
        </button>
    );
};

export default AddShortcut;
