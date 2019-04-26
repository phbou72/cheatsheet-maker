import React, { useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";

import Menu from "Menu";

import Sheet from "sheet/Sheet";

import { buildEmptySheet } from "sheetBuilder";

import "./App.scss";

const App = () => {
    const [sheets, setSheets] = useState<Sheet[]>([]);

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

    const onSheetsImport = (sheets: Sheet[]) => {
        setSheets(sheets);
    };

    const onSheetsClear = () => setSheets([]);

    return (
        <div className="app">
            <Menu sheets={sheets} onSheetsImport={onSheetsImport} onSheetsClear={onSheetsClear} />

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
