import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";

import Editor from "./Editor";

const AppRouter = () => {
    const Router = BrowserRouter;

    return (
        <RecoilRoot>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Editor />
                    </Route>
                </Switch>
            </Router>
        </RecoilRoot>
    );
};

export default AppRouter;
