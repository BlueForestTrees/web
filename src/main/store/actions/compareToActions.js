import Do from "../../const/do";
import On from "../../const/on";

export default {

    [On.LOAD_OPEN_COMPARE_TO]: async ({commit, dispatch}, tree) => {
        commit(Do.OPEN_COMPARE_TO, await dispatch(On.LOAD_TRUNK, tree));
    }
};
