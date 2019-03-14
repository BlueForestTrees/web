<template>
    <div>
        <v-card class="ma-2">
            <subpage-title title="Propriétés" sub color="whitegrey">
                <v-layout slot="right" row justify-end>
                    <v-btn icon>
                        <v-list-tile-avatar class="facet-add logo" @click="setAdding(true)"></v-list-tile-avatar>
                    </v-btn>
                    <open-message slot="right" :section="section" no-text/>
                </v-layout>
            </subpage-title>

            <transition-expand>
                <v-card class="ma-2">
                    <facet-adder v-if="adding" :tree="tree" @close="setAdding(false)"/>
                </v-card>
            </transition-expand>

            <fragment-list :tree="tree" :fragment="FACETS" :selectionKey="selectionKey"></fragment-list>
        </v-card>

        <transition-expand>
            <v-card class="ma-2" v-if="oneSelected">
                <subpage-title title="Actions" sub color="whitegrey"/>
                <v-layout justify-center>
                    <btn icon-class="balance logo" @click="goEquiv({tree, oneSelected})"></btn>
                    <btn icon-class="game logo" @click="goQuiDeuxFoisPlus({tree, oneSelected})"></btn>
                    <btn icon="delete" iconColor="grey"></btn>
                </v-layout>
                <note :text="qtUnitName(oneSelected)" />
            </v-card>
        </transition-expand>
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
    import {name, qtUnitName} from "../../services/calculations"
    import Closer from "../common/Closer"
    import Do from "../../const/do"
    import selectable from "../mixin/Selectable"
    import Btn from "../common/btn"
    import TransitionExpand from "../common/TransitionExpand"
    import {facet} from "../../const/selections"
    import Note from "../common/Note"

    export default {
        name: "facets-subpage",
        components: {
            Note,
            TransitionExpand,
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
            FACETS, selectionKey: facet
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
            qtUnitName,
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
        }
    }
</script>