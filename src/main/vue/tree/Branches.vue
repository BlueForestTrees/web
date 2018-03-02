<template>
    <v-card>
        <configure-link-dialog :trunk="beforeLast" :root="last"/>

        <v-toolbar>
            <v-toolbar-title>Usages</v-toolbar-title>
            <v-spacer/>
            <v-icon @click="" style="cursor: pointer">add</v-icon>
        </v-toolbar>

        <v-container v-if="last && last.trunk">
            <item-list :dir="last.branches" @select="select(path.length, $event)" @add="addBranchToLast"/>
            <item-path :path="path" @delete="deleteLast" @select="select" @load="load" up/>
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
                dispatchDeleteBranch: On.DELETE_BRANCH,
                dispatchLoadBranches: On.LOAD_BRANCHES,
                dispatchLoad: On.LOAD_OPEN_TREE
            }),
            ...mapMutations({showDialog: Do.SHOW_DIALOG}),
            select(pathIndex, tree) {
                this.path.splice(pathIndex);
                this.path.push(tree);
                this.dispatchLoadBranches(tree);
            },
            deleteLast() {
                this.dispatchDeleteBranch({
                    tree: this.beforeLast,
                    branch: this.last
                });
                this.path.splice(-1, 1);
            },
            addBranchToLast() {
                this.showDialog({dialog: Dial.ADD_ITEM, data: {tree: this.last, item: items.BRANCH}});
            },
            load(idx, item) {
                this.dispatchLoad(item);
            }
        }
    }
</script>