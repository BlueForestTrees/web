<template>
    <main-dialog :dialog="Dial.ADD_TRUNK" :title="'Nouveau Produit/Service'" @esc="close" @enter="validate" ref="dialog" @focus="focus">
        <v-card-text>
            <v-form v-model="valid" v-on:submit.prevent="" ref="form">
                <color-picker v-model="color"/>
                <v-layout row>
                    <v-text-field ref="nom" label="Nom" :rules="[length2min]" required v-model="name"/>
                    <v-switch :label="`Transport (1 t*km)`" v-model="transport"/>
                </v-layout>
                <span v-if="!transport">
                    <grandeur-select v-model="grandeur" label="La quantité est un(e)..."/>
                    <unit-select v-model="unit" :grandeur="grandeur" :rules="[required]"/>
                    <v-text-field type="number" label="Quantité... (ex.: 10)" v-model="qt" :rules="[required, isNumber]"/>
                </span>
            </v-form>
        </v-card-text>
    </main-dialog>
</template>

<script>
    import MainDialog from "./MainDialog"
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import {Dial} from "../../const/dial"
    import closable from "../mixin/Closable"
    import GrandeurSelect from "../common/GrandeurSelect"
    import UnitSelect from "../common/UnitSelect"
    import {getGrandeur} from 'unit-manip'
    import {isNumber, length2min, required} from "../../services/rules"
    import Ressources from "../tree/Ressources"
    import {getRandomColor} from "../../services/calculations"
    import ColorPicker from "../common/ColorPicker"

    export default {
        name: 'add-trunk-dialog',
        mixins: [closable],
        components: {ColorPicker, Ressources, UnitSelect, GrandeurSelect, MainDialog},
        data() {
            return {
                Dial: Dial,
                transport: false,
                valid: false,
                color: null,
                name: null,
                grandeur: null,
                qt: null,
                unit: null
            }
        },
        methods: {
            ...mapActions({
                createTrunk: On.CREATE_TRUNK,
                putQuantity: On.PUT_TRUNK_QUANTITY,
                goTree: On.GO_TREE
            }),
            async validate() {
                let tree
                if (this.transport) {
                    tree = await this.createTrunk({color: this.color, name: this.name, type: "TR"})
                    await this.putQuantity({trunk: tree.trunk, quantity: {qt: 1, unit: "t*km"}})
                } else {
                    tree = await this.createTrunk({color: this.color, name: this.name})
                    await this.putQuantity({trunk: tree.trunk, quantity: {qt: this.qt, unit: this.unit.shortname}})
                }
                this.close()
                this.goTree(tree)
            },
            focus:function(){
                this.$refs.form.reset()
            },
            length2min, getRandomColor, required, isNumber
        }
    }
</script>