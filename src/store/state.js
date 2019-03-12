import {Dial} from "../const/dial"
import ENV from "../env"
import {maquettes} from "../const/maquettes"

export const createDialog = name => (dialogFactory[name] && dialogFactory[name]()) || (console.warn(`state.js il manque dialogFactory['${name}']`) || {})

const dialogFactory = {
    [Dial.LOGIN]: () => ({noAuth: true, vivisible: false, data: {destination: null}}),
    [Dial.FACET_ENTRY]: () => ({visible: false, data: {qt: null, unit: null, name: null}}),
    [Dial.ADD_IMPACT_ENTRY]: () => ({visible: false, data: {qt: null, unit: null, name: null}}),
    [Dial.SUSCRIBE]: () => ({noAuth: true, visible: false, data: {}}),
    [Dial.LOGIN]: () => ({noAuth: true, visible: false, data: {}}),
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

export const snack = () => ({visible: false, multiline: false, timeout: 5000, vertical: false, text: "this message should be overriden.", color: "green"})

export const tree = () => ({_id: null, trunk: null, selection: null, facets: null})

export default {
    version: {web: ENV.VERSION},
    dispo: {grandeurs: false},
    selection: [],
    nodeSelection: [],
    "menu.selection": [],
    maxSelectionSize: null,
    token: null,
    user: null,
    userStatus: null,
    expire: null,
    search: {name: null, cats: [], owner: null},
    basket: [],
    tree: null,
    compare: {left: null, right: null, leftAxises: null, rightAxises: null, axis: null},
    dialogs: dialogs(),
    nav: {
        main: {tab: null},
        search: {cat: {opened: false}, owner: {opened: false}},
        leftMenuVisible: false, rightMenuVisible: false, dark: false, detailsDialog: false,
        tree: {
            menu: {
                visible: false
            },
            tabIdx: 0,
            cardFlipped: false,
            impact: {idx: 0, term: "", adding: false},
            root: {idx: 0, term: "", adding: false},
            facet: {term: "", adding: false},
            picker: {tab: null}
        }
    },
    snack: snack(),
    messages: {title: null, comment: null, hasMore: false, filter: {}, list: []},
    myMessages: [],
    maquettes,
    xRequestId: null,
    info: {},


}