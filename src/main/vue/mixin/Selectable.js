import {isEmpty} from 'lodash';
import On from "../../const/on";
import {mapActions} from 'vuex';

export default {

    data: function () {
        return {
            selection: []
        }
    },
    props:['maxSelectionSize'],
    computed: {
        selectionNotEmpty() {
            return !isEmpty(this.selection);
        },
        selecteds() {
            return this.selection.length;
        },
        oneSelected() {
            return this.selectionNotEmpty && this.selection.length === 1 && this.selection[0];
        },
        twoSelected() {
            return this.selectionNotEmpty && this.selection.length === 2 && this.selection;
        },
        manySelected() {
            return this.selectionNotEmpty && this.selection.length > 2 && this.selection;
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
        },
        goTree: function (tree) {
            this.unselect();
            this.dispatchGoTree(tree);
        },
        ...mapActions({
            dispatchGoTree: On.GO_TREE,
        })
    }
}