<template>
    <transition name="slide-fade" mode="out-in">

        <tree-picker v-if="showTreePicker" @pick="pickTree"/>


        <selection-picker v-else
                          :selection="finalSelection"
                          @pick="pickSelection" @close="closeSelectionPicker"/>

    </transition>
</template>
<script>
    import {mapState} from "vuex"
    import {selectionFromTree, name} from "../../services/calculations"
    import Card from "../common/Card"
    import SelectionPicker from "./SelectionPicker"
    import TreePicker from "./TreePicker"

    export default {
        name: "tree-selection-picker",
        components: {TreePicker, SelectionPicker, Card},
        props: ['value'],
        data: () => ({
            selection: null,
            selectionPickerClosed: false
        }),
        methods: {
            name,
            async pickTree(tree) {
                this.selection = tree.selection || selectionFromTree(tree)
                this.selectionPickerClosed = false
            },
            pickSelection(selection) {
                this.$emit("save", selection)
                this.selectionPickerClosed = false
            },
            closeSelectionPicker() {
                this.selection = null
                this.selectionPickerClosed = true
            }
        },
        computed: {
            initialSelection() {
                return this.value
            },
            pickedSelection() {
                return this.selection
            },
            finalSelection() {
                return this.pickedSelection || this.initialSelection
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