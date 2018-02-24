import On from "../../const/on";
import Do from "../../const/do";
import rest from "../../rest/routes";

export default {
    [On.MOUNT_APP]: async ({dispatch}) => {
        await dispatch(On.LOAD_UNITS);
        await dispatch(On.LOAD_OPEN_TREE, {_id: "111111111111111111111111"});
        await dispatch(On.LOAD_OPEN_COMPARE_TO, {_id: "222222222222222222222222"});
    },
    [On.EXCEPTION]: ({}, e) => {
        console.error(e);
        throw e;
    },
    [On.LOAD_UNITS]: async ({commit}) => {
        commit(Do.UPDATE_GRANDEURS, await rest.grandeurs());
    },
};
