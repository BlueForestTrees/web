<template>
    <span>
        <v-card-title primary-title><div class="headline">Composition</div></v-card-title>
        <v-card-text v-if="loading">Chargement...</v-card-text>

        <v-card-text v-else-if="!tree">
            <div>Aucun produit ouvert. Faites une recherche.</div>
        </v-card-text>
        <v-layout v-else row wrap>
            <v-flex xs12>
                <v-card>
                    <v-container>
                        <tree-head :tree="tree"/>
                    </v-container>
                </v-card>
            </v-flex>
            <v-flex xs12>
                <ressources :tree="tree"/>
            </v-flex>
            <v-flex xs12>
                <facets :tree="tree"/>
            </v-flex>
            <v-flex xs12>
                <impacts :tree="tree"/>
            </v-flex>
            <v-flex xs12>
                <bilan-impacts :tree="tree"/>
            </v-flex>
            <v-flex xs12>
                <branches :tree="tree"/>
            </v-flex>
            <add-tree-part-btn :tree="tree"/>
        </v-layout>
    </span>
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
            Facets
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
            refresh: function () {
                if(this.bqt && this._id) {
                    this.loading = true
                    this.dispatchLoad({bqt: this.bqt, _id: this._id})
                        .then(()=>this.loading = false)
                        .catch(e => {
                            this.loading = false
                            this.snack({text: "Cet élement n'existe pas ou plus", color: "red"})
                        })
                }
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