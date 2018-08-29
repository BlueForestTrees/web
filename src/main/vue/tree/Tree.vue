<template>
    <v-container fluid grid-list-md>
        <v-layout row wrap>
            <!-- <v-flex xs12>
                <tree-head :tree="tree" @close="close"/>
            </v-flex> -->
            <v-flex xs12>
                <ressources :tree="tree"/>
            </v-flex>
            <v-flex xs12>
                <facets :tree="tree"/>
            </v-flex>
            <v-flex xs12>
                <impacts :tree="tree"/>
            </v-flex>
            <v-flex xs6>
                <bilan-impacts :tree="tree"/>
            </v-flex>
            <v-flex xs6>
                <tree-svg :tree="tree"/>
            </v-flex>
            <v-flex xs12>
                <branches :tree="tree"/>
            </v-flex>
            <add-tree-part-btn :tree="tree"/>
        </v-layout>
    </v-container>
</template>

<script>
    import TreeSvg from "./TreeSvg"
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
    import BilanImpacts from "./BilanImpacts"

    export default {
        components: {
            BilanImpacts,
            AddTreePartBtn,
            AddTreeBtn,
            TreeHead,
            Impacts,
            Ressources,
            Branches,
            Facets,
            TreeSvg
        },
        props: ['_id', 'bqt'],
        data: function () {
            return {
                loading: false
            }
        },
        computed: {
            ...mapState(['tree'])
        },
        methods: {
            ...mapActions({dispatchLoad: On.LOAD_OPEN_TREE, snack: On.SNACKBAR}),
            ...mapActions({close: On.GO_HOME}),
            refresh: function () {
                this.dispatchLoad({bqt: this.bqt, _id: this._id})
                    .catch(e => {
                        this.snack({text: "Cet élement n'existe pas ou plus", color: "red"})
                    })
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