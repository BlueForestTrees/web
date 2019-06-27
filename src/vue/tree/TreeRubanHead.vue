<template>
    <v-layout column align-center>
        <subpage-title :title="name(tree, '???')" color="primary" sub>
            <v-btn slot="right" icon @click="$emit('close')">
                <v-icon color="white">chevron_left</v-icon>
            </v-btn>
        </subpage-title>

        <v-layout align-center justify-center class="pt-3">
            <photo :trunk="tree && tree.trunk" size="400" class="mb-2"/>
        </v-layout>

        <v-layout justify-center>
            <open-message slot="right" :section="section" no-text/>
            <v-btn icon flat @click="compareDialogVisible = true">
                <v-icon class="compare logo-tout-petit"/>
            </v-btn>
            <v-btn icon slot="left" @click="qtDialogVisible = true">
                <v-icon class="carton logo-tout-petit"/>
            </v-btn>
            <btn :enabled="tree !== stateTree" @click="nodeNav" icon-class="trunk logo-petit"></btn>
            <v-btn icon flat @click="deleteOpenedTree">
                <v-icon color="grey">delete</v-icon>
            </v-btn>
        </v-layout>

        <simple-dialog v-model="qtDialogVisible" icon="carton" title="Modifier la quantité">
            <selection-picker :value="treeSelection" @pick="pickSelection" @close="qtDialogVisible = false" no-name/>
        </simple-dialog>

        <simple-dialog v-model="compareDialogVisible" icon="compare" title="Comparer avec...">
            <tree-picker @pick="pickCompare"/>
        </simple-dialog>

    </v-layout>
</template>

<script>
    import {mapActions, mapMutations, mapState} from "vuex"
    import OpenMessage from "../common/OpenMessage"
    import SubpageTitle from "./SubpageTitle"
    import {coefFromTrunkToSelection, name, selectionFromTree} from "../../services/calculations"
    import On from "../../const/on"
    import Btn from "../common/btn"
    import Do from "../../const/do"
    import Photo from "../common/Photo"
    import TreeCoef from "../mixin/TreeCoef"
    import SelectionPicker from "./SelectionPicker"
    import TreeSelectionPicker from "./TreeSelectionPicker"
    import TreePicker from "./TreePicker"

    const SimpleDialog = () => import("../selection/SimpleDialog")

    export default {
        name: "TreeRubanHead",
        mixins: [TreeCoef],
        components: {TreePicker, TreeSelectionPicker, SimpleDialog, SelectionPicker, Photo, Btn, SubpageTitle, OpenMessage},
        props: {tree: Object},
        data: () => ({
            qtDialogVisible: false,
            compareDialogVisible: false
        }),
        methods: {
            name,
            ...mapMutations({
                openTree: Do.OPEN_TREE
            }),
            ...mapActions({
                deleteOpenedTree: On.DELETE_OPENED_TREE,
                goCompare: On.GO_COMPARE
            }),
            nodeNav() {
                this.openTree(this.tree)
            },
            pickCompare(compare) {
                this.goCompare([this.tree, compare])
            },
            pickSelection(selection) {
                this.treeCoef = coefFromTrunkToSelection(selection, this.tree)
                this.qtDialogVisible = false
            }
        },
        computed: {
            ...mapState({stateTree: s => s.tree}),
            treeSelection() {
                return this.tree && this.tree.selection ? selectionFromTree(this.tree) : null
            },
            section() {
                return this.tree && {
                    title: `Message pour "${name(this.tree)}"`,
                    filter: {
                        type: 'tree',
                        topicId: this.tree._id
                    }
                }
            },
        },
    }
</script>

<style scoped>

</style>