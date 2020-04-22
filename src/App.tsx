import React from "react";

// material ui
import { StylesProvider } from "@material-ui/core/styles";

import Auth from "./Auth";

const App = () => {
    return (
        <StylesProvider injectFirst>
            <Auth />
        </StylesProvider>
    );
};

export default App;
