import On from "../../const/on"
import {mapActions} from 'vuex'
import {idQtUnit} from "../../services/calculations"

export default {
    methods: {
        goTree: function (tree) {
            this.dispatchGoTree(({_id: tree._id, bqt: tree.trunk.quantity.bqt}))
            this.unselect()
        },
        ...mapActions({
            dispatchGoTree: On.GO_TREE,
        })
    }
}