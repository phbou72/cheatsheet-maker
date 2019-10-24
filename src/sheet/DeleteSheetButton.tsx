import React from "react";
import styled from "styled-components";
import { MdRemoveCircleOutline } from "react-icons/md";

const StyledDeleteSheet = styled.button`
    position: absolute;
    top: 16px;
    right: 16px;
    display: flex;
    align-items: center;
    font-size: 20px;
    color: rgba(255, 255, 255, 0.6);
    @media print {
        display: none;
    }
    .react-icons {
        font-size: 32px;
        margin-left: 8px;
    }
`;

interface Props {
    onDeleteSheetClick: () => void;
}

const DeleteSheet = (props: Props) => {
    const onDeleteSheetClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        props.onDeleteSheetClick();
    };

    return (
        <StyledDeleteSheet className="delete-sheet-button button is-danger" onClick={onDeleteSheetClick}>
            Delete Sheet <MdRemoveCircleOutline />
        </StyledDeleteSheet>
    );
};

export default DeleteSheet;
