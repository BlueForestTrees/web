import {reduce} from 'lodash'
import {Dial} from "../const/dial"
import ENV from "../env"

const dialogStateFromData = (data) => ({
    visible: false,
    data: data
})
const dialogFactory = {
    [Dial.ADD_TRUNK]: () => ({destination: null}),
    [Dial.FACET_ENTRY]: () => ({qt: null, unit: null, name: null}),
    [Dial.ADD_IMPACT_ENTRY]: () => ({qt: null, unit: null, name: null}),
    [Dial.ADD_FACET]: () => ({name: null}),
    [Dial.ADD_IMPACT]: () => ({tree: null}),
    [Dial.ADD_RESSOURCE]: () => ({tree: null}),
    [Dial.ADD_USAGE]: () => ({tree: null}),
    [Dial.CONFIGURE_LINK]: () => ({left: null, right: null}),
    [Dial.CREATE]: () => ({}),
    [Dial.SET_QT_UNIT]: () => ({}),
    [Dial.FEEDBACK]: () => ({}),
    [Dial.SUSCRIBE]: () => ({}),
    [Dial.LOGIN]: () => ({}),
    [Dial.IMPORT_IMPACT_ENTRY]: () => ({})
}

const dialogs = () => reduce(Dial, (dials, key) => {
    dials[key] = dialogStateFromData(createDialog(key))
    return dials
}, {})

export const snack = () => ({
    visible: false,
    multiline: false,
    timeout: 3000,
    vertical: false,
    text: "this message should be overriden.",
    color: "black"
})

export const createDialog = name => (dialogFactory[name] && dialogFactory[name]()) || (console.warn(`state.js il manque dialogFactory['${name}']`) || {})

export const tree = () => ({_id: null, trunk: null, selection: null, facets: null})

export default {
    token: null,
    basket: [],
    tree: null,
    dialogs: dialogs(),
    nav: {leftMenuVisible: false},
    user: null,
    snack: snack(),
    version: {
        web: ENV.VERSION
    }
}