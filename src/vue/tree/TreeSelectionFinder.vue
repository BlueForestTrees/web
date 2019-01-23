<template>
    <span v-if="changeTree || !curTree">
        <v-card><selection-command/></v-card>
        <selection @select="selectTree"/>
    </span>
    <v-layout v-else align-center column>
        <div class="font-weight-medium pa-3">
            <v-icon color="green" class="mr-2">info</v-icon>
            Choisissez la quantité:
        </div>
        <card>
            <selection-picker class="pa-3" :tree="curTree" @change="selectionChange" @close="closeQtSelection"></selection-picker>
        </card>
    </v-layout>
</template>
<script>
    import SelectionCommand from "../basket/SelectionCommand"
    import Selection from "../basket/Selection"
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import {name} from "../../services/calculations"
    import Card from "../common/Card"
    import SelectionPicker from "./SelectionPicker"

    export default {
        name: "tree-selection-finder",
        components: {SelectionPicker, Card, Selection, SelectionCommand},
        props: ['tree'],
        data: () => ({selectedTree: null, changeTree: false}),
        methods: {
            name,
            ...mapActions({
                loadTreeFromSelection: On.LOAD_SELECTION,
                applySelection: On.APPLY_SELECTION
            }),
            async selectTree(item) {
                if (item.repeted) {
                    item = await this.loadTreeFromSelection({_id: item._id, fragments: []})
                }
                this.selectedTree = item
                this.changeTree = false
            },
            selectionChange(sel) {
                this.applySelection(sel)
                this.$emit("select", this.curTree)
                this.changeTree = false
            },
            closeQtSelection() {
                this.changeTree = true
            }
        },
        computed: {
            curTree() {
                return this.selectedTree || this.tree
            }
        }
    }
</script>