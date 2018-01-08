import * as To from "../services/mapper";
import _ from 'lodash';
import units from "../services/units";

export default {
    prix: () => (tree) => _.find(tree.facets, {name: "prix"}),
    qt: () => (tree) => _.find(tree.facets, {name: "quantité"}),
    treeing: (state, getters) => state.tree && !getters.comparing,
    comparing: (state) => state.tree && state.compareTo,
    isCurrentTrunk: (state, getters) => (trunk) => trunk._id === getters.trunk._id,
    tank(state, getters) {
        if (!getters.trunk) return undefined;
        return To.tank(getters.trunk);
    },
    lookupUnit: state => key => state.units[key],
    qtUnitName: (state, getters) => (value) => {
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
            qt: q ? Number(q.replace(",", ".")) : null,
            unit: u,
            name: n || null
        };
    },
    qtUnitNameString: () => qtUnitName => {
        if (qtUnitName && qtUnitName.qt && qtUnitName.unit && qtUnitName.name) {
            return `${qtUnitName.qt}${qtUnitName.unit} ${qtUnitName.name}`
        } else {
            return null;
        }

    }
};