import {Loo} from "../const/loo";
import _ from 'lodash';
import {Dial} from "../const/dial";

const dialogStateFromData = (data) => ({
    visible: false,
    data: data
});
const dialogFactory = {
    [Dial.TRUNK]: () => ({name: null}),
    [Dial.FACET]: () => ({qt: null, unit: null, name: null}),
    [Dial.COMPARE_TO]: () => ({name: null})
};

export const createDialog = name => dialogFactory[name]();
const dialogs = ()=> _.reduce(Dial, (dials, key) => {
    dials[key] = dialogStateFromData(createDialog(key));
    return dials;
}, {});

const lookup = () => ({term: null, results: null, searching: false});
const lookups = () => _.reduce(Loo, (lookups, key) => {
    lookups[key] = lookup();
    return lookups;
}, {});

export default {
    units: null,
    tree: {
        "_id": "5a4cd5a4bd5d0348033903a7",
        "name": "champignon",
        "facets": [
            {
                "qt": "10",
                "unit": "l",
                "name": "eau"
            },
            {
                "qt": "10",
                "unit": "l",
                "name": "coca"
            }
        ]
    },
    compareTo: null,
    linkEdit: null,
    addingSeed: false,
    lookups: lookups(),
    dialogs: dialogs()
};