import _ from 'lodash';

export default {
    prix: () => (tree) => _.find(tree.facetEntries, {name: "prix"}),
    qt: () => (tree) => _.find(tree.facetEntries, {name: "quantité"}),
    treeing: (state, getters) => state.tree._id && !getters.comparing,
    comparing: (state) => state.tree && state.compareTo,
    unit: state => shortname => state.units[shortname],
    grandeurOfUnitShortname: (state, getters) => shortname => state.grandeurs[getters.unit(shortname).grandeur]
};