import {Dial} from "../const/dial"
import ENV from "../env"
import {maquettes} from "../const/maquettes"

export const createDialog = name => (dialogFactory[name] && dialogFactory[name]()) || (console.warn(`state.js il manque dialogFactory['${name}']`) || {})

const dialogFactory = {
    [Dial.CONNECT_TO_CONTINUE]: () => ({noAuth: true, visible: false, data: {message: null}}),
}

const dialogs = () => {
    const dialsKeys = Object.keys(Dial)
    const dials = {}
    for (let i = 0; i < dialsKeys.length; i++) {
        dials[Dial[dialsKeys[i]]] = createDialog(Dial[dialsKeys[i]])
    }
    return dials
}

export const snack = () => ({visible: false, multiline: false, timeout: 2000, vertical: false, text: "this message should be overriden.", color: "green"})

export const tree = () => ({_id: null, trunk: null, selection: null, facets: null})

export default {
    version: {web: ENV.VERSION},
    dispo: {grandeurs: false},
    selections: {},
    maxSelectionSize: null,
    token: null,
    user: null,
    userStatus: null,
    expire: null,
    search: {panels: [], type: null, term: null, cats: null, owner: null, impact: null, facet: null},
    basket: [],
    tree: null,
    treeCoef: 1,
    compare: {left: null, right: null, leftAxises: null, rightAxises: null, axis: null},
    dialogs: dialogs(),
    nav: {
        intro: false,
        main: {tab: null},
        search: {cat: {opened: false}, owner: {opened: false}},
        treeRubanVisible: false, rightMenuVisible: false, dark: false, detailsDialog: false,
        tree: {
            menu: {
                visible: false
            },
            cardFlipped: false,
            impact: {idx: 0, term: ""},
            root: {idx: 0, term: ""},
            facet: {term: ""},
            picker: {tab: "search"}
        }
    },
    snack: snack(),
    messages: {title: null, comment: null, hasMore: false, filter: {}, list: []},
    myMessages: [],
    maquettes,
    xRequestId: null,
    info: {},
}
