import React from "react";

import download from "./utils/download";

import "./Menu.scss";

interface Props {
    sheets: Sheet[];
    onSheetsImport: (sheets: Sheet[]) => void;
    onSheetsClear: () => void;
}

const exportShortcuts = (sheets: Sheet[]) => {
    const object = JSON.stringify({ sheets });
    download(object, "sheets.json", "application/json");
};

const importSheets = (eInput: React.ChangeEvent<HTMLInputElement>, onSheetsImportEvent: (sheets: Sheet[]) => void) => {
    const target = eInput.target;
    const file = target.files && target.files[0];
    if (!file) {
        return;
    }

    let reader = new FileReader();
    reader.onload = function(eLoad: any) {
        let content = eLoad.target.result;
        const sheets = JSON.parse(content).sheets as Sheet[];
        onSheetsImportEvent(sheets);
        target.value = "";
    };
    reader.readAsText(file);
};

const SheetActions = (props: Props) => {
    const { sheets, onSheetsImport: onSheetsImportEvent, onSheetsClear: onSheetsClearEvent } = props;

    const onImportClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        importSheets(e, onSheetsImportEvent);
    };

    const onExportClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        exportShortcuts(sheets);
    };

    const onClearClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        onSheetsClearEvent();
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
