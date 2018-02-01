<template>
    <main-dialog :dialog="Dial.CONFIGURE_ROOT" @focus="" @esc="close" @enter="validate" ref="dialog">
        <template v-if="visible" slot-scope="dialog">
            <v-card>
                <v-card-title class="grey lighten-4 py-4 title">
                    Configurer une ressource
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md text-xs-center>
                        <v-layout row>
                            <v-flex xs12>
                                {{tree.trunk.quantity.qt}}{{unitlongname(tree.trunk.quantity.unit)}} {{tree.trunk.name}}
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12>
                                <v-icon>keyboard_arrow_up</v-icon>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12>
                                {{root.trunk.quantity.qt}}{{unitlongname(root.trunk.quantity.unit)}} {{root.trunk.name}}
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
    import {mapActions, mapGetters} from "vuex";
    import {Dial} from "../../const/dial";
    import Lookup from "../common/Lookup";

    export default {
        name: 'configure-root-dialog',
        data() {
            return {
                Dial: Dial
            }
        },
        computed: {
            ...mapGetters(['dialogData', 'dialogVisible']),
            visible: function () {
                return this.dialogVisible(Dial.CONFIGURE_ROOT);
            },
            dialog: function () {
                return this.dialogData(Dial.CONFIGURE_ROOT)
            },
            tree: function () {
                return this.dialog.tree;
            },
            root: function () {
                return this.dialog.root;
            }
        },
        components: {Lookup, MainDialog},
        methods: {
            ...mapActions({}),
            validate() {
                //TODO
                this.close();
            },
            close: function () {
                this.$refs.dialog.close();
            }
        }
    }
</script>