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
    import Facets from "./Facets"
    import Branches from "./Branches"
    import Ressources from "./Ressources"
    import Impacts from "./Impacts"
    import {LOAD_OPEN_TREE} from "../../const/on"
    import {mapActions, mapState} from "vuex"
    import On from "../../const/on"
    import TreeHead from "./TreeHead"
    import AddTreeBtn from "../layout/AddTreeBtn"
    import AddTreePartBtn from "../layout/AddTreePartBtn"

    export default {
        components: {
            AddTreePartBtn,
            AddTreeBtn,
            TreeHead,
            Impacts,
            Ressources,
            Branches,
            Facets
        },
        props: ['_id', 'qt', 'unit'],
        computed: {
            ...mapState(['tree'])
        },
        methods: {
            ...mapActions({dispatchLoad: On.LOAD_IDQTUNIT}),
            refresh: function () {
                this.dispatchLoad({qt: this.qt, unit: this.unit, _id: this._id})
            }
        },
        created: function () {
            this.refresh()
        },
        watch: {
            '$route'(to, from) {
                this.refresh()
            }
        },
    }
</script>

<style>
    .item-card {
        margin-top: 1em
    }
</style>