import React, { useState } from "react";
import classnames from "classnames";
import { FaRegEdit } from "react-icons/fa";
import styled from "styled-components";

const StyleEditTitle = styled.div`
    margin-bottom: 12px;

    @media print {
        .edit-title-button {
            display: inline;
        }
        .edit-title-form {
            display: none;
        }
    }
`;

const EditTitleButton = styled.a`
    display: inline-block;
    font-size: 24px;
    display: inline-flex;
    align-items: center;
    color: white;
    text-decoration: underline;
    .react-icons {
        margin-left: 16px;
    }

    @media print {
        .edit-title-button {
            display: inline;
        }
    }
`;

const Form = styled.form`
    display: flex;
    align-items: center;
    @media print {
        .edit-title-form {
            display: none;
        }
    }
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

    return (
        <StyleEditTitle className={classes}>
            {editingTitle && (
                <EditTitleForm title={title} setEditingTitle={setEditingTitle} onEditTitle={onEditTitle} />
            )}
            {!editingTitle && (
                <EditTitleButton className="edit-title-button" href="#title" onClick={onEditTitleClick}>
                    {title}
                    <FaRegEdit />
                </EditTitleButton>
            )}
        </StyleEditTitle>
    );
};

export default EditTitle;
