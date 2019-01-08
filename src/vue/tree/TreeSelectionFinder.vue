<template>
    <span v-if="!tree">
        <selection-command/>
        <selection @select="selectTree"/>
    </span>
    <v-container v-else>
        <p class="align font-weight-black bold-font display-1">{{ name(tree) }}</p>
        <quantity-selection :tree="tree" @change="selectionChange" @close="closeSelection"/>
    </v-container>
</template>
<script>
    import SelectionCommand from "../basket/SelectionCommand"
    import Selection from "../basket/Selection"
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import QuantitySelection from "./QuantitySelection"
    import {name} from "../../services/calculations"

    export default {
        name: "tree-selection-finder",
        components: {QuantitySelection, Selection, SelectionCommand},
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
                this.$emit("select", sel.tree)
            },
            closeSelection() {
                this.tree = null
            }
        }
    }
</script>