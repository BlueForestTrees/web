import {find} from 'lodash';

export default {
    prix: () => (tree) => find(tree.autocompleteItems, {name: "prix"}),
    qt: () => (tree) => find(tree.autocompleteItems, {name: "quantité"}),
    connected: (state) => !!state.token
};