<template>
    <div>
        <template v-if="!dense">
            <subpage-title sub iconClass="carton logo" title="Quantité">
                <slot slot="left"></slot>
            </subpage-title>

            <v-divider/>
        </template>
        <v-form v-model="valid" v-on:submit.prevent="" ref="form">
            <v-container>
                <v-layout :column="$vuetify.breakpoint.xsOnly" align-center class="font-weight-thin subheading">
                    <v-text-field type="number" v-model="qt" :rules="[required, isNumber]" @keyup.enter="validate" class="chars-width-5" label="Quantité"></v-text-field>
                    <unit-select v-model="unit" :grandeur="grandeur" :rules="[required]" @keyup.enter="validate" class="chars-width-15" label="Unité"></unit-select>
                    <div v-if="value.eq">eq. {{value.eq}}</div>
                </v-layout>
            </v-container>

            <v-layout row justify-center>
                <closer previous @close="close"/>
                <v-spacer/>
                <v-btn v-if="canNoQt" flat @click.stop="validateEmpty">Pas de quantité</v-btn>
                <v-btn icon @click.stop="validate">Ok</v-btn>
            </v-layout>

        </v-form>
    </div>
</template>

<script>
    import closable from "../mixin/Closable"
    import {name} from "../../services/calculations"
    import {isNumber, required} from "../../services/rules"
    import Destination from "../common/Destination"
    import {Dial} from "../../const/dial"
    import {bqtGToQtUnit, getGrandeur, unit, toBqtG, bestQuantity} from 'unit-manip'
    import UnitSelect from "../common/UnitSelect"
    import GrandeurSelect from "../common/GrandeurSelect"
    import SubpageTitle from "../tree/SubpageTitle"
    import Closer from "./Closer"

    export default {
        name: 'quantity-picker',
        components: {Closer, SubpageTitle, GrandeurSelect, UnitSelect, Destination},
        mixins: [closable],
        props: {value: Object, dense: {type: Boolean, default: false}, canNoQt: {type: Boolean, default: false}},
        data: function () {
            return {
                qt: null,
                unit: null,
                valid: null,
                Dial,
                grandeur: null,
            }
        },
        methods: {
            name,
            validateEmpty() {
                this.$emit("input", null)
            },
            validate() {
                this.$refs.form.validate()
                if (this.valid) {
                    const quantity = toBqtG({qt: this.qt, unit: this.unit.shortname})
                    this.$emit("input", quantity)
                }
            },
            close() {
                this.$emit('close')
            },
            required, isNumber,
        },
        mounted() {
            let bqtG = this.value.g ? {bqt: 1, g: this.value.g} : this.value.quantity
            const qtUnit = bestQuantity(bqtGToQtUnit(bqtG))
            this.qt = qtUnit.qt
            this.unit = unit(qtUnit.unit)
            this.grandeur = getGrandeur(bqtG.g)
        }
    }
</script>