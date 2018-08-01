<template>
    <main-dialog :dialog="Dial.SET_QT_UNIT" ref="dialog" :title="'Nouvelle quantité de référence'" @esc="close" @enter="validate">
        <v-card-text>
            <v-form v-model="valid" v-on:submit.prevent="" ref="form">
                <v-text-field label="Nom" v-model="name" required disabled/>
                <grandeur-select v-model="grandeur" disabled/>
                <v-text-field type="number" label="Quantité... (ex.: 10)" v-model="qt" :rules="[required, isNumber]"/>
                <unit-select v-model="unit" :grandeur="grandeur" :rules="[required]"/>
            </v-form>
        </v-card-text>
    </main-dialog>
</template>

<script>
    import closable from "../mixin/Closable"
    import {isNumber, required} from "../../services/rules"
    import Destination from "../common/Destination"
    import {mapActions, mapState} from 'vuex'
    import On from "../../const/on"
    import {Dial} from "../../const/dial"
    import {getGrandeur, unit} from 'unit-manip'
    import MainDialog from "./MainDialog"
    import UnitSelect from "../common/UnitSelect"
    import GrandeurSelect from "../common/GrandeurSelect"


    export default {
        name: 'set-qt-unit-dialog',
        components: {GrandeurSelect, UnitSelect, MainDialog, Destination},
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
                return this.tree && getGrandeur(this.tree.trunk.grandeur)
            },
        },
        methods: {
            validate() {
                this.$refs.form.validate()
                if (this.valid) {
                    this.putQuantity({trunk: this.tree.trunk, quantity: {qt: this.qt, unit: this.unit.shortname}})
                    this.close()
                }
            },
            ...mapActions({
                putQuantity: On.PUT_TRUNK_QUANTITY,
            }),
            required, isNumber
        },
        watch: {
            tree: function (v) {
                this.qt = v.trunk.quantity && v.trunk.quantity.qt
                this.unit = v.trunk.quantity && unit(v.trunk.quantity.unit)
                this.name = v.trunk.name
            }
        }
    }
</script>