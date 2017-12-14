import api from './api'

let units = null;

const load = async () => {
    units = await api.get("api/units");
    return units;
};

const lookup = (key) => units[key];

const search = (q) => {
    return units[q] || _search(q);
};

const _search = (q) => {
    const first = [], last = [];
    for (const key in units) {
        const unit = units[key];
        if (unit.shortname.indexOf(q) > -1) {
            first.push(unit);
        } else if (unit.name.indexOf(q) > -1) {
            last.push(unit);
        }
    }
    return [...first, ...last];
};

export default {
    lookup, search, load
};
