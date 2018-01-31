<template>
        <v-container grid-list-md text-xs-center>
            <v-layout row wrap>

                <v-flex xs12 d-flex><branches/></v-flex>

                <v-flex xs4 d-flex><facets :facets="tree.facets"/></v-flex>
                <v-flex xs4 d-flex><trunk :trunk="tree.trunk"/></v-flex>

                <v-flex xs4 d-flex><externalites/></v-flex>

                <v-flex xs12 d-flex><ressources v-if="tree" :tree="tree"/></v-flex>

                <v-flex xs12 d-flex><bilan-ressources :tree="tree"/></v-flex>

            </v-layout>
        </v-container>

</template>

<script>
    import {mapState} from 'vuex';
    import Facets from "./Facets";
    import Branches from "./Branches";
    import Externalites from "./Externalites";
    import BilanRessources from "./BilanRessources";
    import Trunk from "./Trunk";
    import Ressources from "./Ressources";

    export default {
        components: {
            Ressources,
            Trunk,
            BilanRessources,
            Externalites,
            Branches,
            Facets
        },
        props: ['tree'],
        computed: {
            ...mapState(['search'])
        }
    }
</script>

<style>
    .air {
        margin: 1em
    }
</style>