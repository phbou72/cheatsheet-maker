import React from "react";

// i18n
import { useTranslation } from "react-i18next";

// material ui
import { Button, TextField } from "@material-ui/core";

// styling
import styled from "styled-components";

const Form = styled.form`
    display: flex;
    align-items: center;
`;

const StyledTextfield = styled(TextField)`
    margin-right: 8px;
`;

interface EditTitleFormProps {
    title: string;
    setEditingTitle: (editTitle: boolean) => void;
    onEditTitle: (title: string) => void;
}

const EditTitleForm = (props: EditTitleFormProps) => {
    const { title, setEditingTitle, onEditTitle } = props;

    const { t } = useTranslation();

    const onSaveAction = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setEditingTitle(false);
    };

    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        onEditTitle(title);
    };

    return (
        <Form onSubmit={onSaveAction}>
            <StyledTextfield autoFocus type="text" placeholder="Title" value={title} onChange={onChangeTitle} />

            <Button type="submit" variant="contained" color="primary">
                {t("common.editTitleForm.save")}
            </Button>
        </Form>
    );
};

export default EditTitleForm;
