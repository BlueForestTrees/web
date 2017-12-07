import units from 'units'

export const toTrunk = (value) => {

    if (!value) return null;

    const parsed = value.match(/(\d*[.,]?\d*)(\S*) (.*)/);

    if (!parsed) {
        return {name: value};
    } else if (parsed[3] && parsed[3].length > 0) {
        return {
            qt: parsed[1].replace(",", "."),
            unit: units.lookup(parsed[2]).shortName,
            name: parsed[3]
        };
    } else {
        return null;
    }

};