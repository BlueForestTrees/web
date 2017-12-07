import api from 'api'

let units = {};

const reload = async () => {
    units = await api.get("api/units");
};

(async () => {
    await reload();
})();


export default {
    search: (q) => {
        if (units[q]) {
            return [units[q]];
        }

        const topResults = [], bottomResults = [];

        for (const key in units) {
            const unit = units[key];
            if (unit.shortName.indexOf(q) > -1) {
                topResults.push(unit);
            } else if (unit.name.indexOf(q) > -1) {
                bottomResults.push(unit);
            }
        }
        return [...topResults, ...bottomResults];
    },
    lookup: (shortName) => {
        return units[shortName];
    }
};
