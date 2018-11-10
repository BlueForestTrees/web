<template>
    <v-container>
        <v-form v-model="valid" v-on:submit.prevent="" ref="form">
            <v-layout row align-center @click.stop="">
                <v-text-field type="number" label="Quantité" v-model="qt" :rules="[required, isNumber]" @keyup.enter="validate"/>
                <unit-select v-model="unit" :grandeur="grandeur" :rules="[required]" @keyup.enter="validate"/>
                <v-btn color="primary" @click.stop="validate">Ok</v-btn>
                <v-icon large color="grey" @click.stop="close">close</v-icon>
            </v-layout>
        </v-form>
    </v-container>
</template>

<script>
    import closable from "../mixin/Closable"
    import {isNumber, required} from "../../services/rules"
    import Destination from "../common/Destination"
    import {Dial} from "../../const/dial"
    import {bqtGToQtUnit, getGrandeur, unit, toBqtG, bestQuantity} from 'unit-manip'
    import MainDialog from "./MainDialog"
    import UnitSelect from "../common/UnitSelect"
    import GrandeurSelect from "../common/GrandeurSelect"


    export default {
        name: 'quantity-selection',
        components: {GrandeurSelect, UnitSelect, MainDialog, Destination},
        mixins: [closable],
        props: ['tree'],
        data: function () {
            return {
                qt: null,
                unit: null,
                valid: null,
                Dial,
                grandeur: null
            }
        },
        methods: {
            validate() {
                this.$refs.form.validate()
                if (this.valid) {
                    this.$emit("change", {
                        tree: this.tree,
                        quantity: toBqtG({qt: this.qt, unit: this.unit.shortname})
                    })
                    this.close()
                }
            },
            close() {
                this.$emit('close')
            },
            required, isNumber
        },
        mounted() {
            let bqtG = this.tree.trunk.quantity
            const qtUnit = bestQuantity(bqtGToQtUnit(bqtG))
            this.qt = qtUnit.qt
            this.unit = unit(qtUnit.unit)
            this.grandeur = getGrandeur(bqtG.g)
        }
    }
</script>