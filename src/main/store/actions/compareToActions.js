import Do from "../../const/do";
import On from "../../const/on";

export default {
    [On.LOAD_OPEN_COMPARE_TO]: async ({commit, dispatch}, {_id}) => {
        dispatch(On.LOAD_TREE, {_id})
            .then(tree => commit(Do.INIT_COMPARE_TO, tree));
    }
};