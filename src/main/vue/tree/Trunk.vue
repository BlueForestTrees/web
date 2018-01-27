<template>
    <v-card>

        <v-toolbar>
            <v-toolbar-title style="width:100%">
                <span v-if="!name.editing" @click="activateRenaming">{{tree.name.toUpperCase()}}</span>
                <v-layout row v-else style="margin-left: 1em">
                    <v-text-field ref="renamingInput" :value="tree.name" @input="name.input = $event" @keydown.esc.native="unactivateRemaning" @keydown.enter.native="validateRenaming"/>
                    <v-icon right color="green" @click="validateRenaming">done</v-icon>
                    <v-icon right color="red" @click="unactivateRemaning">clear</v-icon>
                </v-layout>
            </v-toolbar-title>
        </v-toolbar>


        <div v-if="qt.editing" class="air">
            <v-layout row>
                <v-text-field label="quantité unité (ex.: 10g)" autofocus :value="qt.input && (qt.input.qt + qt.input.unit)" @input="qtInput"
                              @keydown.esc.native="qt.editing = false" @keydown.enter.native="validateQuantity"/>
                <v-icon right color="green" @click="validateQuantity">done</v-icon>
                <v-icon right color="red" @click="qt.editing = false">clear</v-icon>
            </v-layout>
            <unit-grid v-if="qt.input && qt.input.unit" :filter="qt.input && qt.input.unit" :grandeurs="grandeurs" @select="unitInput"/>
        </div>
        <div v-else-if="tree.quantity" class="air">
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

    </v-card>
</template>

<script>
    import {mapActions, mapState} from 'vuex';
    import UnitGrid from "../common/UnitGrid";
    import On from "../../const/on";
    import {toQtUnit} from "../../services/mapper";

    export default {
        components: {UnitGrid},
        props: ['tree'],
        computed:{
            ...mapState(['grandeurs'])
        },
        data() {
            return {
                name: {
                    editing: false,
                    input: null
                },
                qt: {
                    editing: false,
                    valued: false,
                    input: null
                },
                qtUnitTyped: null
            }
        },
        methods: {
            activateRenaming(){
                this.name.editing = true;
                this.$nextTick(()=>this.$refs.renamingInput.focus());
            },
            unactivateRemaning(){
                this.name.editing = false;
            },
            validateRenaming(){
                this.renameTree({tree:this.tree, name:this.name.input.trim()});
                this.unactivateRemaning();
            },
            ...mapActions([On.UPSERT_QUANTITY, On.RENAME_TREE]),
            qtInput(value) {
                 this.qt.input = toQtUnit(value);
            },
            unitInput(value){
                this.qt.input.unit = value.shortname;
                this.validateQuantity();
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