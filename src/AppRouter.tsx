import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Editor from "./Editor";

const AppRouter = () => {
    const Router = BrowserRouter;

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Editor />
                </Route>
            </Switch>
        </Router>
    );
};

export default AppRouter;
