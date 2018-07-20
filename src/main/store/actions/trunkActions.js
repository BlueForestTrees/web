import On from "../../const/on";
import api from "../../rest/api";
import Do from "../../const/do";
import {hasQuantity, trunky} from "../../services/calculations";

export default {
    [On.CREATE_TRUNK]: async ({commit, state, dispatch}, {color, name, type}) =>
        trunky(await api.createTrunk({color, name, type})),

    [On.LOAD_TRUNK]: ({commit}, tree) => {
        return hasQuantity(tree.trunk) ?
            api.getQuantifiedTrunk(tree.trunk.quantity.qt, tree.trunk.quantity.unit, tree._id)
                .then(trunk => commit(Do.SET_TRUNK, {tree, trunk}))
            :
            api.getTrunk(tree._id)
                .then(trunk => commit(Do.SET_TRUNK, {tree, trunk}));
    },
    [On.RENAME_TRUNK]: ({commit}, {trunk, newName}) =>
        api.renameTrunk(trunk._id, newName)
            .then(() => commit(Do.RENAME_TRUNK, {trunk, newName})),

    [On.PUT_TRUNK_QUANTITY]: ({commit, dispatch}, {trunk, quantity}) =>
        api.upsertQuantity(trunk._id, quantity)
            .then(() => commit(Do.PUT_TRUNK_QUANTITY, {trunk, quantity}))
            .then(() => dispatch(On.LOAD_OPEN_TREE, trunk)),

    [On.CLONE_TRUNK]: ({}, _id) =>
        api.cloneTrunk(_id)
}