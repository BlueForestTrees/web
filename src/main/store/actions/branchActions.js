import On from "../../const/on"
import api from "../../rest/api"
import Do from "../../const/do"
import {hasQuantity, multiplyRessourceBqt, trunkyAll} from "../../services/calculations"

export default {
    [On.LOAD_BRANCHES]: ({commit}, {_id, bqt}) =>
        api.getBranches(_id)
            .then(branches => multiplyRessourceBqt(bqt, branches))
}
