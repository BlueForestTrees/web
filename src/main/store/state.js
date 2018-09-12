import {Dial} from "../const/dial"
import ENV from "../env"

export const createDialog = name => (dialogFactory[name] && dialogFactory[name]()) || (console.warn(`state.js il manque dialogFactory['${name}']`) || {})

const dialogFactory = {
    [Dial.ADD_TRUNK]: () => ({visible: false, data: {}}),
    [Dial.LOGIN]: () => ({noAuth: true, vivisible: false, data: {destination: null}}),
    [Dial.FACET_ENTRY]: () => ({visible: false, data: {qt: null, unit: null, name: null}}),
    [Dial.ADD_IMPACT_ENTRY]: () => ({visible: false, data: {qt: null, unit: null, name: null}}),
    [Dial.ADD_FACET]: () => ({visible: false, data: {name: null}}),
    [Dial.ADD_IMPACT]: () => ({visible: false, data: {tree: null}}),
    [Dial.ADD_RESSOURCE]: () => ({visible: false, data: {left: null, right: null}}),
    [Dial.ADD_USAGE]: () => ({visible: false, data: {tree: null}}),
    [Dial.CREATE]: () => ({visible: false, data: {}}),
    [Dial.SET_QT_UNIT]: () => ({visible: false, data: {}}),
    [Dial.FEEDBACK]: () => ({noAuth: true, visible: false, data: {}}),
    [Dial.SUSCRIBE]: () => ({noAuth: true, visible: false, data: {}}),
    [Dial.LOGIN]: () => ({noAuth: true, visible: false, data: {}}),
    [Dial.CONNECT_TO_CONTINUE]: () => ({noAuth: true, visible: false, data: {}}),
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
    timeout: 3000,
    vertical: false,
    text: "this message should be overriden.",
    color: "black"
})

export const messages = filter => ({aid: null, filter, list: []})

export const tree = () => ({_id: null, trunk: null, selection: null, facets: null})

export default {
    selection: [],
    token: null,
    user: null,
    search: {name: null, cats: []},
    basket: {},
    tree: null,
    compare: {left: null, right: null, leftAxises: null, rightAxises: null, axis: null},
    dialogs: dialogs(),
    nav: {leftMenuVisible: false, rightMenuVisible: false},
    snack: snack(),
    messages: messages({}),
    version: {web: ENV.VERSION},
}