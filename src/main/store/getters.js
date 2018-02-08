import _ from 'lodash';

export default {
    prix: () => (tree) => _.find(tree.facetEntries, {name: "prix"}),
    qt: () => (tree) => _.find(tree.facetEntries, {name: "quantité"}),
    comparing: (state) => state.tree && state.compareTo,
    unit: state => shortname => state.units[shortname],
    grandeurOfUnitShortname: (state, getters) => shortname => getters.grandeurByName(getters.unit(shortname).grandeur),
    grandeurByName: (state) => grandeurName => ({[grandeurName]: state.grandeurs[grandeurName]})
};