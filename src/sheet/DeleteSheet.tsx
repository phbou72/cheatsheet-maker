import React from "react";

import { MdRemoveCircleOutline } from "react-icons/md";

import "./DeleteSheet.scss";

interface Props {
    onDeleteSheetClick: () => void;
}

const DeleteSheet = (props: Props) => {
    const onDeleteSheetClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        props.onDeleteSheetClick();
    };

    return (
        <button className="button is-danger sheet-delete" onClick={onDeleteSheetClick}>
            Delete Sheet <MdRemoveCircleOutline />
        </button>
    );
};

export default DeleteSheet;
