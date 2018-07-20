
export default {

    data: function () {
        return {
            selection: []
        }
    },
    props:['maxSelectionSize'],
    computed: {
        selectionCount() {
            return this.selection.length;
        },

        anySelected() {
            return this.selectionCount > 0 && this.selection;
        },
        oneSelected() {
            return this.selectionCount === 1 && this.selection[0];
        },
        twoSelected() {
            return this.selectionCount === 2 && this.selection;
        },
        manySelected() {
            return this.selectionCount > 2 && this.selection;
        },
    },
    methods: {
        unselect: function () {
            this.selection = [];
        },
        isSelected: function (item) {
            for (let i = 0; i < this.selection.length; i++) {
                if (item === this.selection[i]) {
                    return true;
                }
            }
        },
        toggleSelect: function (item) {
            let removed = false;
            for (let i = 0; i < this.selection.length; i++) {
                if (item === this.selection[i]) {
                    this.selection.splice(i, 1);
                    removed = true;
                    break;
                }
            }
            if (!removed) {
                this.selection.push(item);
                if (this.maxSelectionSize < this.selection.length) {
                    this.selection.splice(0, this.selection.length - this.maxSelectionSize);
                }
            }
        }
    }
}