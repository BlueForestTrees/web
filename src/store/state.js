import {Dial} from "../const/dial"
import ENV from "../env"
import {maquettes} from "../const/maquettes"
import {FACETS, IMPACT_TANK, ROOTS} from "../const/fragments"

export const createDialog = name => (dialogFactory[name] && dialogFactory[name]()) || (console.warn(`state.js il manque dialogFactory['${name}']`) || {})

const dialogFactory = {
    [Dial.LOGIN]: () => ({noAuth: true, vivisible: false, data: {destination: null}}),
    [Dial.FACET_ENTRY]: () => ({visible: false, data: {qt: null, unit: null, name: null}}),
    [Dial.ADD_IMPACT_ENTRY]: () => ({visible: false, data: {qt: null, unit: null, name: null}}),
    [Dial.ADD_RESSOURCE]: () => ({visible: false, data: {left: null, right: null}}),
    [Dial.CREATE]: () => ({visible: false, data: {}}),
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

export const snack = () => ({
    visible: false,
    multiline: false,
    timeout: 5000,
    vertical: false,
    text: "this message should be overriden.",
    color: "black"
})

export const tree = () => ({_id: null, trunk: null, selection: null, facets: null})

export default {
    callback: [],
    version: {web: ENV.VERSION},
    dispo: {grandeurs: false},
    selection: [],
    "menu.selection": [],
    maxSelectionSize: null,
    token: null,
    user: null,
    userStatus: null,
    expire: null,
    search: {name: null, cats: [], owner: null},
    basket: {},
    ['basket' + IMPACT_TANK]: {},
    ['basket' + FACETS]: {},
    tree: null,
    compare: {left: null, right: null, leftAxises: null, rightAxises: null, axis: null},
    dialogs: dialogs(),
    nav: {
        main: {tab: null},
        search: {cat: {opened: false}, owner: {opened: false}},
        leftMenuVisible: false, rightMenuVisible: false, dark: false, detailsDialog: false,
        tree: {
            currentSubPage: FACETS, modeAdd: false, cardFlipped: false,
            impact: {idx: 0, term: ""},
            root: {idx: 0, term: "", scope: ROOTS},
            facet: {term: ""},
            picker: {tab: null}
        },
        create: {
            tree: {
                callback: null
            }
        }
    },
    snack: snack(),
    messages: {title: null, description: null, hasMore: false, filter: {}, list: []},
    myMessages: [],
    maquettes,
    xRequestId: null
}