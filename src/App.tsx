import React from "react";

// material ui
import { StylesProvider } from "@material-ui/core/styles";

import AppRouter from "AppRouter";

const App = () => {
    return (
        <StylesProvider injectFirst>
            <AppRouter />
        </StylesProvider>
    );
};

export default App;
