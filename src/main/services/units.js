import api from './api'

export default {
    load : async () => await api.get("api/units")
};