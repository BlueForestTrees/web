<template>
    <v-layout column align-center mb-1>

        <fragment-list :tree="tree" :fragment="FACETS" :selectionKey="selectionKey"/>


        <transition name="slide-left-right">
            <v-layout v-if="oneSelected" justify-center>
                <open-message slot="right" :section="section" no-text/>
                <btn icon-class="balance logo" @click="goEquiv({tree, oneSelected})"></btn>
                <btn icon-class="game logo" @click="goQuiDeuxFoisPlus({tree, oneSelected})"></btn>
                <btn icon="delete" iconColor="grey" @click="deleteOneSelected"></btn>
            </v-layout>
        </transition>

        <btn icon="add_box" icon-color="grey" @click="setAdding(true)"/>

        <simple-dialog v-model="adding" icon="facet" title="Ajouter une propriété">
            <facet-adder :tree="tree" @close="setAdding(false)"/>
        </simple-dialog>

    </v-layout>

</template>

<script>
    import SelectableList from "../common/SelectableList"
    import On from "../../const/on"
    import {mapActions} from 'vuex'
    import OpenMessage from "../common/OpenMessage"
    import Card from "../common/Card"
    import FacetAdder from "../facet/FacetAdder"
    import {FACETS} from "../../const/fragments"
    import FragmentList from "./FragmentList"
    import SubpageTitle from "./SubpageTitle"
    import {name, qtUnitName} from "../../services/calculations"
    import Closer from "../common/Closer"
    import selectable from "../mixin/Selectable"
    import Btn from "../common/btn"
    import TransitionExpand from "../common/TransitionExpand"
    import {facet} from "../../const/selections"
    import Note from "../common/Note"
    import UnselectOnTreeChange from "../mixin/UnselectOnTreeChange"
    const SimpleDialog = () => import("../selection/SimpleDialog")

    export default {
        name: "facets-sub-page",
        components: {
            SimpleDialog,
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
        computed: {
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
                    .catch(this.snackError)
            },
            ...mapActions({
                snack: On.SNACKBAR,
                deleteFacet: On.DELETE_FACET,
                loadTreeFragment: On.UPDATE_TREE,
                goEquiv: On.GO_EQUIV,
                goQuiDeuxFoisPlus: On.GO_QUI_DEUX_FOIS_PLUS,
                snackError: On.SNACKERROR
            }),
            setAdding(adding) {
                this.adding = adding
                this.adding && this.unselect()
            }
        }
    }
</script>