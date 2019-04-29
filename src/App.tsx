import React, { useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";

import Menu from "Menu";
import { buildEmptySheet } from "sheetBuilder";

import EditTitle from "common/EditTitle";

import Sheet from "sheet/Sheet";

import "./App.scss";

const App = () => {
    const [sheets, setSheets] = useState<Sheet[]>([]);
    const [title, setTitle] = useState("Untitled page");

    const onAddSheetClick = () => {
        setSheets([...sheets, buildEmptySheet()]);
    };

    const onSheetUpdate = (id: String, title: string, shortcuts: Shortcut[]) => {
        const sheetIndex = sheets.findIndex(sheet => sheet.id === id);
        const updatedSheet = { ...sheets[sheetIndex], title, shortcuts };

        const newSheets = sheets.slice(0);
        newSheets[sheetIndex] = updatedSheet;
        setSheets(newSheets);
    };

    const onSheetDelete = (id: string) => {
        const newSheets = sheets.filter(sheet => sheet.id !== id);
        setSheets(newSheets);
    };

    const onSheetsImport = (newTitle: string, sheets: Sheet[]) => {
        setTitle(newTitle);
        setSheets(sheets);
    };

    const onSheetsClear = () => setSheets([]);

    const onEditTitle = (newTitle: string) => {
        setTitle(newTitle);
    };

    return (
        <div className="app">
            <Menu title={title} sheets={sheets} onSheetsImport={onSheetsImport} onSheetsClear={onSheetsClear} />

            <EditTitle onEditTitle={onEditTitle} title={title} />

            <button className="app-add-sheet button is-success" onClick={onAddSheetClick}>
                Add Sheet <MdAddCircleOutline />
            </button>

            <div className="app-sheets">
                {sheets.map(sheet => (
                    <Sheet key={sheet.id} sheet={sheet} onSheetUpdate={onSheetUpdate} onSheetDelete={onSheetDelete} />
                ))}
            </div>
        </div>
    );
};

export default App;
