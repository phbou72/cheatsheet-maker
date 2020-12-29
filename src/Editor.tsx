import { useRecoilState } from "recoil";

// i18n
import { useTranslation } from "react-i18next";

// material ui
import { Button } from "@material-ui/core";
import { AddCircleOutline } from "@material-ui/icons";

// styling
import styled from "styled-components";

// local
import Menu from "Menu";
import { buildEmptySheet } from "sheetBuilder";

// atoms
import sheetTitleState from "sheet/sheetTitle.state";
import sheetsState from "sheet/sheets.state";

import EditTitle from "common/EditTitle";

import Sheet from "sheet/Sheet";

const StyledApp = styled.div`
    width: 100%;
    min-height: 100%;
    margin: 0;
    position: relative;
    display: flex;
    flex-direction: column;
`;

const StyledEditTitle = styled(EditTitle)`
    position: absolute;
    top: 75px;
    left: 10px;
    margin-bottom: 0;

    display: flex;
    flex-direction: row;
    align-items: center;

    a[href="#title"] {
        font-size: 32px;
        line-height: 1;
    }
`;

const AddSheetButton = styled(Button)`
    position: absolute;
    top: 75px;
    right: 10px;
    display: flex;
    align-items: center;
    svg {
        margin-left: 8px;
    }
`;

const Sheets = styled.div`
    margin-top: 48px;
    box-sizing: border-box;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;

const Editor = () => {
    const [sheets, setSheets] = useRecoilState(sheetsState);
    const [title, setTitle] = useRecoilState(sheetTitleState);
    const { t } = useTranslation();

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
        setSheets([]);
        setTitle("");
    };

    const onEditTitle = (newTitle: string) => {
        setTitle(newTitle);
    };

    return (
        <StyledApp>
            <Menu title={title} sheets={sheets} onSheetsImport={onSheetsImport} onSheetsClear={onSheetsClear} />

            <StyledEditTitle onEditTitle={onEditTitle} title={title} />

            <AddSheetButton onClick={onAddSheetClick} variant="contained" color="primary">
                {t("app.addSheet")} <AddCircleOutline />
            </AddSheetButton>

            <Sheets>
                {sheets.map((sheet) => (
                    <Sheet key={sheet.id} sheet={sheet} onSheetUpdate={onSheetUpdate} onSheetDelete={onSheetDelete} />
                ))}
            </Sheets>
        </StyledApp>
    );
};

export default Editor;
