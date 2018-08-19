import {initUnits} from "unit-manip"
import {loadUnitsDataMock} from "./grandeurServiceMock"

export const init = async () => {
    initUnits(await loadUnitsDataMock())
}

export const withNameIdBqtG = (name, _id, bqt, g) => ({name, _id, quantity: {bqt, g}})