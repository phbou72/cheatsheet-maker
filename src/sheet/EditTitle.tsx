import React, { useState } from "react";
import classnames from "classnames";

import "./EditTitle.scss";

interface EditTitleProps {
    onEditTitle: (title: string) => void;
    sheet: Sheet;
}

interface EditTitleFormProps {
    title: string;
    setTitle: (sheetTitle: string) => void;
    setEditingTitle: (editTitle: boolean) => void;
    onEditTitle: (title: string) => void;
}

const EditTitleForm = (props: EditTitleFormProps) => {
    const { title, setTitle, setEditingTitle, onEditTitle } = props;

    const onSaveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setEditingTitle(false);
    };

    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setTitle(title);
        onEditTitle(title);
    };

    return (
        <div className="sheet-edit-title-form">
            <input className="input" type="text" placeholder="Sheet title" value={title} onChange={onChangeTitle} />
            <button className="button" onClick={onSaveClick}>
                Save
            </button>
        </div>
    );
};

const EditTitle = (props: EditTitleProps) => {
    const { onEditTitle } = props;

    const [editingTitle, setEditingTitle] = useState(false);
    const [title, setTitle] = useState(props.sheet.title);

    const onEditTitleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setEditingTitle(true);
    };

    const classes = classnames("sheet-edit-title", {
        editing: editingTitle,
    });

    return (
        <div className={classes}>
            <EditTitleForm
                title={title}
                setTitle={setTitle}
                setEditingTitle={setEditingTitle}
                onEditTitle={onEditTitle}
            />
            <a className="sheet-edit-title-button" href="#sheettitle" onClick={onEditTitleClick}>
                {title}
            </a>
        </div>
    );
};

export default EditTitle;
