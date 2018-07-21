import {initUnits} from "trees-units"
import {loadUnitsDataMock} from "./grandeurServiceMock";

require('jsdom-global')();

export const init = async () => {
    initUnits(await loadUnitsDataMock());
};