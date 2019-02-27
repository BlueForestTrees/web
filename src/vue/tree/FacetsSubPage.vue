<template>
    <div>
        <v-card class="mb-5">
            <subpage-title title="Propriétés" icon-class="facet logo">
                <closer slot="right" @close="$emit('close')"/>
            </subpage-title>

            <fragment-list :tree="tree" :fragment="FACETS" none="Pas encore d'informations sur les propriétés"></fragment-list>

            <v-divider/>
            <v-layout justify-center>
                <open-message :section="section" no-text/>
                <v-btn icon>
                    <v-list-tile-avatar class="facet-add logo-moyen" @click="setAdding(true)"></v-list-tile-avatar>
                </v-btn>
            </v-layout>
        </v-card>
        <div id="adder">
            <facet-adder v-if="adding" :tree="tree" @close="setAdding(false)"/>
        </div>
    </div>
</template>

<script>
    import SelectableList from "../common/SelectableList"
    import On from "../../const/on"
    import {mapActions, mapState, mapMutations} from 'vuex'
    import OpenMessage from "../common/OpenMessage"
    import Card from "../common/Card"
    import FacetAdder from "../facet/FacetAdder"
    import {FACETS} from "../../const/fragments"
    import FragmentList from "./FragmentList"
    import SubpageTitle from "./SubpageTitle"
    import {name} from "../../services/calculations"
    import Closer from "../common/Closer"
    import {scrollSubPage, scrollTo} from "../../const/ux"
    import Do from "../../const/do"

    export default {
        name: "facets-subpage",
        components: {
            Closer,
            SubpageTitle,
            FragmentList,
            FacetAdder,
            Card,
            OpenMessage,
            SelectableList,
        },
        props: ['tree', 'modeAdd'],
        data: () => ({
            FACETS
        }),
        created() {
            this.refresh()
        },
        computed: {
            ...mapState({
                adding: s => s.nav.tree.facet.adding
            }),
            facets() {
                return this.tree && this.tree.facets
            },
            section() {
                return {
                    title: `Discussion sur les propriétés de \"${name(this.tree)}\"`,
                    filter: {
                        type: 'trunk-facet',
                        topicId: this.tree._id
                    }
                }
            }
        },
        methods: {
            ...mapMutations({
                setAdding: Do.SET_NAV_TREE_FACET_ADDING
            }),
            ...mapActions({
                dispatchGoEquiv: On.GO_EQUIV,
                updateTree: On.UPDATE_TREE
            }),
            goEquiv(facet) {
                this.dispatchGoEquiv({
                    _id: this.tree._id,
                    bqt: this.tree.trunk.quantity.bqt,
                    s_id: facet._id,
                    sbqt: facet.quantity.bqt
                })
            },
            refresh: async function () {
                this.loading = true
                this.updateTree({tree: this.tree, fragments: [FACETS]})
                this.loading = false
            },
        },
        watch: {
            adding(adding) {
                if (adding) {
                    this.$nextTick(() => scrollTo("#adder"))
                } else {
                    scrollSubPage()
                }
            }
        }
    }
</script>