import React from "react";

// material ui
import { Button } from "@material-ui/core";
import { AddCircleOutline } from "@material-ui/icons";

// styling
import styled from "styled-components";

const StyledAddShortcut = styled(Button)``;

const StyledAddCircleOutline = styled(AddCircleOutline)`
    margin-left: 8px;
`;

interface Props {
    onAddShortcutClick: () => void;
}

const AddShortcutButton = (props: Props) => {
    const onAddShortcutClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        props.onAddShortcutClick();
    };

    return (
        <StyledAddShortcut onClick={onAddShortcutClick} variant="contained" color="primary">
            Add Shortcut
            <StyledAddCircleOutline />
        </StyledAddShortcut>
    );
};

export default AddShortcutButton;
