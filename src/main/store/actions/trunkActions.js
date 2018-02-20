import On from "../../const/on";
import rest from "../../services/rest";
import Do from "../../const/do";
import {trunky} from "../../services/mapper";

export default {
    [On.CREATE_TRUNK]: async ({commit, state, dispatch}, name) => {
        return trunky(await rest.createTrunk({name}));
    },
    [On.LOAD_TRUNK]: ({commit}, tree) => {
        return rest.getTrunk(tree._id)
            .then(trunk => commit(Do.SET_TRUNK, {tree, trunk}));
    },
    [On.RENAME_TRUNK]: async ({commit}, {trunk, newName}) => {
        await rest.renameTrunk(trunk._id, newName);
        commit(Do.RENAME_TRUNK, {trunk, newName});
    },
    [On.PUT_TRUNK_QUANTITY]: ({commit, dispatch}, {trunk, quantity}) => {
        rest.upsertQuantity(trunk._id, quantity)
            .then(() => commit(Do.PUT_TRUNK_QUANTITY, {trunk, quantity}))
            .then(() => dispatch(On.INVALIDATE_TRUNK));
    },
    [On.CLONE_TRUNK]: ({}, _id) => rest.cloneTrunk(_id)
}