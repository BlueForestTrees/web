import units from 'units'

export const toTrunk = (value) => {
    let trunk = null;
    if (!value) return trunk;

    const parsed = value.match(/^(\d+[.,]?\d*)(\S*)\s+(.*)/);


    if (!parsed) {
        const qtUnit = value.match(/^(\d+[.,]?\d*)(\S*)/);
        const validQtUnit = qtUnit && units.lookup(qtUnit[2]);
        if (!validQtUnit)
            trunk = {name: value};
    } else if (parsed[3] && parsed[3].length > 0) {
        if (units.lookup(parsed[2])) {
            trunk = {
                qt: parsed[1].replace(",", "."),
                unit: units.lookup(parsed[2]).shortName,
                name: parsed[3]
            }
        } else {
            trunk = {name: value};
        }
    }

    //console.log({parsed: parsed, trunk: JSON.stringify(trunk)});

    return trunk;

};