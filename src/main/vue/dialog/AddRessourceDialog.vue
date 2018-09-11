<template>
    <main-dialog :dialog="Dial.ADD_RESSOURCE" ref="dialog" :title="'Ajouter une ressource'" @esc="close" @focus="focus" :noaction="searching">
        <v-card-text>
            <v-stepper v-model="idx" vertical>
                <v-stepper-step step="1" :complete="idx > 1">Choisir le sens</v-stepper-step>
                <v-stepper-content step="1">
                    <v-container>
                        <destination :tree="left"/>
                        <v-list-tile>
                            <v-icon x-large>call_merge</v-icon>
                        </v-list-tile>
                        <destination :tree="right"/>
                    </v-container>
                    <v-btn color="primary" @click="idx++">Ok</v-btn>
                    <v-btn dense @click="revert">
                        <v-icon>swap_vert</v-icon>
                        inverser
                    </v-btn>
                </v-stepper-content>

                <v-stepper-step step="2" :complete="idx > 2">La quantité 1</v-stepper-step>
                <v-stepper-content step="2">
                    <v-container ma-0>
                        <color-qt-unit-name :item="leftItem"/>
                    </v-container>
                    <v-form v-model="qtLeftValid" v-on:submit.prevent="" ref="qtLeftForm">
                        <v-layout :column="$vuetify.breakpoint.xsOnly">
                            <v-text-field autofocus type="number" label="Quantité... (ex.: 10)" v-model="leftQt" :rules="[required, isNumber]" @keydown.enter="validLeftQt"/>
                            <unit-select v-model="leftUnit" :grandeur="leftGrandeur" :rules="[required]"/>
                        </v-layout>
                    </v-form>
                    <v-btn color="primary" @click="validLeftQt">Ok</v-btn>
                    <v-btn flat @click="idx--">retour</v-btn>
                </v-stepper-content>

                <v-stepper-step step="3" :complete="idx > 3">La quantité 2</v-stepper-step>
                <v-stepper-content step="3">
                    <v-container ma-0>
                        <color-qt-unit-name :item="rightItem"/>
                    </v-container>
                    <v-form v-model="qtRightValid" v-on:submit.prevent="" ref="qtRightForm">
                        <v-layout :column="$vuetify.breakpoint.xsOnly">
                            <v-text-field autofocus type="number" label="Quantité... (ex.: 10)" v-model="rightQt" :rules="[required, isNumber]" @keydown.enter="validRightQt"/>
                            <unit-select v-model="rightUnit" :grandeur="rightGrandeur" :rules="[required]"/>
                        </v-layout>
                    </v-form>
                    <v-btn color="primary" @click="validRightQt">Ok</v-btn>
                    <v-btn flat @click="idx--">retour</v-btn>
                </v-stepper-content>

                <v-stepper-step step="4">Confirmer</v-stepper-step>
                <v-stepper-content step="4">
                    <v-container>
                        <color-qt-unit-name :item="leftItem"/>
                        <v-list-tile>
                            <v-icon x-large>call_merge</v-icon>
                        </v-list-tile>
                        <color-qt-unit-name :item="rightItem"/>
                    </v-container>
                    <v-btn :color="isOwner ? 'primary' : 'orange'" @click="isOwner ? validate() : ''">Ok</v-btn>
                    <v-btn flat @click="idx--">retour</v-btn>
                </v-stepper-content>
            </v-stepper>
            <v-layout mt-3 row align-center justify-center v-if="!isOwner">
                <v-icon color="orange">info</v-icon>
                <v-flex ml-2>Vous ne possédez pas cet élément! Impossible de le modifier pour l'instant. <br>La fonction "suggestion de modification" n'est pas encore disponible.</v-flex>
            </v-layout>
        </v-card-text>
    </main-dialog>
</template>

