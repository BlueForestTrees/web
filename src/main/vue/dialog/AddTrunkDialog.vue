<template>
    <main-dialog :dialog="Dial.ADD_TRUNK" :title="'Ajouter'" @esc="close" @enter="validate" ref="dialog" @focus="focus">
        <v-card-text>
            <v-form v-model="valid" v-on:submit.prevent="" ref="form">
                <span v-if="destination">
                    <destination :tree="destination"/>
                </span>
                <span v-else>
                    <color-picker v-model="color"/>
                    <v-text-field ref="nom" label="Nom" :rules="[length2min]" required v-model="name"/>
                    <grandeur-select v-model="grandeur" label="La quantité est un(e)..."/>
                    <unit-select v-model="unit" :grandeur="grandeur" :rules="[required]"/>
                    <v-text-field type="number" label="Quantité... (ex.: 10)" v-model="qt" :rules="[required, isNumber]"/>
                </span>
            </v-form>
        </v-card-text>
    </main-dialog>
</template>

<script>
    import MainDialog from "./MainDialog";
    import On from "../../const/on";
    import {mapActions, mapState} from "vuex";
    import {Dial} from "../../const/dial";
    import closable from "../mixin/Closable";
    import GrandeurSelect from "../common/GrandeurSelect";
    import UnitSelect from "../common/UnitSelect";
    import {find} from 'lodash';
    import {getGrandeur} from 'trees-units'
    import {isNumber, length2min, required} from "../../services/rules";
    import Destination from "../common/Destination";
    import Ressources from "../tree/Ressources";
    import {getRandomColor} from "../../services/calculations";
    import ColorPicker from "../common/ColorPicker";

    export default {
        name: 'add-trunk-dialog',
        mixins: [closable],
        components: {ColorPicker, Ressources, Destination, UnitSelect, GrandeurSelect, MainDialog},
        data() {
            return {
                Dial: Dial,
                valid: false,
                color: null,
                name: null,
                grandeur: null,
                qt: null,
                unit: null
            }
        },
        computed: {
            ...mapState({destination: state => state.dialogs[Dial.ADD_TRUNK].data.tree})
        },
        methods: {
            ...mapActions({
                createTrunk: On.CREATE_TRUNK,
                putQuantity: On.PUT_TRUNK_QUANTITY
            }),
            async validate() {
                const tree = await this.createTrunk({color: this.color, name: this.name, grandeur: this.grandeur.key});
                await this.putQuantity({trunk: tree.trunk, quantity: {qt: this.qt, unit: this.unit.shortname}});
                this.close();
            },
            focus:function(){
                this.$refs.form.reset();
            },
            length2min, getRandomColor, required, isNumber
        }
    }
</script>