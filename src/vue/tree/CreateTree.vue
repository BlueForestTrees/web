<template>

    <v-layout key="create-tree" column wrap justify-center align-center>
        <v-stepper v-model="idx" vertical @input="next" class="elevation-0">
            <v-stepper-step step="1" :complete="idx > 1">Choisir un nom</v-stepper-step>
            <v-stepper-content step="1">
                <v-form v-model="nameValid" v-on:submit.prevent="" ref="nameForm">
                    <v-text-field mb-5 autofocus ref="nom" label="Nom" required v-model="name" :rules="[length2min]" @keydown.enter="validName"></v-text-field>
                </v-form>
                <v-btn color="primary" @click="validName">Ok</v-btn>
            </v-stepper-content>

            <v-stepper-step step="2" :complete="idx > 2">Choisir la quantité</v-stepper-step>
            <v-stepper-content step="2">
                <v-form v-model="qtValid" v-on:submit.prevent="" ref="qtForm">
                    <v-layout column>
                        <grandeur-select v-model="grandeur"/>
                        <v-layout>
                            <v-text-field type="number" label="Quantité..." v-model="qt" :rules="[required, isNumber]" @keydown.enter="validQt"></v-text-field>
                            <unit-select v-model="unit" :grandeur="grandeur" :rules="[required]"/>
                        </v-layout>
                    </v-layout>
                </v-form>
                <v-btn color="primary" @click="validQt">Ok</v-btn>
                <v-btn flat @click="idx--">retour</v-btn>
            </v-stepper-content>
        </v-stepper>
    </v-layout>

</template>

<script>
    import On from "../../const/on"
    import {mapActions, mapState} from "vuex"
    import {Dial} from "../../const/dial"
    import {unit, grandeurFromShortname, toBqtG} from 'unit-manip'
    import {isNumber, length2min, required} from "../../services/rules"
    import {createStringObjectId, treefy} from "../../services/calculations"
    import TreeHead from "./TreeHead"
    import UnitSelect from "../common/UnitSelect"
    import GrandeurSelect from "../common/GrandeurSelect"

    export default {
        name: 'create-tree',
        components: {GrandeurSelect, UnitSelect, TreeHead},
        props: {noTitle: Boolean},
        data() {
            return {
                Dial,
                idx: 1,
                nameValid: false,
                qtValid: false,
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
            this.grandeur = grandeurFromShortname("kg")
            this.unit = unit("kg")
            this.qt = 1
            this.idx = 1
        },
        methods: {
            next(v) {
                if (v === 3) {
                    this.validate()
                }
            },
            ...mapActions({
                createTrunk: On.CREATE_TRUNK,
                putQuantity: On.PUT_TRUNK_QUANTITY,
                snack: On.SNACKBAR,
                snackError: On.SNACKERROR,
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
            validate() {
                this.createTrunk(this.trunk)
                    .then(() => {
                        const tree = treefy(this.trunk)
                        this.snack({text: `élément "${this.trunk.name}" crée`})
                        this.$emit('create', tree)
                    })
                    .catch(e => {
                        this.snackError(e)
                        this.idx--
                    })
            },
            length2min, required, isNumber
        }
    }
</script>

<style>
    .v-stepper {
        max-width: 500px
    }
</style>