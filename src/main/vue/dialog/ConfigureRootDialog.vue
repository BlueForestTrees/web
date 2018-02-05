<template>
    <main-dialog :dialog="Dial.CONFIGURE_ROOT" @focus="" @esc="close" @enter="ok" ref="dialog" @show="show">
        <template>
            <v-card>
                <v-card-title class="grey lighten-4 py-4 title">
                    Configurer une ressource
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md text-xs-center>
                        <v-layout row>
                            <v-flex xs12>
                                <inplace-edit :initial="trunkConfig.qt" @ok="parentQt" @ko=""/>
                                <inplace-unit-edit :initial="trunkConfig.unit" @ok="parentUnit" samegrandeur/>
                                de {{trunkConfig.name}}
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12>
                                <v-icon>keyboard_arrow_up</v-icon>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12>
                                <inplace-edit :initial="rootConfig.qt" @ok="childQt" @ko=""/>
                                <inplace-unit-edit :initial="rootConfig.unit" @ok="childUnit" samegrandeur/>
                                de {{rootConfig.name}}
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn flat color="primary" @click="close">Annuler</v-btn>
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
        name: 'configure-root-dialog',
        props: ['trunk', 'root'],
        data() {
            return {
                trunkConfig: {qt: null, unit: null},
                rootConfig: {qt: null, unit: null},
                Dial: Dial
            }
        },
        components: {
            InplaceUnitEdit,
            InplaceEdit, Lookup, MainDialog
        },
        methods: {
            ...mapActions({dispatchConfigureRoot: On.CONFIGURE_ROOT}),
            async ok() {
                await this.dispatchConfigureRoot({
                    trunk: this.trunk,
                    root: this.root,
                    config: {
                        trunk: this.trunkConfig,
                        root: this.rootConfig
                    }
                });
                this.close();
            },
            close: function () {
                this.$refs.dialog.close();
            },
            parentQt(value) {
                this.trunkConfig.qt = value;
            },
            parentUnit(unit) {
                this.trunkConfig.unit = unit.shortname;
            },
            childQt(value) {
                this.rootConfig.qt = value;
            },
            childUnit(unit) {
                this.rootConfig.unit = unit.shortname;
            },
            show() {
                this.initConfig(this.trunkConfig, this.trunk);
                this.initConfig(this.rootConfig, this.root);
            },
            initConfig(config, tree) {
                config._id = tree._id;
                config.qt = tree.trunk.quantity.qt;
                config.unit = tree.trunk.quantity.unit;
                config.name = tree.trunk.name;
            }
        }
    }
</script>