<template>
    <transition name="slide-fade" mode="out-in">
        <tree-picker v-if="showTreePicker" @pick="pickTree"/>

        <selection-picker v-else
                          :tree="pickedTree" @pick="pickSelection"
                          @close="closeSelectionPicker">

        </selection-picker>
    </transition>
</template>
<script>
    import On from "../../const/on"
    import {mapActions, mapState} from "vuex"
    import {name, treefySelection} from "../../services/calculations"
    import Card from "../common/Card"
    import SelectionPicker from "./SelectionPicker"
    import TreePicker from "./TreePicker"
    import {TRUNK} from "../../const/fragments"

    export default {
        name: "tree-selection-picker",
        components: {TreePicker, SelectionPicker, Card},
        props: ['value'],
        data: () => ({selectedTree: null, selectionPickerClosed: false}),
        methods: {
            name,
            ...mapActions({
                loadTreeFromSelection: On.LOAD_SELECTION,
                applySelection: On.APPLY_SELECTION
            }),
            async pickTree(item) {
                this.selectedTree = treefySelection(item)
                this.selectionPickerClosed = false
            },
            pickSelection({tree, selection}) {
                this.applySelection({tree, selection})
                this.$emit("save", selection)
                this.selectionPickerClosed = false
            },
            closeSelectionPicker() {
                this.selectionPickerClosed = true
            }
        },
        computed: {
            showTreePicker() {
                return this.selectionPickerClosed || !this.pickedTree
            },
            pickedTree() {
                return this.selectedTree || this.value
            },
            ...mapState({
                user: s => s.user
            })
        }
    }
</script>