import Vue from 'vue'
import Do from "../../const/do";


export default {

    [Do.ADD_IMPACTS_TANK]: ({}, {tree, impactsTank}) => {
        if (!tree.impactsTank) {
            Vue.set(tree, "impactsTank", impactsTank);
        } else {
            tree.impactsTank.items.push(impactsTank);
        }
    },
    [Do.ADD_IMPACTS]: ({}, {tree, impacts}) => {
        if (!tree.impacts) {
            Vue.set(tree, "impacts", impacts);
        } else {
            tree.impacts.items.push(impacts);
        }
    },
    [Do.ADD_IMPACT]: ({}, {tree, impact}) => {
        if (tree.impacts) {
            tree.impacts.items.push(impact);
        } else {
            Vue.set(tree, "impacts", [impact]);
        }
    },

    [Do.DELETE_IMPACTS]: ({}, {impacts, toDelete}) => {
        if (impacts.items) {
            _.forEach(toDelete, impact => impacts.items.splice(impacts.items.indexOf(impact), 1));
        }
    }
}