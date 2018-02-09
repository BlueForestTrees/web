import On from "../../const/on";
import Do from "../../const/do";
import units from "../../services/units";

export default {
    [On.MOUNT_APP]: async ({dispatch}) => {
        await dispatch(On.LOAD_UNITS);
        await dispatch(On.LOAD_OPEN_TREE, {_id: "999903c03e77667641d99990"});
    },
    [On.EXCEPTION]: ({}, e) => {
        console.error(e);
        throw e;
    },
    [On.LOAD_UNITS]: async ({commit}) => {
        commit(Do.UPDATE_GRANDEURS, await units.load());
    },
};
