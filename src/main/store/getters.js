import _ from 'lodash';

export default {
    prix: () => (tree) => _.find(tree.facetEntries, {name: "prix"}),
    qt: () => (tree) => _.find(tree.facetEntries, {name: "quantité"}),
    treeing: (state, getters) => state.tree._id && !getters.comparing,
    comparing: (state) => state.tree && state.compareTo,
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
    }
};