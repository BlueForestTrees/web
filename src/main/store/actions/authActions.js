import On from "../../const/on";
import Do from "../../const/do";
import api from "../../rest/api";

export default {
    [On.WANT_SUSCRIBE]: ({}, {mail}) => api.wantSuscribe({mail}),
    [On.SUSCRIBE]: ({}, {login, password}) => api.suscribe({login, password}),
    [On.LOGIN]: async ({commit}, {login, password}) => {
        const response = await api.login({login, password});
        commit(Do.SET_TOKEN, response.headers["x-access-token"]);
    },
    [On.LOGOUT]: async ({commit}) => {
        commit(Do.SET_TOKEN, null);
    }
};
