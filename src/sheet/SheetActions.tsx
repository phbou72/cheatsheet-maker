import React from "react";

import download from "../utils/download";

import "./SheetActions.scss";

interface Props {
    shortcuts: Shortcut[];
    setShortcuts: (shortcuts: Shortcut[]) => void;
}

const exportShortcuts = (shortcuts: Shortcut[]) => {
    const object = JSON.stringify({ shortcuts });
    download(object, "shortcuts.json", "application/json");
};

const clearShortcuts = (setShortcuts: (shortcuts: Shortcut[]) => void) => {
    setShortcuts([]);
};

const importShortcuts = (
    eInput: React.ChangeEvent<HTMLInputElement>,
    setShortcuts: (shortcuts: Shortcut[]) => void,
) => {
    const target = eInput.target;
    const file = target.files && target.files[0];
    if (!file) {
        return;
    }

    let reader = new FileReader();
    reader.onload = function(eLoad: any) {
        let content = eLoad.target.result;
        const shortcuts = JSON.parse(content).shortcuts as Shortcut[];
        setShortcuts(shortcuts);
        target.value = "";
    };
    reader.readAsText(file);
};

const SheetActions = (props: Props) => {
    const { shortcuts, setShortcuts } = props;

    return (
        <div className="sheet-actions">
            <input type="file" name="importInput" id="importInput" onChange={e => importShortcuts(e, setShortcuts)} />
            <label htmlFor="importInput">
                <span className="button">Import</span>
            </label>

            <a
                href="#"
                className="button"
                onClick={e => {
                    e.preventDefault();
                    exportShortcuts(shortcuts);
                }}
            >
                Export
            </a>

            <a
                href="#"
                className="button"
                onClick={e => {
                    e.preventDefault();
                    clearShortcuts(setShortcuts);
                }}
            >
                Clear
            </a>
        </div>
    );
};

export default SheetActions;
