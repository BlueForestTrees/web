<template>
    <v-select
            label="Destination..." required disabled
            item-text="qtUnitName" item-value="qtUnitName"
            v-model="treeItem"
            :items="treeItems"
    ></v-select>
</template>

<script>
    import {qtUnitName} from "../../services/calculations";

    export default {
        name: 'destination',
        props: ['tree'],
        computed: {
            treeItem: function () {
                return this.tree && this.tree.trunk && {qtUnitName: qtUnitName(this.tree.trunk)};
            },
            treeItems: function () {
                return this.treeItem ? [this.treeItem] : [];
            }
        }
    }
</script>