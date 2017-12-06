export const toTrunk = (value) => {
    const parsed = value.match(/(\d*[.,]?\d*)(\S*) (.*)/);

    if (!parsed) {
        return {name: value};
    } else if (parsed[3] && parsed[3].length > 0) {
        return {
            qt: parsed[1].replace(",", "."),
            unit: unitService.lookUp(parsed[2]),
            name: parsed[3]
        };
    } else {
        return null;
    }

};