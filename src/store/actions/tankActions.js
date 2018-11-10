import On from "../../const/on"
import api from "../../rest/api"
import Do from "../../const/do"
import {hasQuantity, applyAspectCoef, applyRessourceCoef, multiplyTankBqt} from "../../services/calculations"

export default {
    [On.LOAD_TANK]: async ({commit, state, dispatch}, {_id, bqt}) =>
        api.getTank(_id)
            .then(tank => applyRessourceCoef(bqt, tank))
}


