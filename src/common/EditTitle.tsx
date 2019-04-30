import React, { useState } from "react";
import classnames from "classnames";

import "./EditTitle.scss";

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
        <form onSubmit={onSaveAction} className="edit-title-form">
            <input className="input" type="text" placeholder="Title" value={title} onChange={onChangeTitle} />
            <button type="submit" className="button">
                Save
            </button>
        </form>
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
        <div className={classes}>
            <EditTitleForm title={title} setEditingTitle={setEditingTitle} onEditTitle={onEditTitle} />
            <a className="edit-title-button" href="#title" onClick={onEditTitleClick}>
                {title}
            </a>
        </div>
    );
};

export default EditTitle;
