<template>
    <v-card style="cursor: default;padding-right: 1em;padding-left: 1em">

        <h1 style="margin-bottom: 1em">{{tree.name}}</h1>


        <div v-if="qt.editing" style="margin-top: 1em;margin-left: 1em">
            <v-layout row>
                <v-text-field label="quantité unité (ex.: 10g)" autofocus :value="qt.input && (qt.input.qt + qt.input.unit)" @input="qtInput"
                              @keydown.esc.native="qt.editing = false" @keydown.enter.native="validateQuantity"/>
                <v-icon right color="green" @click="validateQuantity">done</v-icon>
                <v-icon right color="red" @click="qt.editing = false">clear</v-icon>
            </v-layout>
            <unit-grid v-if="qt.input && qt.input.unit" :filter="qt.input && qt.input.unit" @select="unitInput"/>
        </div>
        <div v-else-if="tree.quantity" style="margin-top: 1em;margin-left: 1em">
            <v-layout row align-center>
                <span style="color:rgba(0,0,0,.54);">Quantité</span>
                <v-spacer/>
                <span>{{tree.quantity.qt}}{{tree.quantity.unit}}</span>
                <v-spacer/>
                <v-btn fab small outline @click="editingQt" color="primary">
                    <v-icon>edit</v-icon>
                </v-btn>
            </v-layout>
        </div>
        <span v-else>
            <v-btn @click="qt.editing = true" color="primary">
                Définir la quantité<v-icon right>edit</v-icon>
            </v-btn>
        </span>


        <div v-if="price.editing" style="margin-top: 1em;margin-left: 1em">
            <v-layout row>
                <v-text-field label="Prix" prefix="€" autofocus :value="tree.price" @input="prixInput"
                              @keydown.esc.native="price.editing = false" @keydown.enter.native="validatePrice"/>
                <v-icon right color="green" @click="validatePrice">done</v-icon>
                <v-icon right color="red" @click="price.editing = false">clear</v-icon>
            </v-layout>
        </div>
        <div v-else-if="tree.price" style="margin-top: 1em;margin-left: 1em">
            <v-layout row align-center>
                <span style="color:rgba(0,0,0,.54);">Prix</span>
                <v-spacer/>
                <span>{{tree.price}}€</span>
                <v-spacer/>
                <v-btn fab small outline @click="price.editing = true" color="primary">
                  <v-icon>edit</v-icon>
                </v-btn>
            </v-layout>
        </div>
        <span v-else>
            <v-btn @click="price.editing = true" color="primary">
                Définir le prix<v-icon right>edit</v-icon>
            </v-btn>
        </span>







    </v-card>
</template>

<script>
    import {mapActions} from 'vuex';
    import UnitGrid from "../common/UnitGrid";
    import {On} from "../../const/on";
    import {toQtUnit} from "../../services/mapper";

    export default {
        components: {UnitGrid},
        props: ['tree'],
        data() {
            return {

                qt: {
                    editing: false,
                    valued: false,
                    input: null
                },
                price: {
                    editing: false,
                    valued: false,
                    input: null
                },

                qtUnitTyped: null
            }
        },
        methods: {
            ...mapActions([On.UPSERT_PRICE, On.UPSERT_QUANTITY]),
            qtInput(value) {
                 this.qt.input = toQtUnit(value);
            },
            unitInput(value){
                this.qt.input.unit = value.shortname;
                this.validateQuantity();
            },
            prixInput(value) {
                this.price.input = parseFloat(value.replace(',','.'));
            },
            validatePrice() {
                this.upsertPrice({tree: this.tree, price: this.price.input});
                this.price.editing = false;
            },
            validateQuantity() {
                this.upsertQuantity({tree: this.tree, quantity: this.qt.input});
                this.qt.editing = false;
            },
            editingQt(){
                this.qt.editing = true;
                if(this.tree.quantity){
                    this.qt.input = this.tree.quantity;
                }
            }
        }
    }
</script>