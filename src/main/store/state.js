import _ from 'lodash';
import {Dial} from "../const/dial";

const dialogStateFromData = (data) => ({
    visible: false,
    data: data
});
const dialogFactory = {
    [Dial.TRUNK]: () => ({name: null}),
    [Dial.FACET_ENTRY]: () => ({qt: null, unit: null, name: null}),
    [Dial.IMPACT_ENTRY]: () => ({qt: null, unit: null, name: null}),
    [Dial.COMPARE_TO]: () => ({name: null}),
    [Dial.FACET]: () => ({name: null}),
    [Dial.IMPACT]: () => ({name: null}),
    [Dial.ADD_ITEM]: () => ({tree: null, item: null}),
    [Dial.CONFIGURE_LINK]: () => ({left: null, right: null}),
    [Dial.SEARCH]: () => ({}),
};

const dialogs = () => _.reduce(Dial, (dials, key) => {
    dials[key] = dialogStateFromData(createDialog(key));
    return dials;
}, {});

export const createDialog = name => (dialogFactory[name] && dialogFactory[name]()) || (console.warn(`state.js il manque dialogFactory['${name}']`) || {});

export const tree = () => ({_id: null, trunk: null, selection: null, facets: null});

export default {
    tree: null,
    compareTo: null,
    linkEdit: null,
    addingSeed: false,
    dialogs: dialogs()
};