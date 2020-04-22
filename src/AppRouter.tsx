import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Auth from "./Auth";
import Editor from "./Editor";

const AppRouter = () => {
    const Router = BrowserRouter;

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Auth />
                </Route>
                <Route path="/editor">
                    <Editor />
                </Route>
            </Switch>
        </Router>
    );
};

export default AppRouter;
