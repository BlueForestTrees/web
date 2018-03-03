<template>
    <main-dialog :dialog="CONFIGURE_LINK" ref="dialog"
                 @show="show" @enter="ok" @esc="close"
    >
        <template>
            <v-card>
                <v-card-title class="grey lighten-4 py-4 title">
                    Configurer
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md text-xs-center>
                        <v-layout row>
                            <v-flex xs12>
                                <inplace-edit :initial="leftConfig.qt" @ok="parentQt" @ko=""/>
                                <inplace-unit-edit :initial="leftConfig.unit" @ok="parentUnit" samegrandeur/>
                                de {{leftConfig.name}}
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12>
                                <v-icon large>keyboard_arrow_up</v-icon>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12>
                                <inplace-edit :initial="rightConfig.qt" @ok="childQt" @ko=""/>
                                <inplace-unit-edit :initial="rightConfig.unit" @ok="childUnit" samegrandeur/>
                                de {{rightConfig.name}}
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn flat @click="close">Annuler</v-btn>
                    <v-btn flat @click="ok">Ok</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </main-dialog>
</template>

<script>
    import MainDialog from "./MainDialog";
    import {mapActions} from "vuex";
    import {Dial} from "../../const/dial";
    import Lookup from "../common/Lookup";
    import InplaceEdit from "../common/InplaceEdit";
    import InplaceUnitEdit from "../common/InplaceUnitEdit";
    import On from "../../const/on";

    export default {
        name: 'configure-link-dialog',
        components: {
            InplaceUnitEdit, InplaceEdit, Lookup, MainDialog
        },
        data() {
            return {
                leftConfig: {qt: null, unit: null, name: null},
                rightConfig: {qt: null, unit: null, name: null},
                CONFIGURE_LINK: Dial.CONFIGURE_LINK
            }
        },
        computed: {
            left: function () {
                return this.$refs.dialog.data.left;
            },
            right: function () {
                return this.$refs.dialog.data.right;
            }
        },
        methods: {
            show() {
                this.initConfig(this.leftConfig, this.left);
                this.initConfig(this.rightConfig, this.right);
            },
            initConfig(config, tree) {
                config.qt = tree.trunk.quantity && tree.trunk.quantity.qt;
                config.unit = tree.trunk.quantity && tree.trunk.quantity.unit;
                config.name = tree.trunk.name;
            },

            parentQt(value) {
                this.leftConfig.qt = value;
            },
            parentUnit(unit) {
                this.leftConfig.unit = unit.shortname;
            },
            childQt(value) {
                this.rightConfig.qt = value;
            },
            childUnit(unit) {
                this.rightConfig.unit = unit.shortname;
            },

            async ok() {
                await this.dispatchConfigureLink({
                    left: this.left,
                    right: this.right,
                    config: {
                        left: {_id: this.left._id, quantity: this.leftConfig},
                        right: {_id: this.right._id, quantity: this.rightConfig}
                    }
                });
                this.close();
            },
            close: function () {
                this.$refs.dialog.close();
            },
            ...mapActions({dispatchConfigureLink: On.CONFIGURE_LINK})
        }
    }
</script>
