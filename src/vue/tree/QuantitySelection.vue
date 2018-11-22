<template>
    <v-form v-model="valid" v-on:submit.prevent="" ref="form">
        <v-layout row align-center>
            <v-text-field type="number" v-model="qt" :rules="[required, isNumber]" @keyup.enter="validate" class="chars-width-3" label="Quantité"></v-text-field>
            <unit-select v-model="unit" :grandeur="grandeur" :rules="[required]" @keyup.enter="validate" class="chars-width-8" label="Unité"></unit-select>
        </v-layout>
        <v-layout row align-center>
            <v-text-field :disabled="!isRegulier" type="number" v-model="qtFreq" :rules="isRegulier ? [required, isNumber] : []" @keyup.enter="validate" class="chars-width-3" label="Tou(te)s les:"></v-text-field>
            <unit-select :disabled="!isRegulier" v-model="unitFreq" :grandeur="dureeGrandeur" :rules="isRegulier ? [required] : []" @keyup.enter="validate" class="chars-width-8"></unit-select>
        </v-layout>
        <v-layout row align-center>
            <v-text-field :disabled="!isRegulier" type="number" v-model="qtDuree" :rules="isRegulier ? [required, isNumber] : []" @keyup.enter="validate" class="chars-width-3" label="Pendant:"></v-text-field>
            <unit-select :disabled="!isRegulier" v-model="unitDuree" :grandeur="dureeGrandeur" :rules="isRegulier ? [required] : []" @keyup.enter="validate" class="chars-width-8"></unit-select>
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
                qtFreq: 1,
                unitFreq: unit("mois"),
                qtDuree: 1,
                unitDuree: unit("an"),
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
                    const tree = this.tree
                    const quantity = toBqtG({qt: this.qt, unit: this.unit.shortname})
                    if (!this.isRegulier) {
                        this.$emit("changeQuantity", {tree, quantity})
                    } else {
                        const freq = toBqtG({qt: this.qtFreq, unit: this.unitFreq.shortname})
                        const duree = toBqtG({qt: this.qtDuree, unit: this.unitDuree.shortname})
                        const name = this.name
                        this.$emit("changeSelection", {tree, selection: {quantity, freq, duree, name}})
                    }
                    this.close()
                }
            },
            close() {
                this.$emit('close')
            },
            required, isNumber
        },
        mounted() {
            if (this.tree.selection) {
                let bqtG = this.tree.selection.quantity
                const qtUnit = bestQuantity(bqtGToQtUnit(bqtG))
                this.qt = qtUnit.qt
                this.unit = unit(qtUnit.unit)
                this.grandeur = getGrandeur(bqtG.g)

                const qtUnitFreq = bestQuantity(bqtGToQtUnit(bqtG))
                this.qtFreq = qtUnitFreq.qt
                this.unitFreq = unit(qtUnitFreq.unit)

                const qtUnitDuree = bestQuantity(bqtGToQtUnit(bqtG))
                this.qtDuree = qtUnitDuree.qt
                this.unitDuree = unit(qtUnitDuree.unit)
            } else {
                let bqtG = this.tree.trunk.quantity
                const qtUnit = bestQuantity(bqtGToQtUnit(bqtG))
                this.qt = qtUnit.qt
                this.unit = unit(qtUnit.unit)
                this.grandeur = getGrandeur(bqtG.g)
            }
        }
    }
</script>