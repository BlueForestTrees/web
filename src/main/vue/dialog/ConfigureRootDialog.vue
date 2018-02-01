<template>
    <main-dialog :dialog="Dial.CONFIGURE_ROOT" @focus="" @esc="close" @enter="validate" ref="dialog" @show="show">
        <template>
            <v-card>
                <v-card-title class="grey lighten-4 py-4 title">
                    Configurer une ressource
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md text-xs-center>
                        <v-layout row>
                            <v-flex xs12>
                                <inplace-edit :initial="initialParent.qt" @ok="parentQt" @ko=""/>
                                <inplace-unit-edit :initial="initialParent.unit" @ok="parentUnit" samegrandeur/> de {{initialParent.name}}
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12>
                                <v-icon>keyboard_arrow_up</v-icon>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12>
                                <inplace-edit :initial="initialChild.qt" @ok="childQt" @ko=""/>
                                <inplace-unit-edit :initial="initialChild.unit" @ok="childUnit" samegrandeur/> de {{initialChild.name}}
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn flat color="primary" @click="close">Annuler</v-btn>
                    <v-btn flat @click="validate">Ok</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </main-dialog>
</template>

<script>
    import MainDialog from "./MainDialog";
    import {mapGetters} from "vuex";
    import {Dial} from "../../const/dial";
    import Lookup from "../common/Lookup";
    import InplaceEdit from "../common/InplaceEdit";
    import InplaceUnitEdit from "../common/InplaceUnitEdit";

    export default {
        name: 'configure-root-dialog',
        props: ['parent', 'child'],
        data() {
            return {
                initialParent: {_id: null, qt: null, unit: null, name: null},
                initialChild: {_id: null, qt: null, unit: null, name: null},
                Dial: Dial
            }
        },
        components: {
            InplaceUnitEdit,
            InplaceEdit, Lookup, MainDialog
        },
        methods: {
            validate() {
                this.close();
            },
            close: function () {
                this.$refs.dialog.close();
            },
            parentQt(value) {
                this.initialParent.qt = value;
            },
            parentUnit(unit) {
                this.initialParent.unit = unit.shortname;
            },
            childQt(value) {
                this.initialChild.qt = value;
            },
            childUnit(unit) {
                this.initialChild.unit = unit.shortname;
            },
            show() {
                this.map(this.parent, this.initialParent);
                this.map(this.child, this.initialChild);
            },
            map(tree, initial) {
                initial._id = tree._id;
                initial.qt = tree.trunk.quantity.qt;
                initial.unit = tree.trunk.quantity.unit;
                initial.name = tree.trunk.name;
            }
        }
    }
</script>