<template>
    <transition name="slide-fade" mode="out-in">

        <tree-picker v-if="showTreePicker" @pick="pickTree"/>

        <selection-picker v-else
                          :value="finalSelection"
                          @pick="pickSelection" @close="closeSelectionPicker"
                          :closable="canChangeTree"/>

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
        props: {
            value: Object,
            canChangeTree: {type: Boolean, default: true}
        },
        data: () => ({
            tree: null,
            selectionPickerClosed: false
        }),
        methods: {
            name,
            async pickTree(tree) {
                this.tree = tree
                this.selectionPickerClosed = false
            },
            pickSelection(selection) {
                if (this.finalTree) {
                    this.$emit("save", {...this.finalTree, selection})
                } else {
                    this.$emit("save", selection)
                }
                this.selectionPickerClosed = false
            },
            closeSelectionPicker() {
                this.tree = null
                this.selectionPickerClosed = true
            }
        },
        computed: {
            propsTree() {
                return this.value && this.value.selection && this.value
            },
            propsSelection() {
                return this.value && this.value.selection || this.value
            },
            pickedTreeSelection() {
                return this.tree && selectionFromTree(this.tree)
            },
            finalSelection() {
                return this.pickedTreeSelection || this.propsSelection
            },
            finalTree() {
                return this.tree || this.propsTree
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