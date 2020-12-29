import styled from "styled-components";

import SheetItem from "sheet/SheetItem";

const StyleSheetItems = styled.ul`
    margin: 0;
    padding: 0;
    margin-bottom: 24px;
`;

interface Props {
    shortcuts: Shortcut[];
    onUpdateShortcuts: (shortcuts: Shortcut[]) => void;
    onEditShortcutClick: (shortcut: Shortcut) => void;
}

let draggedShortcut: Shortcut;
let draggedOverShortcut: Shortcut;

const SheetItems = (props: Props) => {
    const { shortcuts, onUpdateShortcuts } = props;

    // edit/delete button events
    const onDeleteShortcutClick = (deleteShortcut: Shortcut) => {
        const newShortcuts = shortcuts.filter((shortcut) => shortcut.description !== deleteShortcut.description);
        onUpdateShortcuts(newShortcuts);
    };
    const onEditShortcutClick = (shortcut: Shortcut) => {
        props.onEditShortcutClick(shortcut);
    };

    // Drag events
    const sameId = (compareShortcut: Shortcut) => (toShortcut: Shortcut) => toShortcut.id === compareShortcut.id;
    const onDragStart = (shortcut: Shortcut) => {
        draggedShortcut = shortcut;
    };
    const onDragOver = (shortcut: Shortcut) => {
        if (draggedOverShortcut === shortcut) {
            return;
        }
        draggedOverShortcut = shortcut;
    };
    const onDragEnd = () => {
        const draggedIndex = shortcuts.findIndex(sameId(draggedShortcut));
        const draggedOverIndex = shortcuts.findIndex(sameId(draggedOverShortcut));

        const newShortcuts = shortcuts.splice(0);
        newShortcuts.splice(draggedOverIndex, 1, draggedShortcut);
        newShortcuts.splice(draggedIndex, 1, draggedOverShortcut);

        onUpdateShortcuts(newShortcuts);
    };

    return (
        <StyleSheetItems>
            {shortcuts.map((shortcut) => (
                <SheetItem
                    onDragOver={onDragOver}
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                    shortcut={shortcut}
                    key={shortcut.id}
                    onDeleteShortcutClick={onDeleteShortcutClick}
                    onEditShortcutClick={onEditShortcutClick}
                />
            ))}
        </StyleSheetItems>
    );
};

export default SheetItems;
