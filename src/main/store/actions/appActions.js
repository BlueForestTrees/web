import On from "../../const/on";

export default {
    [On.MOUNT_APP]: async ({dispatch}) => {
        await dispatch(On.LOAD_OPEN_TREE, {_id: "5a6a03c03e77667641d2d2c1"});
        // await dispatch(On.LOAD_OPEN_COMPARE_TO, {_id: "222222222222222222222222"});
    },
    [On.EXCEPTION]: ({}, e) => {
        console.error(e);
        throw e;
    }
};