<script>
    import MainDialog from "./MainDialog"
    import On from "../../const/on"
    import {mapActions, mapState} from "vuex"
    import {Dial} from "../../const/dial"
    import Destination from "../common/Destination"
    import {isNumber, required} from "../../services/rules"
    import {baseQt, getGrandeur, bqtGToQtUnit, unit, bestQuantity} from 'unit-manip'
    import UnitSelect from "../common/UnitSelect"
    import closable from "../mixin/Closable"
    import GrandeurSelect from "../common/GrandeurSelect"
    import SearchComp from "../SearchComp"
    import {createStringObjectId} from "../../services/calculations"
    import SearchCat from "../SearchCat"
    import SearchTrunk from "../SearchTrunk"
    import BasketComp from "../BasketComp"
    import Tree from "../tree/Tree"
    import TreeHead from "../tree/TreeHead"
    import ColorQtUnitName from "../common/ColorQtUnitName"

    export default {
        name: 'add-ressource-dialog',
        mixins: [closable],
        data() {
            return {
                Dial: Dial,
                idx: 1,
                qtLeftValid: null,
                qtRightValid: null,

                leftQt: null,
                leftUnit: null,
                leftGrandeur: null,

                rightQt: null,
                rightUnit: null,
                rightGrandeur: null
            }
        },
        components: {
            ColorQtUnitName,
            TreeHead,
            Tree,
            BasketComp,
            SearchTrunk,
            SearchCat,
            SearchComp,
            GrandeurSelect,
            UnitSelect,
            Destination,
            MainDialog
        },
        computed: {
            ...mapState({user: s => s.user, data: s => s.dialogs.addRessource.data}),
            left() {
                return this.data.left
            },
            right() {
                return this.data.right
            },
            searching: function () {
                return this.searchAgain || !this.selectedItem
            },
            isOwner: function () {
                return this.user && this.left && this.left.owner && this.left.owner._id && this.left.owner._id === this.user._id
            },
            leftItem: function () {
                return this.left && this.leftUnit && {color: this.left.trunk.color, qt: this.leftQt, unit: this.leftUnit.shortname, name: this.left.trunk.name}
            },
            rightItem: function () {
                return this.right && this.rightUnit && {color: this.right.trunk.color, qt: this.rightQt, unit: this.rightUnit.shortname, name: this.right.trunk.name}
            }
        },
        methods: {
            ...mapActions({
                dispatchCreateRoot: On.CREATE_ROOT,
                snack: On.SNACKBAR,
                addToBasket: On.ADD_TO_BASKET
            }),
            revert() {
                const tmp = this.left
                this.data.left = this.right
                this.data.right = tmp
            },
            validate() {
                const bqt = baseQt({qt: this.rightQt, unit: this.rightUnit}) / baseQt({qt: this.leftQt, unit: this.leftUnit})
                this.dispatchCreateRoot({
                    _id: createStringObjectId(),
                    trunkId: this.left._id,
                    rootId: this.right._id,
                    bqt
                }).then(() => {
                    this.addToBasket([this.left, this.right])
                }).catch((err) => {
                    console.log(err)
                    this.snack({text: "Cet élement n'est pas à vous!", color: "orange"})
                })
                this.close()
            },
            validLeftQt() {
                this.$refs.qtLeftForm.validate()
                if (this.qtLeftValid) {
                    this.idx++
                }
            },
            validRightQt() {
                this.$refs.qtRightForm.validate()
                if (this.qtLeftValid) {
                    this.idx++
                }
            },
            focus() {
                this.$refs.qtLeftForm.reset()
                this.$refs.qtRightForm.reset()

                this.leftGrandeur = getGrandeur(this.left.trunk.quantity.g)
                const leftQuantity = bestQuantity(bqtGToQtUnit(this.left.trunk.quantity))
                this.leftUnit = unit(leftQuantity.unit)
                this.leftQt = leftQuantity.qt

                this.rightGrandeur = getGrandeur(this.right.trunk.quantity.g)
                const rightQuantity = bestQuantity(bqtGToQtUnit(this.right.trunk.quantity))
                this.rightUnit = unit(rightQuantity.unit)
                this.rightQt = rightQuantity.qt
                this.idx = 1
            },
            required, isNumber
        }
    }
</script>