import * as To from "../services/mapper";
import _ from 'lodash';
import units from "../services/units";

export default {
    searchOccur: state => state.search.term && !state.search.searching && !!state.search.results,
    noResults: state => _.isEmpty(state.search.results),
    hasResults: (state, getters) => !!(getters.searchOccur && !getters.noResults),
    exactMatch: state => !!_.find(state.search.results, {name: state.search.term}),
    allowCreate: (state, getters) => !!(getters.searchOccur && (getters.noResults || !getters.exactMatch)),
    trunk: state => _.first(state.path),
    seed: state => _.last(state.path),
    isCurrentTrunk: (state, getters) => (trunk) => trunk._id === getters.trunk._id,
    tank(state, getters) {
        if (!getters.trunk) return undefined;
        return To.tank(getters.trunk);
    },
    searchUnit: state => (q) => {
        const first = [], last = [];
        for (const key in state.units) {
            const unit = state.units[key];
            if (unit.shortname.indexOf(q) > -1) {
                first.push(unit);
            } else if (unit.name.indexOf(q) > -1) {
                last.push(unit);
            }
        }
        return [...first, ...last];

    },
    lookupUnit: state => key => state.units[key],
    qtUnitName : (state, getters) => (value) => {
        if (!value)
            return null;

        let q, u, n;
        [, q, u, n] = value.match(/^(\d+[.,]?\d*)?(\S*)\s*(.*)?/);

        if (q && !getters.lookupUnit(u))
            return {name: value};

        if (!q && u) {
            n = n ? `${u} ${n}` : u;
            u = null;
        }

        return {
            qt: q ? q.replace(",", ".") : null,
            unit: u,
            name: n || null
        };
    },
    qtUnitNameString : () => qtUnitName => {
        if(qtUnitName && qtUnitName.qt && qtUnitName.unit && qtUnitName.name){
            return `${qtUnitName.qt}${qtUnitName.unit} ${qtUnitName.name}`
        }else{
            return null;
        }

    }
};