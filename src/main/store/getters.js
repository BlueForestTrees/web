import _ from 'lodash';

const throwDialogNotFound = dialog => {
    throw new ReferenceError(`state not found : state.dialogs['${dialog}']`);
};

export default {
    prix: () => (tree) => _.find(tree.facetEntries, {name: "prix"}),
    qt: () => (tree) => _.find(tree.facetEntries, {name: "quantité"}),
    treeing: (state, getters) => state.tree._id && !getters.comparing,
    comparing: (state) => state.tree && state.compareTo,
    dialog : state => dialog => state.dialogs[dialog] || throwDialogNotFound(dialog),
    unit : state => shortname => state.units[shortname],
    grandeur : (state, getters) => shortname => {
        console.log("grandeur of", shortname, " = ", getters.unit(shortname).grandeur);
        return getters.unit(shortname).grandeur
    }
};