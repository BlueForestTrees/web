<template>

    <tree-picker v-if="showTreePicker" @pick="pickTree" />

    <div v-else>
        <subpage-title sub title="Choisir une quantité">
            <v-icon slot="left" class="carton logo"/>
            <closer slot="right" @close="closeSelectionPicker"/>
        </subpage-title>
        <selection-picker
                :value="finalSelection"
                @pick="pickSelection" @close="closeSelectionPicker"
                :closable="canChangeTree"/>
    </div>

</template>

<script>
    import {mapState} from "vuex"
    import {selectionFromTree, name} from "../../services/calculations"
    import Card from "../common/Card"
    import SelectionPicker from "./SelectionPicker"
    import TreePicker from "./TreePicker"
    import SubpageTitle from "./SubpageTitle"
    import Closer from "../common/Closer"

    export default {
        name: "tree-selection-picker",
        components: {Closer, SubpageTitle, TreePicker, SelectionPicker, Card},
        props: {
            value: Object,
            canChangeTree: {type: Boolean, default: true},
            returnTree: {type: Boolean, default: false}
        },
        data: () => ({
            pickedTree: null,
            selectionPickerClosed: false
        }),
        methods: {
            name,
            async pickTree(pickedTree, way) {
                this.pickedTree = pickedTree
                //si on vient de créer on oblige pas à rechoisir une quantité
                if (way === 'create') {
                    this.pickSelection(selectionFromTree(pickedTree))
                }
                this.selectionPickerClosed = false
            },
            pickSelection(selection) {
                if (this.returnTree) {
                    this.$emit("save", {...this.finalTree, selection})
                } else {
                    this.$emit("save", selection)
                }
                this.selectionPickerClosed = false
            },
            closeSelectionPicker() {
                this.pickedTree = null
                this.selectionPickerClosed = true
            }
        },
        computed: {
            propsTree() {
                return this.value && !this.value.selection && this.value
            },
            propsSelection() {
                return this.value && this.value.selection || this.value
            },
            pickedTreeSelection() {
                return this.pickedTree && selectionFromTree(this.pickedTree)
            },
            finalSelection() {
                return this.pickedTreeSelection || this.propsSelection
            },
            finalTree() {
                return this.pickedTree || this.propsTree
            },
            showTreePicker() {
                return this.selectionPickerClosed || !this.finalSelection
            },
            ...mapState({
                user: s => s.user
            })
        }
    }
</script>