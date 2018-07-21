import {loadUnitsData} from "../../../api/src/main/service/unit/grandeurService";
import {initUnits} from "trees-units"

require('jsdom-global')();

export const init = async () => {
    initUnits(await loadUnitsData());
};