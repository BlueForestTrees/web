import On from "../../const/on"
import Do from "../../const/do"
import {snack} from "../state"

const mapValidationErrors = ({message, errors}) =>
    `${message}. "${Object.values(errors)
        .map(err => `${err.param} ${err.msg}`)
        .join("; ")}"`

const errorText = ex =>
    ex.status === 404 && "L'élément n'a pas été trouvé. Il n'existe pas ou il est en préparation."
    ||
    ex.status && ex.body && ex.body.errorCode === 2 && mapValidationErrors(ex.body)
    ||
    ex.status && ex.body && ex.body.errorCode && ex.body.message
    ||
    ex.statusText
    ||
    ex

export default {
    [On.SNACKBAR]: ({commit}, snackOptions) => {
        if (snackOptions.color !== "green") {
            snackOptions.timeout = 0
        }
        commit(Do.UPDATE_SNACKBAR, Object.assign(snack(), {visible: true, ...snackOptions}))
    },
    [On.SNACKERROR]: ({dispatch}, ex) => dispatch(On.SNACKBAR, {multiline: true, text: errorText(ex), color: "red"})
}