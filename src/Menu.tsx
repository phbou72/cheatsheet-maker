import React from "react";

import download from "./utils/download";

import "./Menu.scss";

interface Props {
    title: string;
    sheets: Sheet[];
    onSheetsImport: (title: string, sheets: Sheet[]) => void;
    onSheetsClear: () => void;
}

const exportSheets = (title: string, sheets: Sheet[]) => {
    const object = JSON.stringify({ title, sheets });
    download(object, "sheets.json", "application/json");
};

const importSheets = (
    eInput: React.ChangeEvent<HTMLInputElement>,
    onSheetsImport: (title: string, sheets: Sheet[]) => void,
) => {
    const target = eInput.target;
    const file = target.files && target.files[0];
    if (!file) {
        return;
    }

    let reader = new FileReader();
    reader.onload = function(eLoad: any) {
        let content = eLoad.target.result;
        const obj = JSON.parse(content);
        const sheets = obj.sheets as Sheet[];
        onSheetsImport(obj.title, sheets);
        target.value = "";
    };
    reader.readAsText(file);
};

const SheetActions = (props: Props) => {
    const { title, sheets, onSheetsImport, onSheetsClear } = props;

    const onImportClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        importSheets(e, onSheetsImport);
    };

    const onExportClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        exportSheets(title, sheets);
    };

    const onClearClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        onSheetsClear();
    };

    const onClickPreventDefault = (e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault();

    return (
        <nav className="navbar menu">
            <div className="navbar-start">
                <div className="navbar-item has-dropdown is-hoverable">
                    <a href="#file" className="navbar-link" onClick={onClickPreventDefault}>
                        File
                    </a>

                    <div className="navbar-dropdown">
                        <input type="file" name="importInput" id="importInput" onChange={onImportClick} />
                        <label htmlFor="importInput">
                            <div className="navbar-item import">Import</div>
                        </label>
                        <a href="#export" className="navbar-item" onClick={onExportClick}>
                            Export
                        </a>
                        <a href="newpage" className="navbar-item" onClick={onClearClick}>
                            New page
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default SheetActions;
