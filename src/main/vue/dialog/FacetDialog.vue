<template>
    <main-dialog :dialog="Dial.FACET" @focus="$refs.qtUnitNameInput.focus()" @validate="validate" ref="dialog">
        <template slot-scope="props">
            <v-card-title class="grey lighten-4 py-4 title" >
                Ajouter une caractéristique
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
                <v-layout row wrap>
                    <v-flex xs12 align-center justify-space-between>
                        <v-layout align-center>
                            <v-avatar size="40px" class="mr-3">
                                <v-icon>assignment</v-icon>
                            </v-avatar>
                            <v-text-field ref="qtUnitNameInput" placeholder="Quantité Unité Nom (ex.: 10l eau)" @input="inputChanged"/>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-container>
        </template>
    </main-dialog>
</template>

<script>
    import MainDialog from "./MainDialog";
    import {On} from "../../const/on";
    import {mapActions, mapGetters} from "vuex";
    import {Dial} from "../../const/dial";

    export default {
        data() {
            return {
                Dial: Dial
            }
        },
        components: {MainDialog},
        props: ['data', 'tree'],
        methods: {
            ...mapGetters(['qtUnitName']),
            ...mapActions({"commitFacet": On.ADD_FACET}),
            validate: function () {
                this.commitFacet({tree:this.tree, facet:this.$refs.dialog.data});
            },
            inputChanged: function (value) {
                this.$refs.dialog.data = this.$store.getters.qtUnitName(value);
            }
        }
    }
</script>