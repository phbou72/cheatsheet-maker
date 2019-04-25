import React from "react";

import { MdRemoveCircleOutline } from "react-icons/md";

import "./DeleteSheet.scss";

interface Props {
    onDeleteSheetEvent: () => void;
}

const DeleteSheet = (props: Props) => {
    const onDeleteSheetEven = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        props.onDeleteSheetEvent();
    };

    return (
        <a href="#delete-sheet" className="sheet-delete" onClick={onDeleteSheetEven}>
            Delete Sheet <MdRemoveCircleOutline />
        </a>
    );
};

export default DeleteSheet;
