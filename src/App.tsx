import React from "react";
// import { BrowserRouter } from "react-router-dom";

// material ui
import { StylesProvider } from "@material-ui/core/styles";

import Editor from "./Editor";

const App = () => {
    return (
        <StylesProvider injectFirst>
            <Editor />
        </StylesProvider>
    );
};

export default App;
