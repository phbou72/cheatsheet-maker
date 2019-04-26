import React from "react";

import { MdRemoveCircleOutline } from "react-icons/md";

import "./DeleteSheet.scss";

interface Props {
    onDeleteSheetClick: () => void;
}

const DeleteSheet = (props: Props) => {
    const onDeleteSheetClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        props.onDeleteSheetClick();
    };

    return (
        <a href="#delete-sheet" className="sheet-delete" onClick={onDeleteSheetClick}>
            Delete Sheet <MdRemoveCircleOutline />
        </a>
    );
};

export default DeleteSheet;
