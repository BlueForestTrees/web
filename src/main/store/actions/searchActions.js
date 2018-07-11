import On from "../../const/on";
import Do from "../../const/do";

export default {

    [On.SELECT_SEARCH]: ({dispatch, commit}, searchItem) => {
        commit(Do.ADD_TO_BASKET, searchItem);
        dispatch(On.GO_HOME);
    },

};
