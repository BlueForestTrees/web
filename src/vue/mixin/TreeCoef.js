import Do from "../../const/do"
import {mapMutations, mapState} from "vuex"

export default {
    methods: {
        ...mapMutations({setCoef: Do.SET_TREE_COEF})
    },
    computed: {
        ...mapState({coef: s => s.treeCoef}),
        treeCoef: {
            get() {
                return this.coef
            },
            set(treeCoef) {
                this.setCoef(treeCoef)
            }
        }
    }
}