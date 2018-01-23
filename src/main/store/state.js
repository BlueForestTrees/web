import _ from 'lodash';
import {Dial} from "../const/dial";

const dialogStateFromData = (data) => ({
    visible: false,
    data: data
});
const dialogFactory = {
    [Dial.TRUNK]: () => ({name: null}),
    [Dial.FACET_ENTITY]: () => ({qt: null, unit: null, name: null}),
    [Dial.COMPARE_TO]: () => ({name: null}),
    [Dial.FACET]: () => ({name: null}),
    [Dial.RESSOURCE]: () => ({parentRessource: null})
};

export const createDialog = name => (dialogFactory[name] && dialogFactory[name]()) || (console.warn(`state.js il manque dialogFactory['${name}']`) || {});
const dialogs = ()=> _.reduce(Dial, (dials, key) => {
    dials[key] = dialogStateFromData(createDialog(key));
    return dials;
}, {});

export default {
    labelsGrandeurs:null,
    grandeurs:null,
    units: null,
    tree:null,
    compareTo: null,
    linkEdit: null,
    addingSeed: false,
    dialogs: dialogs(),
    dialogs2:{
        facetEntryDialog:{
            visible:false
        }
    }
};