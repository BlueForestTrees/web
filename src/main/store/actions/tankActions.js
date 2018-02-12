import On from "../../const/on";
import rest from "../../services/rest";
import Do from "../../const/do";

export default {
    [On.LOAD_TANK]: async ({commit, state, dispatch}, tree) => {
        if (tree.trunk.quantity) {
            const qt = tree.trunk.quantity.qt;
            const unit = tree.trunk.quantity.unit;
            const _id = tree.trunk._id;
            return rest.getTank(qt, unit, _id)
                .then(tank => commit(Do.SET_TANK, {tree, tank}));
        }
    }
}