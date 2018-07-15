import {GO} from "../../const/go";
import On from "../../const/on";
import router from "../../router/router";

export default {
    [On.GO_SEARCH]: ({}) => {
        router.push({name: GO.SEARCH});
    },
};
