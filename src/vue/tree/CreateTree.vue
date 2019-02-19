<template>
    <card>
        <subpage-title title="Créer un produit" icon-class="scope-tree logo"/>

        <v-layout key="create-tree" column wrap justify-center align-center>
            <v-stepper v-model="idx" vertical @input="next" class="elevation-0">
                <v-stepper-step step="1" :complete="idx > 1">Choisir un nom</v-stepper-step>
                <v-stepper-content step="1">
                    <v-form v-model="nameValid" v-on:submit.prevent="" ref="nameForm">
                        <v-text-field mb-5 autofocus ref="nom" label="Nom" required v-model="name" :rules="[length2min]" @keydown.enter="validName"></v-text-field>
                    </v-form>
                    <v-btn color="primary" @click="validName">Ok</v-btn>
                </v-stepper-content>

                <v-stepper-step step="2" :complete="idx > 2">La quantité</v-stepper-step>
                <v-stepper-content step="2">
                    <v-form v-model="qtValid" v-on:submit.prevent="" ref="qtForm">
                        <v-layout :column="$vuetify.breakpoint.xsOnly">
                            <v-text-field autofocus type="number" label="Quantité... (ex.: 10)" v-model="qt" :rules="[required, isNumber]" @keydown.enter="validQt"></v-text-field>
                            <grandeur-select v-model="grandeur"/>
                            <unit-select v-model="unit" :grandeur="grandeur" :rules="[required]"/>
                        </v-layout>
                    </v-form>
                    <v-btn color="primary" @click="validQt">Ok</v-btn>
                    <v-btn flat @click="idx--">retour</v-btn>
                </v-stepper-content>

                <v-stepper-step step="3">La couleur</v-stepper-step>
                <v-stepper-content step="3">
                    <v-form v-model="colorValid" v-on:submit.prevent="" ref="colorForm">
                        <color-picker v-model="color"/>
                    </v-form>
                    <v-btn color="primary" @click="validColor">ok</v-btn>
                    <v-btn flat @click="idx--">retour</v-btn>
                    <v-layout row wrap justify-center align-center class="ma-4">
                        <v-card class="pl-2 pr-3 py-2 ma-1" style="border-radius:2em">
                            <tree-head :tree="tree"/>
                        </v-card>
                    </v-layout>
                </v-stepper-content>
            </v-stepper>
        </v-layout>
    </card>

</template>

<script>
    import On from "../../const/on"
    import {mapActions, mapState} from "vuex"
    import {Dial} from "../../const/dial"
    import {unit, grandeurFromShortname, toBqtG} from 'unit-manip'
    import {isNumber, length2min, required} from "../../services/rules"
    import {createStringObjectId, getRandomColor, treefy} from "../../services/calculations"
    import TreeHead from "./TreeHead"
    import UnitSelect from "../common/UnitSelect"
    import ColorPicker from "../common/ColorPicker"
    import Connected from "../mixin/Connected"
    import GrandeurSelect from "../common/GrandeurSelect"
    import Card from "../common/Card"
    import SubpageTitle from "./SubpageTitle"

    export default {
        name: 'create-trunk',
        components: {SubpageTitle, Card, GrandeurSelect, ColorPicker, UnitSelect, TreeHead},
        mixins: [Connected],
        data() {
            return {
                Dial,
                idx: 1,
                nameValid: false,
                qtValid: false,
                colorValid: false,
                color: null,
                name: null,
                grandeur: null,
                qt: null,
                unit: null
            }
        },
        computed: {
            ...mapState(['user']),
            trunk() {
                return {
                    _id: createStringObjectId(),
                    color: this.color,
                    name: this.name,
                    quantity: this.unit && toBqtG({qt: this.qt, unit: this.unit.shortname})
                }
            },
            tree() {
                return {trunk: this.trunk}
            }
        },
        mounted() {
            this.$refs.nameForm.reset()
            this.$refs.qtForm.reset()
            this.$refs.colorForm.reset()
            this.grandeur = grandeurFromShortname("kg")
            this.unit = unit("kg")
            this.qt = 1
            this.idx = 1
        },
        methods: {
            next(v) {
                if (v === 4) {
                    this.validColor()
                }
            },
            ...mapActions({
                createTrunk: On.CREATE_TRUNK,
                putQuantity: On.PUT_TRUNK_QUANTITY,
                callback: On.POP_CALLBACK
            }),
            validName() {
                this.$refs.nameForm.validate()
                if (this.nameValid) {
                    this.idx++
                }
            },
            validQt() {
                this.$refs.qtForm.validate()
                if (this.qtValid) {
                    this.idx++
                }
            },
            validColor() {
                this.$refs.colorForm.validate()
                if (this.colorValid) {
                    this.validate()
                }
            },
            validate() {
                this.createTrunk(this.trunk)
                    .then(() => {
                        this.callback(treefy(this.trunk))
                    })
            },
            length2min, getRandomColor, required, isNumber
        }
    }
</script>

<style>
    .v-stepper {
        max-width: 500px
    }
</style>