import React from "react";

// styling
import styled from "styled-components";

// material
import { RemoveCircleOutline } from "@material-ui/icons";

const StyledDeleteSheetButton = styled.button`
    position: absolute;
    top: 16px;
    right: 16px;
    display: flex;
    align-items: center;
    font-size: 20px;
    color: rgba(255, 255, 255, 0.6);
`;

const StyledRemoveCircleOutline = styled(RemoveCircleOutline)`
    margin-left: 8px;
`;

interface Props {
    onDeleteSheetClick: () => void;
}

const DeleteSheetButton = (props: Props) => {
    const onDeleteSheetClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        props.onDeleteSheetClick();
    };

    return (
        <StyledDeleteSheetButton className="delete-sheet-button button is-danger" onClick={onDeleteSheetClick}>
            Delete Sheet <StyledRemoveCircleOutline />
        </StyledDeleteSheetButton>
    );
};

export default DeleteSheetButton;
