<template>
    <span>
        <div class="font-weight-medium subheading">
            <v-icon color="green" class="mr-2">info</v-icon>{{name(item)}}
        </div>
        <v-icon large color="grey" @click.stop="close" class="top-right">close</v-icon>

        <v-form v-model="valid" v-on:submit.prevent="" ref="form">

            <v-layout :column="$vuetify.breakpoint.xsOnly" align-center class="font-weight-thin subheading my-5">
                <v-text-field type="number" v-model="qt" :rules="[required, isNumber]" @keyup.enter="validate" class="chars-width-5" label="Quantité"></v-text-field>
                <unit-select v-model="unit" :grandeur="grandeur" :rules="[required]" @keyup.enter="validate" class="chars-width-15" label="Unité"></unit-select>
                <div v-if="item.eq">eq. {{item.eq}}</div>
            </v-layout>

                <v-layout row justify-center class="mt-5">
                    <v-btn flat icon @click.stop="validate"><v-icon large color="primary">done</v-icon></v-btn>
                </v-layout>

        </v-form>
    </span>
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

    export default {
        name: 'quantity-picker',
        components: {GrandeurSelect, UnitSelect, Destination},
        mixins: [closable],
        props: ['item'],
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
            validate() {
                this.$refs.form.validate()
                if (this.valid) {
                    const quantity = toBqtG({qt: this.qt, unit: this.unit.shortname})
                    this.$emit("change", quantity)
                }
            },
            close() {
                this.$emit('close')
            },
            required, isNumber,
        },
        mounted() {
            let bqtG = this.item.g ? {bqt: 1, g: this.item.g} : this.item.quantity
            const qtUnit = bestQuantity(bqtGToQtUnit(bqtG))
            this.qt = qtUnit.qt
            this.unit = unit(qtUnit.unit)
            this.grandeur = getGrandeur(bqtG.g)
        }
    }
</script>