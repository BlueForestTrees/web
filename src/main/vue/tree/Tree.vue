<template>

    <v-container grid-list-md text-xs-center>
        <v-layout row wrap>

            <v-flex xs12 d-flex><branches/></v-flex>

            <v-flex xs4 d-flex><facets :tree="tree"/></v-flex>
            <v-flex xs4 d-flex><trunk :tree="tree"/></v-flex>


            <v-flex xs4 d-flex>
                <v-layout column>
                    <impacts/>
                    <dechets/>
                </v-layout>
            </v-flex>

            <v-flex xs12 d-flex><ressources :tree="tree"/></v-flex>

            <v-flex xs12 d-flex><bilan-ressources :tree="tree"/></v-flex>

        </v-layout>
    </v-container>


</template>

<script>
    import {mapState} from 'vuex';
    import Facets from "./Facets";
    import Branches from "./Branches";
    import Impacts from "./Impacts";
    import Dechets from "./Dechets";
    import BilanRessources from "./BilanRessources";
    import Trunk from "./Trunk";
    import Ressources from "./Ressources";

    export default {
        components: {
            Ressources,
            Trunk,
            BilanRessources,
            Impacts,
            Dechets,
            Branches,
            Facets
        },
        props: ['tree'],
        computed: {
            ...mapState(['search'])
        }
    }
</script>