import rest from "./routes";
import _ from 'lodash';

async function initUnits() {



    const grandeursData = await rest.grandeurs();
    const unitsData = _.chain(grandeursData)
        .values()
        .flatten()
        .keyBy('shortname')
        .value();

    const result = {grandeursData, unitsData};

    return result;
}

export default initUnits;