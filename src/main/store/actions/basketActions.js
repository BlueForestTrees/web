import router from "../../router/router";
import {GO} from "../../const/go";
import On from "../../const/on";
import Do from "../../const/do";

export default {
    [On.GO_BASKET]: ({}) => {
        router.push({name: GO.BASKET});
    },
    [On.ADD_TO_BASKET]: ({commit, dispatch}, items) => {
        const count = items.length;
        const s = count > 1 ? 's' : '';
        commit(Do.ADD_TO_BASKET, items);
        dispatch(On.SNACKBAR, {text: `${count} élément${s} ajouté${s} au panier.`});
    },
    [On.REMOVE_FROM_BASKET]: ({commit, dispatch}, items) => {
        const count = items.length;
        const s = items.length > 1 ? 's' : '';
        commit(Do.REMOVE_FROM_BASKET, items);
        dispatch(On.SNACKBAR, {text: `${count} élément${s} retiré${s} panier.`});
    }
};