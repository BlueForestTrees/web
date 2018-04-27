<template>
    <main-dialog :dialog="Dial.FACET_ENTRY" ref="dialog" :title="'Nouveau type de propriété'" :icon="'add'"
                 @esc="close" @enter="validate" @focus="clear">
        <template slot-scope="props">
            <v-card>
                <v-card-text>
                    <v-container fluid>
                        <v-layout row>
                            <v-text-field label="Nom du type de propriété" required v-model="name"/>
                        </v-layout>
                        <v-layout row>
                            <grandeur-select v-model="grandeur"/>
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
    import On from "../../const/on";
    import {mapActions} from "vuex";
    import {Dial} from "../../const/dial";
    import GrandeurSelect from "../common/GrandeurSelect";

    export default {
        data() {
            return {
                Dial: Dial,
                valid: false,
                name: null,
                grandeur: null
            }
        },
        components: {
            GrandeurSelect,
            MainDialog
        },
        props: ['data'],
        methods: {
            ...mapActions({"createFacetEntry": On.CREATE_FACET_ENTRY}),
            validate: function () {
                this.createFacetEntry({name: this.name, grandeur: this.grandeur.key});
                this.close();
            },
            close: function () {
                this.$refs.dialog.close();
            },
            clear: function () {
                this.name = null;
                this.grandeur = null;
            }
        }
    }
</script>