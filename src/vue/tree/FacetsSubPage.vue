<template>
    <div>
        <v-card class="mb-5">
            <subpage-title title="Propriétés" icon-class="facet logo">
                <closer slot="right" @close="$emit('close')"/>
            </subpage-title>

            <fragment-list :tree="tree" :fragment="FACETS" none="Pas encore d'informations sur les propriétés"></fragment-list>

            <v-divider/>
            <v-layout justify-center>
                <open-message :section="section" no-text large/>
                <v-btn icon>
                    <v-list-tile-avatar class="facet-add logo" @click="setAdding(true)"></v-list-tile-avatar>
                </v-btn>
                <btn :enabled="oneSelected" icon-class="balance logo" @click="goEquiv({tree, oneSelected})"></btn>
                <btn :enabled="oneSelected" icon-class="game logo" @click="goQuiDeuxFoisPlus({tree, oneSelected})"></btn>
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
    import selectable from "../mixin/Selectable"
    import Btn from "../common/btn"

    export default {
        name: "facets-subpage",
        components: {
            Btn,
            Closer,
            SubpageTitle,
            FragmentList,
            FacetAdder,
            Card,
            OpenMessage,
            SelectableList,
        },
        props: ['tree', 'modeAdd'],
        mixins: [selectable],
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
                loadTreeFragment: On.UPDATE_TREE,
                goEquiv: On.GO_EQUIV,
                goQuiDeuxFoisPlus: On.GO_QUI_DEUX_FOIS_PLUS
            }),
            refresh: async function () {
                this.loading = true
                this.loadTreeFragment({tree: this.tree, fragments: [FACETS]})
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