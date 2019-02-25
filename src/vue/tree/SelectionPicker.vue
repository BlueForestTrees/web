<template>
    <v-flex>

        <subpage-title sub iconClass="carton logo" title="Quantité">
            <slot slot="left"></slot>
            <closer slot="right" @close="$emit('close')"/>
        </subpage-title>

        <v-container>
            <v-layout align-center column>

                <v-form v-model="valid" v-on:submit.prevent="" ref="form">
                    <v-layout row align-center>
                        <v-text-field type="number" v-model="qt" :rules="[required, isNumber]" @keyup.enter="validate"></v-text-field>
                        <unit-select v-model="unit" :grandeur="grandeur" :rules="[required]" @keyup.enter="validate"></unit-select>
                    </v-layout>
                    <v-layout row justify-center>
                        <v-checkbox v-model="isRegulier" label="répéter" class="tiny"></v-checkbox>
                        <v-text-field :counter="selectionNameMaxLength" type="text" v-model="name" :rules="[required, noMore30]" @keyup.enter="validate" label="Nom d'affichage"></v-text-field>
                    </v-layout>

                    <v-layout row align-center>
                        <v-text-field :disabled="!isRegulier" type="number" v-model="qtFreq" :rules="isRegulier ? [required, isNumber] : []" @keyup.enter="validate" label="Tou(te)s les:"></v-text-field>
                        <unit-select :disabled="!isRegulier" v-model="unitFreq" :grandeur="dureeGrandeur" :rules="isRegulier ? [required] : []" @keyup.enter="validate"></unit-select>
                    </v-layout>
                    <v-layout row align-center>
                        <v-text-field :disabled="!isRegulier" type="number" v-model="qtDuree" :rules="isRegulier ? [required, isNumber] : []" @keyup.enter="validate" label="Pendant:"></v-text-field>
                        <unit-select :disabled="!isRegulier" v-model="unitDuree" :grandeur="dureeGrandeur" :rules="isRegulier ? [required] : []" @keyup.enter="validate"></unit-select>
                    </v-layout>
                </v-form>

                <v-layout row style="width:100%">
                    <v-spacer/>
                    <v-btn icon @click.stop="validate" >Ok</v-btn>
                </v-layout>

            </v-layout>
        </v-container>
    </v-flex>

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
    import {selectionFromTree} from "../../services/calculations"
    import Card from "../common/Card"
    import SubpageTitle from "./SubpageTitle"
    import Closer from "../common/Closer"

    export default {
        name: 'selection-picker',
        components: {Closer, SubpageTitle, Card, GrandeurSelect, UnitSelect, Destination},
        mixins: [closable],
        props: ['selection'],
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
                    const quantity = toBqtG({qt: this.qt, unit: this.unit.shortname})
                    const repeted = this.isRegulier
                    const freq = toBqtG({qt: this.qtFreq, unit: this.unitFreq.shortname})
                    const duree = toBqtG({qt: this.qtDuree, unit: this.unitDuree.shortname})
                    const name = this.name
                    const trunkId = this.selection.trunkId
                    this.$emit("pick", {trunkId, quantity, repeted, freq, duree, name})
                }
            },
            close() {
                this.$emit('close')
            },
            required, isNumber,
            noMore30: v => v && v.length <= selectionNameMaxLength || "trop long"
        },
        mounted() {
            if (this.selection) {

                const bqtG = this.selection.quantity
                const qtUnit = bestQuantity(bqtGToQtUnit(bqtG))
                this.qt = qtUnit.qt
                this.unit = unit(qtUnit.unit)
                this.grandeur = getGrandeur(bqtG.g)

                this.isRegulier = this.selection.repeted

                if (this.selection.freq) {
                    const qtUnitFreq = bestQuantity(bqtGToQtUnit(this.selection.freq))
                    this.qtFreq = qtUnitFreq.qt
                    this.unitFreq = unit(qtUnitFreq.unit)
                }

                if (this.selection.duree) {
                    const qtUnitDuree = bestQuantity(bqtGToQtUnit(this.selection.duree))
                    this.qtDuree = qtUnitDuree.qt
                    this.unitDuree = unit(qtUnitDuree.unit)
                }

                this.name = this.selection.name || this.tree.trunk.name.substr(0, selectionNameMaxLength)

            }
        }
    }
</script>