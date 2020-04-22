import React, { useState } from "react";

// i18n
import { useTranslation } from "react-i18next";

// Firebase
import * as firebase from "firebase/app";
import "firebase/auth";

// material ui
import { AppBar, Toolbar, Menu, MenuItem, IconButton, Button } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import styled from "styled-components";

import download from "./utils/download";

const StyledMenu = styled.div`
    display: flex;
    position: relative;
`;

const StyledImport = styled.input`
    display: none;
`;

const SignOutButton = styled(Button)`
    position: absolute;
    top: 15px;
    right: 0px;
    color: white;
`;

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

    const reader = new FileReader();
    reader.onload = function (eLoad: any) {
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

    const { t } = useTranslation();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const openMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const closeMenu = () => {
        setAnchorEl(null);
    };

    const onImportClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        importSheets(e, onSheetsImport);
        closeMenu();
    };

    const onExportClick = (e: React.MouseEvent<HTMLLIElement>) => {
        e.preventDefault();
        exportSheets(title, sheets);
        closeMenu();
    };

    const onClearClick = (e: React.MouseEvent<HTMLLIElement>) => {
        e.preventDefault();
        onSheetsClear();
        closeMenu();
    };

    return (
        <StyledMenu>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" onClick={openMenuClick} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={closeMenu}>
                        <MenuItem>
                            <StyledImport type="file" name="importInput" id="importInput" onChange={onImportClick} />
                            <label htmlFor="importInput">{t("menu.import")}</label>
                        </MenuItem>
                        <MenuItem onClick={onExportClick}>{t("menu.export")}</MenuItem>
                        <MenuItem onClick={onClearClick}>{t("menu.newPage")}</MenuItem>
                    </Menu>
                    <SignOutButton onClick={() => firebase.auth()?.signOut()}>{t("menu.signOut")}</SignOutButton>
                </Toolbar>
            </AppBar>
        </StyledMenu>
    );
};

export default SheetActions;
