import On from "../../const/on";
import Do from "../../const/do";
import units from "../../services/units";

export default {
    [On.MOUNT_APP]: async ({dispatch}) => {
        await dispatch(On.LOAD_UNITS);
        await dispatch(On.LOAD_OPEN_TREE, {_id: "aaaaaaaaaaaaaaaaaaaaaaaa"});
        await dispatch(On.LOAD_OPEN_COMPARE_TO, {_id: "bbbbbbbbbbbbbbbbbbbbbbbb"});
    },
    [On.EXCEPTION]: ({}, e) => {
        console.error(e);
        throw e;
    },
    [On.LOAD_UNITS]: async ({commit}) => {
        commit(Do.UPDATE_GRANDEURS, await units.load());
    },
};
