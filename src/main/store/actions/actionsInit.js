import On from "../../const/on";

export default {
    [On.MOUNT_APP]: async ({dispatch}) => {
        await dispatch(On.LOAD_UNITS);
        await dispatch(On.LOAD_OPEN_TREE, {_id: "5a6a03c03e77667641d2d2c3"});
    },
    [On.EXCEPTION]: ({}, e) => {
        console.error(e);
        throw e;
    }
};
