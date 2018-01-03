import {Dial} from "./keys";

const dialogStateFromData = (data) => ({
    visible: false,
    data: data
});

const dialogFactory = {
    trunk: () => ({name: null}),
    facet: () => ({qt: null, unit: null, name: null})
};

export const dialogs = {
    get: name => dialogFactory[name]()
};

export default {
    units: null,
    tree: null,
    otherTree: null,
    path: null,
    linkEdit: null,
    addingSeed: false,
    search: {
        term: null,
        results: null,
        searching: false
    },
    search2: {
        term: null,
        results: null,
        searching: false
    },
    dialogs: {
        [Dial.TRUNK]: dialogStateFromData(dialogs.get(Dial.TRUNK)),
        [Dial.FACET]: dialogStateFromData(dialogs.get(Dial.FACET))
    }
};