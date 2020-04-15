import React, { useState } from "react";
import classnames from "classnames";

// icons
import { Edit } from "@material-ui/icons";

// styling
import styled from "styled-components";

const StyleEditTitle = styled.div`
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

const Form = styled.form`
    display: flex;
    align-items: center;
`;

const Input = styled.input`
    max-width: 250px;
    margin-right: 8px;
`;

interface EditTitleProps {
    onEditTitle: (title: string) => void;
    title: string;
}

interface EditTitleFormProps {
    title: string;
    setEditingTitle: (editTitle: boolean) => void;
    onEditTitle: (title: string) => void;
}

const EditTitleForm = (props: EditTitleFormProps) => {
    const { title, setEditingTitle, onEditTitle } = props;

    const onSaveAction = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setEditingTitle(false);
    };

    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        onEditTitle(title);
    };

    return (
        <Form onSubmit={onSaveAction} className="edit-title-form">
            <Input autoFocus className="input" type="text" placeholder="Title" value={title} onChange={onChangeTitle} />
            <button type="submit" className="button is-success">
                Save
            </button>
        </Form>
    );
};

const EditTitle = (props: EditTitleProps) => {
    const { onEditTitle, title } = props;

    const [editingTitle, setEditingTitle] = useState(false);

    const onEditTitleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setEditingTitle(true);
    };

    const classes = classnames("edit-title", {
        editing: editingTitle,
    });

    const content = editingTitle ? (
        <EditTitleForm title={title} setEditingTitle={setEditingTitle} onEditTitle={onEditTitle} />
    ) : (
        <EditTitleButton href="#title" onClick={onEditTitleClick}>
            {title}
            <Edit />
        </EditTitleButton>
    );

    return <StyleEditTitle className={classes}>{content}</StyleEditTitle>;
};

export default EditTitle;
