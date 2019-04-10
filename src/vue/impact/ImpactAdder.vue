<template>
    <div>

        <entry-list v-if="changeItem || !selectedEntry" @select="select" :action="On.SEARCH_IMPACT_ENTRY"/>

        <v-layout v-else align-center column>
            <quantity-picker :item="selectedEntry" @change="validate" @close="closeQtPicker"></quantity-picker>
        </v-layout>
    </div>

</template>

<script>
    import Closer from "../common/Closer"
    import {name} from "../../services/calculations"
    import QuantityPicker from "../common/QuantityPicker"
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import SubpageTitle from "../tree/SubpageTitle"
    import EntryList from "./EntriesList"

    export default {
        name: "impact-adder",
        props: ['tree'],
        components: {EntryList, SubpageTitle, QuantityPicker, Closer},
        data: () => ({selectedEntry: null, changeItem: false, On}),
        methods: {
            name,
            ...mapActions({
                addToTree: On.ADD_IMPACT,
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
                        this.snack({text: "1 impact ajouté", color: "green"})
                    })
                    .catch(this.snackError)
            },
            closeQtPicker() {
                this.changeItem = true
            },
        }
    }
</script>