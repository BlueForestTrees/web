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
    tree:
    //null,
{
        "_id": "5a5081a3bd5d0348033903cf",
        "name": "tarte",
        "facets": [
            {
                "qt": 20,
                "unit": "kg",
                "name": "pomme"
            },
            {
                "qt": 1,
                "unit": "l",
                "name": "eau"
            },
            {
                "qt": 12,
                "unit": "km",
                "name": "queue"
            }
        ]
    },
    compareTo: null,
    //     {
    //     "_id": "5a5081efbd5d0348033903d0",
    //     "name": "gateau",
    //     "facets": [
    //         {
    //             "qt": 10,
    //             "unit": "kg",
    //             "name": "pomme"
    //         },
    //         {
    //             "qt": 3,
    //             "unit": "l",
    //             "name": "eau"
    //         },
    //         {
    //             "qt": 9,
    //             "unit": "km",
    //             "name": "queue"
    //         }
    //     ]
    // },
    linkEdit: null,
    addingSeed: false,
    lookups: lookups(),
    dialogs: dialogs()
};