<template>
    <main-dialog :dialog="Dial.CONFIGURE_ROOT" @focus="" @esc="close" @enter="validate" ref="dialog">
        <template slot-scope="dialog">
            <v-card>
                <v-card-title class="grey lighten-4 py-4 title">
                    Configurer une ressource
                </v-card-title>
                <v-card-text>
                    <v-layout row>
                        <span>Pour avoir</span>{{trunk.name}}
                        <span>Il faut</span>{{root.name}}
                    </v-layout>
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
    import On from "../../const/on";
    import {mapActions} from "vuex";
    import {Dial} from "../../const/dial";
    import Lookup from "../common/Lookup";

    export default {
        name:'configure-root-dialog',
        data() {
            return {
                Dial: Dial
            }
        },
        computed:{
            trunk: function() {
                return "rr";//this.$refs.dialog.data.trunk
            },
            root: function() {
                return "tt";//this.$refs.dialog.data.root
            }
        },
        components: {Lookup, MainDialog},
        methods: {
            ...mapActions({

            }),
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