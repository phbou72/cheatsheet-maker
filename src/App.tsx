import { StylesProvider } from "@material-ui/core/styles";
import { RecoilRoot } from "recoil";

import Auth from "./Auth";

const App = () => {
    return (
        <RecoilRoot>
            <StylesProvider injectFirst>
                <Auth />
            </StylesProvider>
        </RecoilRoot>
    );
};

export default App;
