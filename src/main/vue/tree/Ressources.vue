<template>
    <v-card>

        <v-toolbar>
            <v-toolbar-title>Ressources</v-toolbar-title>
            <v-spacer/>
            <v-icon @click="" style="cursor: pointer">add</v-icon>
        </v-toolbar>

        <v-container V-if="last && last.trunk">
            <item-path :path="path" @select="selectPathItem" @load="dispatchLoadTree"/>
            <item-list :dir="last.roots" @select="selectListItem" @add="addItemToLast"/>
        </v-container>

    </v-card>
</template>

<script>
    import On from "../../const/on";
    import {mapActions, mapMutations} from 'vuex';
    import Do from "../../const/do";
    import ConfigureLinkDialog from "../dialog/ConfigureLinkDialog";
    import AddRessourceDialog from "../dialog/AddItemDialog";
    import {Dial} from "../../const/dial";
    import ItemList from "../common/ItemList";
    import ItemPath from "../common/ItemPath";
    import items from "../../const/items";

    export default {
        components: {
            ItemPath,
            ItemList,
            AddRessourceDialog,
            ConfigureLinkDialog
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
                dispatchDeleteLink: On.DELETE_LINK,
                dispatchLoadRoots: On.LOAD_ROOTS,
                dispatchLoadTree: On.LOAD_OPEN_TREE
            }),
            ...mapMutations({showDialog: Do.SHOW_DIALOG}),
            selectPathItem(item) {
                this.dispatchLoadRoots(item);
            },
            selectListItem(tree) {
                this.path.push(tree);
                this.dispatchLoadRoots(tree);
            },
            addItemToLast() {
                this.showDialog({dialog: Dial.ADD_ITEM, data: {tree: this.last, item: items.ROOT}});
            }
        }
    }
</script>