import On from "../../const/on";
import rest from "../../services/rest";
import Do from "../../const/do";

export default {
    [On.LOAD_TRUNK]: ({}, {_id}) => {
        return rest.getTrunk(_id);
    },
    [On.RENAME_TRUNK]: async ({commit}, {trunk, newName}) => {
        await rest.renameTrunk(trunk._id, newName);
        commit(Do.RENAME_TRUNK, {trunk, newName});
    },
    [On.PUT_TRUNK_QUANTITY]: ({commit, dispatch}, {trunk, quantity}) => {
        rest.upsertQuantity(trunk._id, quantity)
            .then(() => commit(Do.PUT_TRUNK_QUANTITY, {trunk, quantity}))
            .then(() => dispatch(On.INVALIDATE_TRUNK));
    }
}