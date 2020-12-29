import { useTranslation } from "react-i18next";

// material ui
import { Button } from "@material-ui/core";

// styling
import styled from "styled-components";

const StyledSheetItem = styled.li`
    display: flex;
    align-items: center;
    margin: 0 0 8px 0;
    font-size: 18px;
    line-height: 32px;
`;

const DeleteButton = styled(Button)`
    margin-left: 16px;
`;

const EditButton = styled(Button)`
    margin-left: 8px;
`;

interface SheetItemProps {
    shortcut: Shortcut;
    onDeleteShortcutClick: (shortcut: Shortcut) => void;
    onEditShortcutClick: (shortcut: Shortcut) => void;
    onDragStart: (shortcut: Shortcut) => void;
    onDragOver: (shortcut: Shortcut) => void;
    onDragEnd: () => void;
}

const createKeyStrokesString = (keyStrokes: KeyStroke[]) => {
    const symbols = (keyStrokes && keyStrokes.map((keyStroke) => keyStroke.symbol)) || [];
    return symbols.join(" + ");
};

const SheetItem = (props: SheetItemProps) => {
    const { onDeleteShortcutClick, onEditShortcutClick, shortcut, onDragStart, onDragOver, onDragEnd } = props;
    const { description, keyStrokes } = shortcut;

    const { t } = useTranslation();

    const keyStrokesString = createKeyStrokesString(keyStrokes);

    return (
        <StyledSheetItem
            draggable
            onDragStart={(_e) => onDragStart(shortcut)}
            onDragOver={(_e) => onDragOver(shortcut)}
            onDragEnd={(_e) => onDragEnd()}
        >
            {description}: {keyStrokesString}
            <DeleteButton color="secondary" onClick={() => onDeleteShortcutClick(shortcut)}>
                {t("sheet.sheetItem.delete")}
            </DeleteButton>
            <EditButton color="primary" onClick={() => onEditShortcutClick(shortcut)}>
                {t("sheet.sheetItem.edit")}
            </EditButton>
        </StyledSheetItem>
    );
};

export default SheetItem;
