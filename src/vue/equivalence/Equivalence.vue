<template>
    <v-container key="equiv">
        <v-card>

            <v-layout column align-center mb-1>

                <subpage-title iconClass="balance logo" title="Equivalence">
                    <closer slot="right" @close="goHome"/>
                </subpage-title>
                <subpage-title :title="qtUnitName(filter)"></subpage-title>

                <v-container v-if="filter">
                    <tree-link :tree="tree"/>
                    <selectable-list :items="equivalences" :exceptId="_id"/>
                </v-container>

            </v-layout>
        </v-card>
    </v-container>
</template>
<script>
    import {mapActions} from "vuex"
    import On from "../../const/on"
    import Loader from "../loader/Loader"
    import TreeHead from "../tree/TreeHead"
    import {find, map} from "unit-manip"
    import SelectableList from "../common/SelectableList"
    import {qtUnitName} from "../../services/calculations"
    import SubpageTitle from "../tree/SubpageTitle"
    import Closer from "../common/Closer"
    import QtUnitName from "../tree/QtUnitName"
    import TreeSubHead from "../tree/TreeSubHead"
    import SelectionCardFront from "../tree/SelectionCardFront"
    import SelectionLink from "../pub/Selection-Link"
    import TreeLink from "../pub/TreeLink"

    export default {
        name: "equivalence",
        components: {TreeLink, SelectionLink, SelectionCardFront, TreeSubHead, QtUnitName, Closer, SubpageTitle, SelectableList, TreeHead, Loader},
        data() {
            return {
                tree: null,
                type: null,
                filter: null,
                loading: false,
                equivalences: []
            }
        },
        props: ['_id', 'bqt', 'sbqt', 's_id'],
        watch: {
            '$route'(to, from) {
                this.refresh()
            }
        },
        methods: {
            qtUnitName,
            ...mapActions({
                dispatchLoad: On.LOAD_TREE,
                dispatchSearchEquiv: On.SEARCH_EQUIV,
                snack: On.SNACKBAR,
                goTree: On.GO_TREE,
                goHome: On.GO_HOME,
                showDialog: On.SHOW_DIALOG
            }),
            refresh: async function () {
                try {
                    this.tree = await this.dispatchLoad({bqt: this.bqt, _id: this._id})
                    await this.tree.promises.facets
                    await this.tree.promises.impactsTank
                    this.updateFilter()
                    this.updateEquivalences()
                } catch (e) {
                    this.snack({text: "Cet élement n'existe pas ou plus", color: "orange"})
                }
            },
            updateFilter() {
                let attribut = this.tree && this.tree.facets && find(this.tree.facets, "_id", this.s_id)
                if (attribut) {
                    this.type = "facet"
                    this.filter = attribut
                    return
                }

                attribut = this.tree && this.tree.impactsTank && find(this.tree.impactsTank, "_id", this.s_id)
                if (attribut) {
                    this.type = "impact"
                    this.filter = attribut
                    return
                }

                attribut = this.tree && this.tree.roots && find(this.tree.roots, "_id", this.s_id)
                if (attribut) {
                    this.type = "root"
                    this.filter = attribut
                    return
                }
                console.warn("update filter but no equiv attribute")
            },
            async updateEquivalences() {
                if (this.filter) {
                    this.loading = true

                    console.log(this.type, this.filter)

                    await this.dispatchSearchEquiv({
                        _id: this.filter[(this.type === "root" ? "_id" : `${this.type}Id`)],
                        results: this.equivalences, type: this.type, bqt: this.sbqt
                    })
                    this.loading = false
                }
            }
        },
        created: function () {
            this.refresh()
        },
    }
</script>