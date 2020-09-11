import { atom } from "recoil";

import Sheet from "sheet/Sheet";

export default atom<Sheet[]>({
    key: "sheetsState",
    default: [],
});
