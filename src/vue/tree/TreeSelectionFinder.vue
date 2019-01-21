<template>
    <span v-if="!tree">
        <selection-command/>
        <v-divider/>
        <selection @select="selectTree"/>
    </span>
    <v-layout align-center column v-else>
        <div class="font-weight-medium pa-3"><v-icon color="green" class="mr-2">info</v-icon>Choisissez la quantité:</div>
        <card>
            <quantity-selection class="pa-3" :tree="tree" @change="selectionChange" @close="closeSelection"/>
        </card>
    </v-layout>
</template>
<script>
    import SelectionCommand from "../basket/SelectionCommand"
    import Selection from "../basket/Selection"
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import QuantitySelection from "./QuantitySelection"
    import {name} from "../../services/calculations"
    import Card from "../common/Card"

    export default {
        name: "tree-selection-finder",
        components: {Card, QuantitySelection, Selection, SelectionCommand},
        data: () => ({tree: null}),
        methods: {
            name,
            ...mapActions({
                loadTreeFromSelection: On.LOAD_SELECTION,
                applySelection: On.APPLY_SELECTION
            }),
            async selectTree(item) {
                if (item.repeted) {
                    item = await this.loadTreeFromSelection({_id: item._id, fragments: ["trunk"]})
                }
                this.tree = item
            },
            selectionChange(sel) {
                this.applySelection(sel)
                this.$emit("select", this.tree)
            },
            closeSelection() {
                this.tree = null
            }
        }
    }
</script>