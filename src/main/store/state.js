import _ from 'lodash';
import {Dial} from "../const/dial";

const dialogStateFromData = (data) => ({
    visible: false,
    data: data
});
const dialogFactory = {
    [Dial.TRUNK]: () => ({name: null}),
    [Dial.FACET_ENTRY]: () => ({qt: null, unit: null, name: null}),
    [Dial.COMPARE_TO]: () => ({name: null}),
    [Dial.FACET]: () => ({name: null}),
    [Dial.RESSOURCE]: () => ({parentRessource: null}),
    [Dial.CONFIGURE_ROOT]: () => ({trunk:null,root:null})
};

export const createDialog = name => (dialogFactory[name] && dialogFactory[name]()) || (console.warn(`state.js il manque dialogFactory['${name}']`) || {});
const dialogs = () => _.reduce(Dial, (dials, key) => {
    dials[key] = dialogStateFromData(createDialog(key));
    return dials;
}, {});

export const tree = () => ({_id: null, trunk: null, roots: null, facets: null});

export default {

    tree: tree(),

    compareTo: null,
    labelsGrandeurs: null,
    grandeurs: null,
    units: null,
    linkEdit: null,
    addingSeed: false,
    dialogs: dialogs()
};