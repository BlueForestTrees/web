<template>
    <main-dialog :dialog="Dial.RESSOURCE" @focus="$refs.nom.focus()" @esc="close" @enter="validate" ref="dialog">
        <template slot-scope="dialog">
            <v-card>
                <v-card-title class="grey lighten-4 py-4 title">
                    Ajouter des ressources à {{dialog.data.parentRessource && dialog.data.parentRessource.name}}
                </v-card-title>
                <v-card-text>

                    <v-chip v-for="(ressource,idx) in ressources" :key="ressource._id" close @input="unselect(idx)">
                        {{ressource.name}}
                    </v-chip>

                    <lookup @select="select" cancreate/>
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
        data() {
            return {
                Dial: Dial,
                ressources: []
            }
        },
        components: {
            Lookup,
            MainDialog},
        props: ['data'],
        methods: {
            ...mapActions({
                "addRessource": On.ADD_RESSOURCE
            }),
            select(ressource){
                this.ressources.push(ressource);
            },
            unselect(idx){
                this.ressources.splice(idx,1);
            },
            validate() {
                this.addRessource(this.dialog.data.parentRessource, this.ressource);
            },
            close: function () {
                this.$refs.dialog.close();
            }
        }
    }
</script>