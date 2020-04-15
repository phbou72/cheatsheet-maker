import React, { useState } from "react";

// material ui
import { StylesProvider } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { AddCircleOutline } from "@material-ui/icons";

// styling
import styled from "styled-components";

// local
import Menu from "Menu";
import { buildEmptySheet } from "sheetBuilder";

import EditTitle from "common/EditTitle";

import Sheet from "sheet/Sheet";

const DEFAULT_TITLE = "Untitled page";
const DEFAULT_SHEETS: Sheet[] = [];

const StyledApp = styled.div`
    width: 100%;
    min-height: 100%;
    margin: 0;
    position: relative;
    display: flex;
    flex-direction: column;
    background-image: linear-gradient(to right top, #1e646e, #118577, #52a468, #a1bb4f, #fec748);
`;

const StyledEditTitle = styled(EditTitle)`
    position: absolute;
    top: 65px;
    left: 16px;
    height: 48px;
    margin-bottom: 0;

    display: flex;
    flex-direction: row;
    align-items: center;

    a[href="#title"] {
        font-size: 32px;
    }
`;

const AddSheetButton = styled(Button)`
    position: absolute;
    top: 65px;
    right: 16px;
    display: flex;
    align-items: center;
    font-size: 20px;
    color: rgba(255, 255, 255, 0.6);
    .react-icons {
        margin-left: 8px;
        font-size: 32px;
    }
`;

const Sheets = styled.div`
    margin-top: 48px;
    box-sizing: border-box;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;

const App = () => {
    const [sheets, setSheets] = useState<Sheet[]>(DEFAULT_SHEETS);
    const [title, setTitle] = useState(DEFAULT_TITLE);

    const onAddSheetClick = () => {
        setSheets([...sheets, buildEmptySheet()]);
    };

    const onSheetUpdate = (id: String, title: string, shortcuts: Shortcut[]) => {
        const sheetIndex = sheets.findIndex((sheet) => sheet.id === id);
        const updatedSheet = { ...sheets[sheetIndex], title, shortcuts };

        const newSheets = sheets.slice(0);
        newSheets[sheetIndex] = updatedSheet;
        setSheets(newSheets);
    };

    const onSheetDelete = (id: string) => {
        const newSheets = sheets.filter((sheet) => sheet.id !== id);
        setSheets(newSheets);
    };

    const onSheetsImport = (newTitle: string, sheets: Sheet[]) => {
        setTitle(newTitle);
        setSheets(sheets);
    };

    const onSheetsClear = () => {
        setSheets(DEFAULT_SHEETS);
        setTitle(DEFAULT_TITLE);
    };

    const onEditTitle = (newTitle: string) => {
        setTitle(newTitle);
    };

    return (
        <StylesProvider injectFirst>
            <StyledApp>
                <Menu title={title} sheets={sheets} onSheetsImport={onSheetsImport} onSheetsClear={onSheetsClear} />

                <StyledEditTitle onEditTitle={onEditTitle} title={title} />

                <AddSheetButton onClick={onAddSheetClick} color="primary">
                    Add Sheet <AddCircleOutline />
                </AddSheetButton>

                <Sheets>
                    {sheets.map((sheet) => (
                        <Sheet
                            key={sheet.id}
                            sheet={sheet}
                            onSheetUpdate={onSheetUpdate}
                            onSheetDelete={onSheetDelete}
                        />
                    ))}
                </Sheets>
            </StyledApp>
        </StylesProvider>
    );
};

export default App;
