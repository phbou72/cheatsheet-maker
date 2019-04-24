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

    return (
        <div className="app">
            <Menu />

            <div className="app-add-sheet" onClick={onAddSheetClick}>
                Add Sheet <MdAddCircleOutline />
            </div>

            <div className="app-sheets">
                {sheets.map(sheet => (
                    <Sheet sheet={sheet} onSheetUpdateEvent={onSheetUpdateEvent} />
                ))}
            </div>
        </div>
    );
};

export default App;
