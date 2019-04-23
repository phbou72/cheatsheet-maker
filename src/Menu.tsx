import React from "react";

// import download from "./utils/download";

import "./Menu.scss";

interface Props {
    // shortcuts: Shortcut[];
    // setShortcuts: (shortcuts: Shortcut[]) => void;
}

// const exportShortcuts = (shortcuts: Shortcut[]) => {
//     const object = JSON.stringify({ shortcuts });
//     download(object, "shortcuts.json", "application/json");
// };

// const clearShortcuts = (setShortcuts: (shortcuts: Shortcut[]) => void) => {
//     setShortcuts([]);
// };

// const importShortcuts = (
//     eInput: React.ChangeEvent<HTMLInputElement>,
//     setShortcuts: (shortcuts: Shortcut[]) => void,
// ) => {
//     const target = eInput.target;
//     const file = target.files && target.files[0];
//     if (!file) {
//         return;
//     }

//     let reader = new FileReader();
//     reader.onload = function(eLoad: any) {
//         let content = eLoad.target.result;
//         const shortcuts = JSON.parse(content).shortcuts as Shortcut[];
//         setShortcuts(shortcuts);
//         target.value = "";
//     };
//     reader.readAsText(file);
// };

const SheetActions = (_props: Props) => {
    // const { shortcuts, setShortcuts } = props;

    const onImportClick = (_e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("derp");
        // importShortcuts(e, setShortcuts)
    };

    const onExportClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        // exportShortcuts(shortcuts);
    };

    const onClearClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        // clearShortcuts(setShortcuts);
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
