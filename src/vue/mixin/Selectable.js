import {mapState} from "vuex"

export default {
    computed: {
        ...mapState({
            selection(state) {
                return state[this.stateKey || "selection"]
            }
        }),
        selectionCount() {
            return this.selection.length
        },
        noneSelected() {
            return this.selectionCount === 0
        },
        anySelected() {
            return this.selectionCount > 0 && this.selection
        },
        oneSelected() {
            return this.selectionCount === 1 && this.selection[0]
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