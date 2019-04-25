import React, { useState } from "react";

interface EditTitleProps {
    onEditTitleEvent: (title: string) => void;
    sheet: Sheet;
}

interface EditTitleFormProps extends EditTitleProps {
    title: string;
    setTitle: (sheetTitle: string) => void;
    setEditTitle: (editTitle: boolean) => void;
}

const EditTitleForm = (props: EditTitleFormProps) => {
    const { title, setTitle, setEditTitle, onEditTitleEvent } = props;

    const onSaveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setEditTitle(false);
    };

    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setTitle(title);
        onEditTitleEvent(title);
    };

    return (
        <div className="sheet-edit-title">
            <input className="input" type="text" placeholder="Sheet title" value={title} onChange={onChangeTitle} />
            <button className="button" onClick={onSaveClick}>
                Save
            </button>
        </div>
    );
};

const EditTitle = (props: EditTitleProps) => {
    const [editTitle, setEditTitle] = useState(false);
    const [title, setTitle] = useState(props.sheet.title);

    const onEditTitleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setEditTitle(true);
    };

    const editTitleButton = (
        <a href="#sheettitle" onClick={onEditTitleClick}>
            {title}
        </a>
    );

    return editTitle ? <EditTitleForm {...{ title, setTitle, setEditTitle, ...props }} /> : editTitleButton;
};

export default EditTitle;
