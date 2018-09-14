import api from "../../rest/api"
import {initUnits} from "unit-manip"
import On from "../../const/on"

export default {
    [On.LOAD_GRANDEUR]: ({state}) => api.getGrandeurs().then(initUnits).then(() => state.dispo.grandeurs = true)
}