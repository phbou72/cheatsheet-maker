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

    const onSheetUpdateEvent = (id: String, title: string, shortcuts: Shortcut[]) => {
        const sheetIndex = sheets.findIndex(sheet => sheet.id === id);
        const updatedSheet = { ...sheets[sheetIndex], title, shortcuts };

        const newSheets = sheets.slice(0);
        newSheets[sheetIndex] = updatedSheet;
        setSheets(newSheets);
    };

    const onSheetsImportEvent = (sheets: Sheet[]) => {
        setSheets(sheets);
        console.log(sheets);
    };

    const onSheetsClearEvent = () => setSheets([]);

    return (
        <div className="app">
            <Menu sheets={sheets} onSheetsImportEvent={onSheetsImportEvent} onSheetsClearEvent={onSheetsClearEvent} />

            <div className="app-add-sheet" onClick={onAddSheetClick}>
                Add Sheet <MdAddCircleOutline />
            </div>

            <div className="app-sheets">
                {sheets.map(sheet => (
                    <Sheet key={sheet.id} sheet={sheet} onSheetUpdateEvent={onSheetUpdateEvent} />
                ))}
            </div>
        </div>
    );
};

export default App;
