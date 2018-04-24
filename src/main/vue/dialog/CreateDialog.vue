<template>
    <v-dialog v-model="visible" fullscreen transition="dialog-bottom-transition" :overlay="false" scrollable>
        <v-card tile>
            <v-toolbar card dark color="primary">
                <v-icon>add</v-icon>
                <v-toolbar-title>Ajouter</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn icon @click.native="visible = false" dark>
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-card-text>
                Créer...
            </v-card-text>

        </v-card>
    </v-dialog>
</template>
<script>
    import {mapActions, mapState} from "vuex";
    import Lookup from "../common/Lookup";
    import On from "../../const/on";
    import QtUnit from "../common/QtUnit";

    export default {
        name: "create-dialog",
        components: {QtUnit, Lookup},
        props: ['film'],
        data() {
            return {
                term: null,
                searchResults: null,
                searching: null
            }
        },
        computed: {
            ...mapState({nav: 'nav'}),
            visible: {
                get: function () {
                    return this.$store.state.dialogs.create.visible;
                },
                set: function (value) {
                    this.$store.state.dialogs.create.visible = value;
                }
            }
        },
        methods: {
            ...mapActions({
            }),
            focus() {
            },
        },
        watch: {
            visible(value) {
                if (value) {
                    this.$nextTick(this.focus);
                }
            }
        }
    }
</script>