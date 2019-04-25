import React from "react";
import { MdAddCircleOutline } from "react-icons/md";

interface Props {
    onAddShortcutClick: () => void;
}

const AddShortcut = (props: Props) => {
    const onAddShortcutClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        props.onAddShortcutClick();
    };

    return (
        <div className="sheet-add-shortcut" onClick={onAddShortcutClick}>
            Add Shortcut
            <MdAddCircleOutline />
        </div>
    );
};

export default AddShortcut;
