<template>
    <v-card>
        <v-layout row>
            <div class="ma-3 display-1 font-weight-thin">Ajouter un impact</div>
            <v-spacer/>
            <closer @close="$emit('close')"/>
        </v-layout>
        <impact-entries v-if="changeItem || !selectedImpactEntry" @select="select"/>
        <v-layout v-else align-center column>
            <div class="font-weight-medium subheading">
                <v-icon color="green" class="mr-2">info</v-icon>
                {{name(selectedImpactEntry)}}
            </div>
            <quantity-picker class="pa-3" :item="selectedImpactEntry" @change="validate" @close="closeQtSelection"></quantity-picker>
        </v-layout>
    </v-card>
</template>

<script>
    import ImpactEntries from "./ImpactEntries"
    import Closer from "../common/Closer"
    import {name} from "../../services/calculations"
    import QuantityPicker from "../common/QuantityPicker"
    import Card from "../common/Card"
    import On from "../../const/on"
    import {mapActions} from "vuex"

    export default {
        name: "impact-adder",
        props: ['tree'],
        components: {Card, QuantityPicker, Closer, ImpactEntries},
        data: () => ({selectedImpactEntry: null, changeItem: false}),
        methods: {
            ...mapActions({
                addToTree: On.ADD_IMPACT,
                snack:On.SNACKBAR
            }),
            select(impactEntry) {
                this.selectedImpactEntry = impactEntry
                this.changeItem = false
            },
            validate(quantity) {
                this.addToTree({tree: this.tree, impactEntry: this.selectedImpactEntry, quantity})
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
            closeQtSelection() {
                this.changeItem = true
            },
            name
        }
    }
</script>