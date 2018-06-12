import On from "../../const/on";

export default {
    [On.MOUNT_APP]: async ({dispatch}) => {
        await dispatch(On.LOAD_OPEN_TREE, {_id: "111111111111111111111111"});
        // await dispatch(On.LOAD_OPEN_TREE, {_id: "222222222222222222222222"});
    },
    [On.EXCEPTION]: ({}, e) => {
        console.error(e);
        throw e;
    }
};
