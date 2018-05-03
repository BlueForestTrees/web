import {isEmpty} from 'lodash';

export default {
    data: function () {
        return {
            selection: []
        }
    },
    methods: {
        oneSelected() {
            return this.selectionNotEmpty() && this.selection.length === 1;
        },
        selectionNotEmpty() {
            return !isEmpty(this.selection);
        },
    }
}