<template>
    <v-form v-model="valid" v-on:submit.prevent="" ref="form">
        <v-layout row align-center>
            <v-text-field type="number" v-model="qt" :rules="[required, isNumber]" @keyup.enter="validate" class="chars-width-3" label="Quantité"></v-text-field>
            <unit-select v-model="unit" :grandeur="grandeur" :rules="[required]" @keyup.enter="validate" class="chars-width-8" label="Unité"></unit-select>
        </v-layout>
        <v-layout row align-center>
            <v-text-field :disabled="!isRegulier" type="number" v-model="qtDuree" :rules="isRegulier ? [required, isNumber] : []" @keyup.enter="validate" class="chars-width-3" label="Tou(te)s les:"></v-text-field>
            <unit-select :disabled="!isRegulier" v-model="unitDuree" :grandeur="dureeGrandeur" :rules="isRegulier ? [required] : []" @keyup.enter="validate" class="chars-width-8"></unit-select>
        </v-layout>
        <v-layout row align-center>
            <v-text-field :disabled="!isRegulier" type="number" v-model="qtDureeTotal" :rules="isRegulier ? [required, isNumber] : []" @keyup.enter="validate" class="chars-width-3" label="Pendant:"></v-text-field>
            <unit-select :disabled="!isRegulier" v-model="unitDureeTotal" :grandeur="dureeGrandeur" :rules="isRegulier ? [required] : []" @keyup.enter="validate" class="chars-width-8"></unit-select>
        </v-layout>
        <v-layout row justify-center>
            <v-checkbox v-model="isRegulier" label="répété"></v-checkbox>
            <v-text-field :disabled="!isRegulier" type="text" v-model="name" :rules="isRegulier ? [required] : []" @keyup.enter="validate" class="chars-width-3" label="Nom"></v-text-field>
            <v-btn flat icon @click.stop="validate">
                <v-icon large color="primary">done</v-icon>
            </v-btn>
            <v-btn flat icon @click.stop="close">
                <v-icon large color="grey">close</v-icon>
            </v-btn>
        </v-layout>
    </v-form>
</template>

<script>
    import closable from "../mixin/Closable"
    import {isNumber, required} from "../../services/rules"
    import Destination from "../common/Destination"
    import {Dial} from "../../const/dial"
    import {bqtGToQtUnit, getGrandeur, unit, toBqtG, bestQuantity} from 'unit-manip'
    import UnitSelect from "../common/UnitSelect"
    import GrandeurSelect from "../common/GrandeurSelect"

    export default {
        name: 'quantity-selection',
        components: {GrandeurSelect, UnitSelect, Destination},
        mixins: [closable],
        props: ['tree'],
        data: function () {
            return {
                qt: null,
                unit: null,
                qtDuree: 1,
                unitDuree: unit("mois"),
                qtDureeTotal: 1,
                unitDureeTotal: unit("an"),
                valid: null,
                Dial,
                grandeur: null,
                dureeGrandeur: getGrandeur("Duré"),
                isRegulier: false,
                name: null
            }
        },
        methods: {
            validate() {
                this.$refs.form.validate()
                if (this.valid) {
                    const change = {tree: this.tree}
                    const quantity = toBqtG({qt: this.qt, unit: this.unit.shortname})
                    if (this.isRegulier) {
                        change.selection = {
                            quantity,
                            freq: this.qtDuree * this.unitDuree.coef,
                            duree: this.qtDureeTotal * this.unitDureeTotal.coef,
                            name: this.name
                        }
                    } else {
                        change.quantity = quantity
                    }
                    this.$emit("change", change)
                    this.close()
                }
            },
            close() {
                this.$emit('close')
            },
            required, isNumber
        },
        mounted() {
            if (!this.tree.selection) {
                let bqtG = this.tree.trunk.quantity
                const qtUnit = bestQuantity(bqtGToQtUnit(bqtG))
                this.qt = qtUnit.qt
                this.unit = unit(qtUnit.unit)
                this.grandeur = getGrandeur(bqtG.g)
            } else {

            }
        }
    }
</script>