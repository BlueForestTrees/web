<template>
    <v-list v-if="hasItems">
        <v-divider/>
        <v-subheader>
            <v-tooltip top>
                <h4 slot="activator">USAGE</h4>
                <span>Utilisé pour...</span>
            </v-tooltip>
            <v-spacer/>
            <v-icon @click="open" style="cursor: pointer" v-if="oneSelected">launch</v-icon>
        </v-subheader>

        <template v-for="item in items">
            <v-list-tile avatar :key="'i'+item.trunk.name">
                <v-icon :style="{color:item.trunk.color,marginRight:'0.2em'}">lens</v-icon>{{qtUnitName(item.trunk) }}
            </v-list-tile>
        </template>

    </v-list>
</template>

<script>
    import On from "../../const/on";
    import {mapActions} from 'vuex';
    import QtUnit from "../common/QtUnit";
    import selectable from "../mixin/Selectable";
    import {getRandomColor, qtUnitName} from "../../services/calculations";

    export default {
        components: {
            QtUnit
        },
        props: ['tree'],
        mixins: [selectable],
        computed: {
            items: function () {
                return this.tree && this.tree.branches && this.tree.branches.items;
            },
            hasItems: function () {
                return this.items && this.items.length && this.items.length > 0;
            },
        },
        methods: {
            ...mapActions({
                dispatchLoadBranches: On.LOAD_BRANCHES,
                dispatchOpenItem: On.LOAD_OPEN_TREE
            }),
            open() {
                this.dispatchOpenItem(this.selection[0]);
            },
            getRandomColor, qtUnitName
        }
    }
</script>