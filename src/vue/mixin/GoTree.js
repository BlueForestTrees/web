import On from "../../const/on"
import {mapActions} from 'vuex'
import {idQtUnit} from "../../services/calculations"

export default {
    methods: {
        goTree: function (tree) {
            this.dispatchGoTree(tree)
            this.unselect()
        },
        ...mapActions({
            dispatchGoTree: On.GO_TREE,
        })
    }
}