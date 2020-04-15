import React, { useState } from "react";

// icons
import { Edit } from "@material-ui/icons";

// styling
import styled from "styled-components";

import EditTitleForm from "common/EditTitleForm";

const StyledEditTitle = styled.div`
    margin-bottom: 12px;
`;

const EditTitleButton = styled.a`
    display: inline-block;
    font-size: 24px;
    display: inline-flex;
    align-items: center;
    color: white;
    text-decoration: underline;
`;

interface EditTitleProps {
    onEditTitle: (title: string) => void;
    title: string;
    className?: string;
}

const EditTitle = (props: EditTitleProps) => {
    const { onEditTitle, title, className } = props;

    const [editingTitle, setEditingTitle] = useState(false);

    const onEditTitleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setEditingTitle(true);
    };

    const content = editingTitle ? (
        <EditTitleForm title={title} setEditingTitle={setEditingTitle} onEditTitle={onEditTitle} />
    ) : (
        <EditTitleButton href="#title" onClick={onEditTitleClick}>
            {title}
            <Edit />
        </EditTitleButton>
    );

    return <StyledEditTitle className={className}>{content}</StyledEditTitle>;
};

export default EditTitle;
