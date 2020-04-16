import React from "react";

// material ui
import { Button } from "@material-ui/core";

// styling
import styled from "styled-components";

// material
import { RemoveCircleOutline } from "@material-ui/icons";

const StyledDeleteSheetButton = styled(Button)`
    position: absolute;
    top: 16px;
    right: 16px;
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
        <StyledDeleteSheetButton onClick={onDeleteSheetClick} color="secondary" variant="contained">
            Delete Sheet <StyledRemoveCircleOutline />
        </StyledDeleteSheetButton>
    );
};

export default DeleteSheetButton;
