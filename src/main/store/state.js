import {Dial} from "./keys";

const dialogStateFromData = (data) => ({
    visible: false,
    data: data
});

export const dialogs = {
    trunk: () => ({name: null}),
    facet: () => ({qt: null, unit: null, name: null})
};

export default {
    units: null,
    tree: null,
    path: null,
    linkEdit: null,
    addingSeed: false,
    search: {
        term: null,
        results: null,
        searching: false
    },
    dialogs: {
        [Dial.TRUNK]: dialogStateFromData(dialogs.trunk()),
        [Dial.FACET]: dialogStateFromData(dialogs.facet())
    }
};