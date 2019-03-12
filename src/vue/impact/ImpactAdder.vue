<template>
    <div>

        <subpage-title title="Ajouter un impact" icon-class="planet-add logo" sub>
            <closer slot="right" @close="$emit('close')"/>
        </subpage-title>

        <v-divider/>

        <transition name="slide-fade" mode="out-in">

            <impact-entry-picker v-if="changeItem || !selectedEntry" @select="select"/>

            <v-layout v-else align-center column>
                <quantity-picker :item="selectedEntry" @change="validate" @close="closeQtPicker"></quantity-picker>
            </v-layout>

        </transition>
    </div>

</template>

<script>
    import Closer from "../common/Closer"
    import {name} from "../../services/calculations"
    import QuantityPicker from "../common/QuantityPicker"
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import ImpactEntryPicker from "./ImpactEntriesPicker"
    import SubpageTitle from "../tree/SubpageTitle"

    export default {
        name: "impact-adder",
        props: ['tree'],
        components: {SubpageTitle, ImpactEntryPicker, QuantityPicker, Closer},
        data: () => ({selectedEntry: null, changeItem: false}),
        methods: {
            name,
            ...mapActions({
                addToTree: On.ADD_IMPACT,
                snack: On.SNACKBAR
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
                    .catch(e => {
                        this.snack({text: e.message, color: "orange"})
                        console.error(e)
                    })
            },
            closeQtPicker() {
                this.changeItem = true
            },
        }
    }
</script>