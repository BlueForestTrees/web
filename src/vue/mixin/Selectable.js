import {mapState, mapMutations} from "vuex"
import Do from "../../const/do"

export default {
    created() {
        this.addSelectionKey(this.selectionKey)
    },
    computed: {
        ...mapState({
            selection(state) {
                return state.selections[this.selectionKey]
            }
        }),
        selectionCount() {
            return this.selection.length || 0
        },
        noneSelected() {
            return this.selectionCount === 0
        },
        anySelected() {
            return this.selectionCount > 0 && this.selection
        },
        oneSelected() {
            return (this.selectionCount === 1 || null) && this.selection[0]
        },
        twoSelected() {
            return this.selectionCount === 2 && this.selection
        },
        manySelected() {
            return this.selectionCount > 2 && this.selection
        },
        lastSelected() {
            return this.selectionCount > 0 && this.selection[this.selectionCount - 1]
        }
    },
    methods: {
        ...mapMutations({addSelectionKey: Do.ADD_SELECTION_KEY}),
        select: function(item){
            !this.isSelected() && this.toggleSelect(item)
        },
        unselect: function () {
            this.selection.splice(0, this.selection.length)
        },
        isSelected: function (item) {
            for (let i = 0; i < this.selection.length; i++) {
                if (item === this.selection[i]) {
                    return true
                }
            }
        },
        toggleSelect: function (item, opts = {}) {
            let removed = false
            for (let i = 0; i < this.selection.length; i++) {
                if (item === this.selection[i]) {
                    this.selection.splice(opts.andAfter ? i + 1 : i, opts.andAfter ? 999 : 1)
                    removed = true
                    break
                }
            }
            if (!removed) {
                this.selection.push(item)
                if (this.maxSelectionSize && this.maxSelectionSize < this.selection.length) {
                    this.selection.splice(0, this.selection.length - this.maxSelectionSize)
                }
            }
            return !removed
        }
    }
}