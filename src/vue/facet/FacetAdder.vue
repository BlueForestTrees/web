<template>
    <div>

        <facet-entry-picker v-if="changeItem || !selectedEntry" @select="select" />

        <quantity-picker v-else :value="selectedEntry" @input="validate" @close="closeQtPicker"></quantity-picker>

    </div>
</template>

<script>
    import Closer from "../common/Closer"
    import {name} from "../../services/calculations"
    import QuantityPicker from "../common/QuantityPicker"
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import {GO} from "../../const/go"
    import FacetEntryPicker from "./FacetEntryPicker"
    import SubpageTitle from "../tree/SubpageTitle"

    export default {
        name: "facet-adder",
        props: ['tree'],
        components: {SubpageTitle, FacetEntryPicker, QuantityPicker, Closer},
        data: () => ({
            selectedEntry: null, changeItem: false,
            GO
        }),
        methods: {
            name,
            ...mapActions({
                addToTree: On.ADD_FACET,
                snack: On.SNACKBAR,
                snackError: On.SNACKERROR
            }),
            select(entry) {
                this.selectedEntry = entry
                this.changeItem = false
            },
            validate(quantity) {
                this.addToTree({tree: this.tree, entry: this.selectedEntry, quantity})
                    .then(() => {
                        this.changeItem = false
                        this.$emit('close')
                        this.snack({text: "1 propriété ajoutée", color: "green"})
                    })
                    .catch(this.snackError)
            },
            closeQtPicker() {
                this.changeItem = true
            },
        }
    }
</script>