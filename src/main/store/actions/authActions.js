import On from "../../const/on";
import Do from "../../const/do";
import api from "../../rest/api";
import {clearAccessToken, setAccessToken} from "../../rest/auth";
import decode from 'jwt-decode';

export default {
    [On.WANT_SUSCRIBE]: ({}, {mail}) => api.wantSuscribe({mail}),

    [On.CONFIRM_SUSCRIBE]: async ({commit}, {token, fullname, password}) => auth(commit, await api.confirmSuscribe({token, fullname, password})),
    [On.LOGIN]: async ({commit}, {mail, password}) => auth(commit, await api.login({mail, password})),

    [On.LOGOUT]: async ({commit}) => {
        await clearAccessToken();
        commit(Do.SET_USER, null);
    }
};

const auth = async (commit, authRes) => {
    const user = decode(authRes.token).user;
    await setAccessToken(authRes.token);
    commit(Do.SET_USER, user);
};