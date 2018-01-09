<template>
    <main-dialog :dialog="Dial.FACET" @focus="$refs.nom.focus()" @validate="validate" ref="dialog">
        <template slot-scope="props">
            <v-card-title class="grey lighten-4 py-4 title" >
                Créer une caractéristique
            </v-card-title>

            <v-text-field label="Nom" ref="nom" v-model="name" required />

            <grandeur-grid :items="grandeursKeys" @select="selectGrandeur"/>

        </template>
    </main-dialog>
</template>

<script>
    import MainDialog from "./MainDialog";
    import {On} from "../../const/on";
    import {mapActions, mapGetters, mapState} from "vuex";
    import {Dial} from "../../const/dial";
    import GrandeurGrid from "../common/GrandeurGrid";

    export default {
        data() {
            return {
                Dial: Dial,
                valid:false,
                name:null,
                grandeur:null
            }
        },
        components: {
            GrandeurGrid,
            MainDialog},
        props: ['data'],
        computed:{
            ...mapState(['grandeursKeys'])
        },
        methods: {
            selectGrandeur(grandeur){
                this.grandeur = grandeur;
            },
            ...mapGetters(['qtUnitName']),
            ...mapActions({"dispatchFacetEntity": On.CREATE_FACET}),
            validate: function () {
                this.dispatchFacetEntity({name:this.name,grandeur:this.grandeur});
            }
        }
    }
</script>