import On from "../../const/on";
import Do from "../../const/do";
import {snack} from "../state";

export default {
    [On.SNACKBAR]: ({commit}, {text}) => {
        commit(Do.UPDATE_SNACKBAR, Object.assign(snack(), {visible: true, text}));
    }
}