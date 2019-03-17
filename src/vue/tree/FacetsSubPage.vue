<template>
    <div>
        <v-card class="ma-2 elevation-5">
            <subpage-title title="Propriétés" sub color="whitegrey">
                <btn v-if="!adding" slot="right" icon="add_box" icon-color="grey" @click="setAdding(true)"/>
            </subpage-title>

            <transition-expand>
                <div v-if="adding">
                    <v-divider/>
                    <subpage-title sub title="Ajouter une propriété" icon-class="facet logo">
                        <closer slot="right" @close="setAdding(false)"/>
                    </subpage-title>
                    <v-divider/>
                    <facet-adder :tree="tree" @close="setAdding(false)"/>
                </div>
            </transition-expand>

            <fragment-list v-if="!adding" :tree="tree" :fragment="FACETS" :selectionKey="selectionKey"/>
        </v-card>

        <transition-expand>
            <v-card class="ma-2 elevation-5" v-if="oneSelected">
                <subpage-title :title="qtUnitName(oneSelected)" sub color="whitegrey"/>
                <v-layout justify-center>
                    <open-message slot="right" :section="section" no-text/>
                    <btn icon-class="balance logo" @click="goEquiv({tree, oneSelected})"></btn>
                    <btn icon-class="game logo" @click="goQuiDeuxFoisPlus({tree, oneSelected})"></btn>
                    <btn icon="delete" iconColor="grey" @click="deleteOneSelected"></btn>
                </v-layout>
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
    import UnselectOnTreeChange from "../mixin/UnselectOnTreeChange"

    export default {
        name: "facets-sub-page",
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
        mixins: [selectable, UnselectOnTreeChange],
        data: () => ({
            FACETS, selectionKey: facet,
            adding: false
        }),
        created() {
            this.refresh()
        },
        computed: {
            facets() {
                return this.tree && this.tree.facets
            },
            section() {
                return {
                    title: `Discussion sur les propriétés de \"${name(this.tree)}\"`,
                    filter: {
                        type: 'trunk-facet',
                        topicId: this.tree._id,
                        subTopicId: this.oneSelected.facetId
                    }
                }
            }
        },
        methods: {
            qtUnitName,
            deleteOneSelected() {
                this.deleteFacet({tree: this.tree, facet: this.oneSelected})
                    .then(this.unselect)
                    .then(() => this.snack({text: "Propriété rétirée"}))
            },
            ...mapActions({
                snack: On.SNACKBAR,
                deleteFacet: On.DELETE_FACET,
                loadTreeFragment: On.UPDATE_TREE,
                goEquiv: On.GO_EQUIV,
                goQuiDeuxFoisPlus: On.GO_QUI_DEUX_FOIS_PLUS
            }),
            refresh: async function () {
                this.loading = true
                this.loadTreeFragment({tree: this.tree, fragments: [FACETS]})
                this.loading = false
            },
            setAdding(adding) {
                this.adding = adding
                this.adding && this.unselect()
            }
        }
    }
</script>