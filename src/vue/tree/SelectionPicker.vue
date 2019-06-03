<template>
    <div>

        <subpage-title title="Choisir une quantité">
            <v-icon slot="left" class="carton logo"/>
            <closer slot="right" v-if="closable" @close="$emit('close')"/>
        </subpage-title>

        <v-container>

            <v-form v-model="valid" v-on:submit.prevent="" ref="form">
                <v-layout row align-center>
                    <v-text-field type="number" v-model="qt" :rules="[required, isNumber]" @keyup.enter="validate" label="Quantité"/>
                    <unit-select v-model="unit" :grandeur="grandeur" :rules="[required]" @keyup.enter="validate"/>
                </v-layout>

                <transition-expand>
                    <div v-if="isRegulier">
                        <v-layout row align-center>
                            <v-text-field type="number" v-model="qtFreq" :rules="isRegulier ? [required, isNumber] : []" @keyup.enter="validate" label="Tou(te)s les:"></v-text-field>
                            <unit-select v-model="unitFreq" :grandeur="dureeGrandeur" :rules="isRegulier ? [required] : []" @keyup.enter="validate"></unit-select>
                        </v-layout>
                        <v-layout row align-center>
                            <v-text-field type="number" v-model="qtDuree" :rules="isRegulier ? [required, isNumber] : []" @keyup.enter="validate" label="Pendant:"></v-text-field>
                            <unit-select v-model="unitDuree" :grandeur="dureeGrandeur" :rules="isRegulier ? [required] : []" @keyup.enter="validate"></unit-select>
                        </v-layout>
                        <v-layout row justify-center>
                            <v-text-field :counter="selectionNameMaxLength" type="text" v-model="name" :rules="[required, noMore30]" @keyup.enter="validate" label="Nom d'affichage"></v-text-field>
                        </v-layout>
                    </div>
                </transition-expand>
            </v-form>

            <v-layout row align-end>
                <v-checkbox v-model="isRegulier" label="répéter" class="tiny"/>
                <v-btn icon @click.stop="validate">Ok</v-btn>
            </v-layout>
        </v-container>
    </div>

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
    import TransitionExpand from "../common/TransitionExpand"

    export default {
        name: 'selection-picker',
        components: {TransitionExpand, Closer, SubpageTitle, Card, GrandeurSelect, UnitSelect, Destination},
        mixins: [closable],
        props: {
            value: Object,
            closable: {type: Boolean, default: true}
        },
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
        computed: {
            selection() {
                return this.value
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