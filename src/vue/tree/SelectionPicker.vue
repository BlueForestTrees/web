<template>
    <v-form v-model="valid" v-on:submit.prevent="" ref="form">
        <v-icon @click.stop="close" large color="grey" class="top-right hand">close</v-icon>
        <v-layout row align-center>
            <v-text-field type="number" v-model="qt" :rules="[required, isNumber]" @keyup.enter="validate" class="chars-width-3" label="Quantité"></v-text-field>
            <unit-select v-model="unit" :grandeur="grandeur" :rules="[required]" @keyup.enter="validate" class="chars-width-8"></unit-select>
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
            <v-text-field :counter="selectionNameMaxLength" type="text" v-model="name" :rules="[required, noMore30]" @keyup.enter="validate" class="chars-width-3" label="Nom d'affichage"></v-text-field>
            <v-checkbox v-model="isRegulier" label="répété" class="tiny"></v-checkbox>
            <v-btn flat icon @click.stop="validate">
                <v-icon color="primary" large>check</v-icon>
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
    import {selectionNameMaxLength} from "../../const/validation"

    export default {
        name: 'selection-picker',
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
                name: "",
                selectionNameMaxLength
            }
        },
        methods: {
            validate() {
                this.$refs.form.validate()
                if (this.valid) {
                    const tree = this.tree
                    const quantity = toBqtG({qt: this.qt, unit: this.unit.shortname})
                    const repeted = this.isRegulier
                    const freq = toBqtG({qt: this.qtFreq, unit: this.unitFreq.shortname})
                    const duree = toBqtG({qt: this.qtDuree, unit: this.unitDuree.shortname})
                    const name = this.name
                    this.$emit("change", {tree, selection: {quantity, repeted, freq, duree, name}})
                }
            },
            close() {
                this.$emit('close')
            },
            required, isNumber,
            noMore30: v => v && v.length <= selectionNameMaxLength || "trop long"
        },
        mounted() {
            if (this.tree.selection) {
                const bqtG = this.tree.selection.quantity
                const qtUnit = bestQuantity(bqtGToQtUnit(bqtG))
                this.qt = qtUnit.qt
                this.unit = unit(qtUnit.unit)
                this.grandeur = getGrandeur(bqtG.g)

                const qtUnitFreq = bestQuantity(bqtGToQtUnit(this.tree.selection.freq))
                this.qtFreq = qtUnitFreq.qt
                this.unitFreq = unit(qtUnitFreq.unit)

                const qtUnitDuree = bestQuantity(bqtGToQtUnit(this.tree.selection.duree))
                this.qtDuree = qtUnitDuree.qt
                this.unitDuree = unit(qtUnitDuree.unit)

                this.isRegulier = this.tree.selection.repeted
                this.name = this.tree.selection.name || this.tree.trunk.name.substr(0, selectionNameMaxLength)
            } else {
                let bqtG = this.tree.trunk.quantity
                const qtUnit = bestQuantity(bqtGToQtUnit(bqtG))
                this.qt = qtUnit.qt
                this.unit = unit(qtUnit.unit)
                this.grandeur = getGrandeur(bqtG.g)
                this.name = this.tree.trunk.name.substr(0, selectionNameMaxLength)
            }
        }
    }
</script>