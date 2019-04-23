import React from "react";

import Menu from "Menu";
import Sheet from "sheet/Sheet";

import "./App.scss";

const App = () => {
    return (
        <div className="app">
            <Menu />

            <div className="app-sheets">
                <Sheet />
            </div>
        </div>
    );
};

export default App;
