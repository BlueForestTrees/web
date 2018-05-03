import On from "../../const/on";

export default {
    [On.MOUNT_APP]: async ({dispatch}) => {
        // await dispatch(On.LOAD_OPEN_TREE, {_id: "aaaaaaaaaaaaaaaaaaaaaaaa"});
        // await dispatch(On.LOAD_OPEN_COMPARE_TO, {_id: "222222222222222222222222"});
    },
    [On.EXCEPTION]: ({}, e) => {
        console.error(e);
        throw e;
    }
};
