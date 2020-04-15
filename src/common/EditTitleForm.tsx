import React from "react";

// styling
import styled from "styled-components";

const Form = styled.form`
    display: flex;
    align-items: center;
`;

const Input = styled.input`
    max-width: 250px;
    margin-right: 8px;
`;

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

export default EditTitleForm;