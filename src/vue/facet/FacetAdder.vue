<template>
    <v-container>
        <v-card>

            <subpage-title title="Ajouter une propriété">
                <closer slot="right" @close="$emit('close')"/>
            </subpage-title>
            <v-divider/>

            <transition name="slide-fade" mode="out-in">

                <facet-entry-picker v-if="changeItem || !selectedEntry" @select="select" :create-entry-route="GO.ADD_FACET_ENTRY"/>

                <v-layout v-else align-center column>
                    <v-card>
                        <v-container>
                            <quantity-picker :item="selectedEntry" @change="validate" @close="closeQtPicker"></quantity-picker>
                        </v-container>
                    </v-card>
                </v-layout>

            </transition>
        </v-card>

    </v-container>
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
                        this.snack({text: "1 propriété ajoutée", color: "green"})
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