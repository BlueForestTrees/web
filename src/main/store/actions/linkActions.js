import On from "../../const/on"
import api from "../../rest/api"
import map from 'lodash.map'

export default {
    [On.LINK]: async ({commit}, {trunk, root}) => api.putLink(trunk, root),
    [On.DELETE_LINK]: ({commit}, {left, right}) => api.deleteLink(left._id, right._id)
}
