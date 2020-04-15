import React from "react";

// material ui
import { AddCircleOutline } from "@material-ui/icons";

// styling
import styled from "styled-components";

const StyledAddShortcut = styled.button`
    display: flex;
    align-items: center;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.6);
`;

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
        <StyledAddShortcut className="add-shortcut-button button is-success" onClick={onAddShortcutClick}>
            Add Shortcut
            <StyledAddCircleOutline />
        </StyledAddShortcut>
    );
};

export default AddShortcutButton;
