import {Dial, Loo} from "./keys";

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

const lookup = () => ({term: null, results: null, searching: false});

export default {
    units: null,
    tree: null,
    otherTree: null,
    path: null,
    linkEdit: null,
    addingSeed: false,
    lookups: {
        [Loo.GLOBAL]: lookup(),
        [Loo.FACET]: lookup(),
        [Loo.ROOT]: lookup(),
    },
    search: lookup(),
    dialogs: {
        [Dial.TRUNK]: dialogStateFromData(dialogs.get(Dial.TRUNK)),
        [Dial.FACET]: dialogStateFromData(dialogs.get(Dial.FACET))
    }
};