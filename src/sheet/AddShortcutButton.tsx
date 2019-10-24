import React from "react";
import { MdAddCircleOutline } from "react-icons/md";
import styled from "styled-components";

const StyledAddShortcut = styled.button`
    display: flex;
    align-items: center;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.6);
    @media print {
        display: none;
    }
    .react-icons {
        font-size: 20px;
        margin-left: 8px;
    }
`;

interface Props {
    onAddShortcutClick: () => void;
}

const AddShortcut = (props: Props) => {
    const onAddShortcutClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        props.onAddShortcutClick();
    };

    return (
        <StyledAddShortcut className="add-shortcut-button button is-success" onClick={onAddShortcutClick}>
            Add Shortcut
            <MdAddCircleOutline />
        </StyledAddShortcut>
    );
};

export default AddShortcut;
