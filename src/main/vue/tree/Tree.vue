<template>
    <v-container fluid>
        <v-layout justify-center align-center column>
            <v-card style="width: 100%">
                <tree-head :tree="tree"/>
                <ressources :tree="tree"/>
                <facets :tree="tree"/>
                <impacts :tree="tree"/>
                <branches :tree="tree"/>
                <add-tree-part-btn :tree="tree"/>
            </v-card>
        </v-layout>
    </v-container>
</template>

<script>
    import Facets from "./Facets";
    import Branches from "./Branches";
    import Ressources from "./Ressources";
    import Impacts from "./Impacts";
    import BilanRessources from "./BilanRessources";
    import {LOAD_OPEN_TREE} from "../../const/on";
    import {mapActions} from "vuex";
    import On from "../../const/on";
    import TreeHead from "./TreeHead";
    import AddTreeBtn from "../layout/AddTreeBtn";
    import AddTreePartBtn from "../layout/AddTreePartBtn";

    export default {
        components: {
            AddTreePartBtn,
            AddTreeBtn,
            TreeHead,
            BilanRessources,
            Impacts,
            Ressources,
            Branches,
            Facets
        },
        props: ['_id'],
        data: function () {
            return {
                tree: null
            }
        },
        methods: {
            refreshTree: async function () {
                this.tree = await this.dispatchOpenItem({_id: this._id});
            },
            ...mapActions({dispatchOpenItem: On.LOAD_OPEN_TREE})
        },
        created: function () {
            this.refreshTree();
        },
        watch: {
            '$route'(to, from) {
                this.refreshTree();
            }
        },
    }
</script>

<style>
    .item-card {
        margin-top: 1em;
    }
</style>