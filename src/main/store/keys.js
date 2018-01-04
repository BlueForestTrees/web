//Actions
export const On = {
    ADD_FACET: "addFacet",
    CLEAR_LINK_EDIT: "onClearLinkEdit",
    CREATE_AND_OPEN_TREE: 'onCreateAndOpenTree',
    CREATE_SEED: 'onCreateSeed',
    CREATE_TRUNK_THEN_SEED: 'onCreateTrunkThenSeed',
    CREATE_TRUNK: 'onCreateTrunk',
    FOCUS_ON_SEARCH: "focusOnSearch",
    LINK_CHANGED: 'onLinkChanged',
    LOAD_UNITS: 'loadUnits',
    LOOKUP_SEARCH: 'lookupSearch',
    MOUNT_APP: 'mountApp',
    OPEN_TREE: 'onOpenTree',
    UPDATE_ADDING_SEED_CLICK: 'onUpdateAddingSeedClick',
    UPDATE_SEARCH_TERM: "updateSearchTerm",
    PATH_CHANGED: "onPathChanged",
    PATH_CLICK: 'onPathClick',
    PATH_LINK_CLICK: 'onPathLinkClick',
    REFRESH_ROOT: "onRefreshRoot",
    ROOT_CLICK: 'onRootClick',
    SEARCH: 'onSearch',
    UPSERT_LINK: "upsertLink",
    UPDATE_LOOKUP_TERM: "updateLookupTerm",
};

//Mutations
export const Do = {
    ADD_FACET: "addFacet",
    ADD_TO_PATH: 'addToPath',
    ADD_SEED: 'addSeed',
    CHANGE_PATH_INDEX: 'changePathIndex',
    CLEAR_DIALOG_DATA: 'clearDialogData',
    CLEAR_LOOKUP_SEARCH: 'clearLookupSearch',
    CLEAR_RESULTS: 'clearResults',
    CLEAR_SEARCH: 'clearSearch',
    CLOSE_TREE: 'closeTree',
    HIDE_FACET_DIALOG:'hideFacetDialog',
    LOAD_UNITS: 'loadUnits',
    SHOW_DIALOG: "showDialog",
    UPDATE_FACET_DIALOG_VISIBILITY: "updateFacetDialogVisibility",
    OPEN_TREE: 'openTree',
    OPEN_OTHER_TREE: 'openOtherTree',
    UPDATE_ADDING_SEED: 'updateAddingSeed',
    UPDATE: 'update',
    UPDATE_DIALOG_VISIBILITY: 'updateDialogVisibility',
    UPDATE_DIALOG_DATA: 'updateDialogData',
    UPDATE_FACET_DIALOG_DATA: 'updateFacetDialogData',
    UPDATE_LINK_EDIT: 'updateLinkEdit',
    UPDATE_LOOKUP_TERM: 'updateLookupTerm',
    UPDATE_LOOKUP_SEARCHING: 'updateLookupSearching',
    UPDATE_LOOKUP_RESULTS: 'updateLookupResults',
    UPDATE_ROOT: 'updateRoot',
    UPDATE_PATH_ITEM: 'updatePathItem',
    UPDATE_QT: 'updateQt',
    UPDATE_RESULTS: 'updateResults',
    UPDATE_SEARCHING: 'updateSearching',
    UPDATE_TERM: 'updateTerm'
};

//Boites de dialogue
export const Dial = {
    TRUNK : "trunk",
    FACET: "facet",
    LOOKUP_TREE: "lookupTree"
};

//Champs de Lookup
export const Loo = {
    GLOBAL: "global",
    FACET: "facet",
    ROOT: "root"
};