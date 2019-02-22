<template>
    <view-edit-save>

        <v-card slot="left">
            <subpage-title iconClass="voice logo" title="Equivalence"/>
            <eq-show :info="info"/>
        </v-card>

        <v-card slot="right">
            <subpage-title icon="edit" title="Modifier"/>
            <viewer-editor v-model="editing" :fields="fields" @change="change"/>
        </v-card>

        <saver slot="bottom" v-if="!editing" :changes="changes"/>

    </view-edit-save>

</template>
<script>
    import Card from "../common/Card"
    import TreeCard from "../tree/TreeCard"
    import {getAttributeByFragment, name, qtUnitName, qtFreq, attributeCoef, createSelection} from "../../services/calculations"
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import SelectionLink from "./Selection-Link"
    import TransitionExpand from "../common/TransitionExpand"
    import SelectionCardFront from "../tree/SelectionCardFront"
    import {GO} from "../../const/go"
    import InfoSaver from "./InfoSaver"
    import InfoLoader from "./InfoLoader"
    import Closer from "../common/Closer"

    const TreeSelectionPicker = () => import("../tree/TreeSelectionPicker")
    import SubpageTitle from "../tree/SubpageTitle"
    import TextareaEditor from "../editor/TextAreaEditor"
    import Connected from "../mixin/Connected"
    import ViewEditSave from "./ViewEditSave"
    import ViewerEditor from "../common/ViewerEditor"
    import Vue from "vue"
    import PathEditor from "./PathEditor"
    import CommonFragmentPicker from "../tree/CommonFragmentPicker"
    import Saver from "../editor/Saver"
    import EqShow from "./Eq"

    const createInfo = () => ({type: "eq", fragment: null, leftSelection: null, rightSelection: null, path: "", text: null})

    export default {
        name: "create-eq",
        components: {EqShow, Saver, CommonFragmentPicker, PathEditor, ViewerEditor, ViewEditSave, TextareaEditor, SubpageTitle, TreeSelectionPicker, Closer, InfoSaver, SelectionCardFront, TransitionExpand, SelectionLink, TreeCard, Card},
        props: ['path'],
        mixins: [InfoLoader, Connected],
        data: () => ({
            GO,
            editing: null,
            info: createInfo(),
            changes: {}
        }),
        methods: {
            qtUnitName, name, qtFreq,
            ...mapActions({
                loadSelectionTree: On.LOAD_SELECTION_TREE,
                applyCoefAll: On.APPLY_QUANTITY_COEF_ALL,
            }),
            change({key, value, newvalue}) {
                if (value !== newvalue) {
                    if (newvalue !== undefined) {
                        Vue.set(this.changes, key, newvalue)
                    } else {
                        Vue.delete(this.changes, key)
                    }
                }
            },
            remove() {
                this.info = createInfo()
            }
        },
        computed: {
            fields() {
                return [
                    {key: "leftSelection", title: "Produit A", displayFct: qtUnitName, value: this.info.leftSelection, editor: "tree-selection-picker"},
                    {key: "rightSelection", title: "Produit B", displayFct: name, value: this.info.rightSelection, editor: "tree-selection-picker"},
                    {
                        key: "fragment", title: "Aspect pris en compte", displayFct: name, value: this.info.fragment, editor: "common-fragment-picker",
                        params: [this.info.leftSelection && this.info.leftSelection.trunkId, this.info.rightSelection && this.info.rightSelection.trunkId],
                        noedit: !(this.info.rightSelection && this.info.leftSelection)
                    },
                    {key: "path", title: "Nom", value: this.info.path || "", editor: "path-editor"},
                    {key: "description", title: "Commentaire", value: this.info.description || "", editor: "textarea-editor"},
                ]
            },
            leftAttribute() {
                return this.leftTree && this.info.fragment && getAttributeByFragment(this.leftTree, this.info.fragment)
            },
            rightAttribute() {
                return this.rightTree && this.info.fragment && getAttributeByFragment(this.rightTree, this.info.fragment)
            },
            coef() {
                return this.leftAttribute
                    && this.rightAttribute
                    && this.info.fragment
                    && attributeCoef(this.leftAttribute, this.rightAttribute, this.info.fragment)
            },
        },
        watch: {
            coef(c) {
                if (c && c !== 1) {
                    this.applyCoefAll({tree: this.rightTree, coef: c})
                }
            }
        },
        created() {
            if (this.$store.state.tree) {
                if (this.$store.state.tree.selection) {
                    this.change({key: "leftSelection", newvalue: this.$store.state.tree.selection})
                } else {
                    const selection = createSelection(this.$store.state.tree)
                    this.change({key: "leftSelection", newvalue: selection})
                }
            }
        }
    }
</script>