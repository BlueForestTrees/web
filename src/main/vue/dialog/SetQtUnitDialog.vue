<template>
    <main-dialog :dialog="Dial.SET_QT_UNIT" ref="dialog" :title="'Nouvelle quantité de référence'" @esc="close" @enter="validate" @focus="focus">
        <v-form v-model="valid" v-on:submit.prevent="" ref="form">
            <v-text-field label="Nom" v-model="name" required/>
            <v-text-field type="number" label="Quantité... (ex.: 10)" v-model="qt" :rules="[required, isNumber]"/>
            <unit-select v-model="unit" :grandeur="grandeur" :rules="[required]"/>
        </v-form>
    </main-dialog>
</template>

<script>
    import closable from "../mixin/Closable";
    import {isNumber, required} from "../../services/rules";
    import Destination from "../common/Destination";
    import {mapActions, mapState} from 'vuex';
    import On from "../../const/on";
    import {Dial} from "../../const/dial";
    import {getGrandeur} from 'trees-units'
    import MainDialog from "./MainDialog";
    import UnitSelect from "../common/UnitSelect";


    export default {
        name: 'set-qt-unit-dialog',
        components: {UnitSelect, MainDialog, Destination},
        mixins: [closable],
        data: function () {
            return {
                qt: null,
                unit: null,
                name: null,
                valid: null,
                Dial
            }
        },
        computed: {
            ...mapState({tree: state => state.dialogs.setQtUnit.data.tree}),
            grandeur: function () {
                return this.tree && getGrandeur(this.tree.trunk.grandeur);
            },
        },
        methods: {
            focus: function () {
                this.$refs.form.reset();
            },
            validate() {
                this.$refs.form.validate();
                if (this.valid) {
                    this.putQuantity({trunk: this.tree.trunk, quantity: {qt: this.qt, unit: this.unit.shortname}});
                    this.close();
                }
            },
            ...mapActions({
                putQuantity: On.PUT_TRUNK_QUANTITY,
            }),
            required, isNumber
        },
        watch: {
            tree: function (v) {
                this.qt = v.trunk.quantity && v.trunk.quantity.qt;
                this.unit = v.trunk.quantity && v.trunk.quantity.unit;
                this.name = v.trunk.name;
            }
        }
    }
</script>