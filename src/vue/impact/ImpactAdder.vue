<template>
    <v-container>
        <v-layout row class="mb-5">
            <div class="display-1 font-weight-thin">Ajouter un impact</div>
            <v-spacer/>
            <closer @close="$emit('close')"/>
        </v-layout>

        <transition name="slide-fade" mode="out-in">

            <impact-entry-picker v-if="changeItem || !selectedEntry" @select="select"/>

            <v-layout v-else align-center column>
                <v-card>
                    <v-container>
                        <quantity-picker :item="selectedEntry" @change="validate" @close="closeQtPicker"></quantity-picker>
                    </v-container>
                </v-card>
            </v-layout>

        </transition>
    </v-container>
</template>

<script>
    import Closer from "../common/Closer"
    import {name} from "../../services/calculations"
    import QuantityPicker from "../common/QuantityPicker"
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import ImpactEntryPicker from "./ImpactEntriesPicker"

    export default {
        name: "impact-adder",
        props: ['tree'],
        components: {ImpactEntryPicker, QuantityPicker, Closer},
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