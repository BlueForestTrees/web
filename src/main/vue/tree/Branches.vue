<template>
    <v-card>
        <v-toolbar>
            <v-toolbar-title>Usages</v-toolbar-title>
            <v-spacer/>
            <v-icon @click="" style="cursor: pointer">add</v-icon>
        </v-toolbar>

        <v-container v-if="last && last.trunk">
            <item-list :dir="last.branches" @select="selectListItem" @add="addItemToLast"/>
            <item-path :path="path" @select="selectPathItem" @load="dispatchLoadTree" up/>
        </v-container>
    </v-card>
</template>

<script>
    import On from "../../const/on";
    import {mapActions, mapMutations} from 'vuex';
    import Do from "../../const/do";
    import {Dial} from "../../const/dial";
    import ItemList from "../common/ItemList";
    import ItemPath from "../common/ItemPath";
    import ConfigureLinkDialog from "../dialog/ConfigureLinkDialog";
    import {BRANCH} from "../../const/items";
    import items from "../../const/items";

    export default {
        components: {
            ConfigureLinkDialog,
            ItemPath,
            ItemList
        },
        props: ['tree'],
        data() {
            return {
                path: []
            }
        },
        watch: {
            tree(val) {
                this.path = [val];
            }
        },
        beforeMount: function () {
            this.path = [this.tree];
        },
        computed: {
            last: function () {
                if (this.path.length > 0)
                    return this.path[this.path.length - 1];
                else
                    return null;
            },
            beforeLast: function () {
                if (this.path.length > 1)
                    return this.path[this.path.length - 2];
                else
                    return null;
            }
        },
        methods: {
            ...mapActions({
                dispatchLoadBranches: On.LOAD_BRANCHES,
                dispatchLoadTree: On.LOAD_OPEN_TREE
            }),
            ...mapMutations({showDialog: Do.SHOW_DIALOG}),
            selectPathItem(item) {
                this.dispatchLoadBranches(item);
            },
            selectListItem(tree) {
                this.path.push(tree);
                this.dispatchLoadBranches(tree);
            },
            addItemToLast() {
                this.showDialog({dialog: Dial.ADD_ITEM, data: {tree: this.last, item: items.BRANCH}});
            }
        }
    }
</script>