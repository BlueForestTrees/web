<template>

    <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card  >
                    <v-card-text class="px-3">
                        <branches/>
                    </v-card-text>
                </v-card>
            </v-flex>




            <v-flex xs4>
                <v-card  >
                    <v-card-text class="px-0">
                        <facets :tree="tree"/>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs4>
                <v-card  >
                    <v-card-text class="px-0">
                        <trunk :tree="tree"/>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs4>
                <v-card  >
                    <v-card-text class="px-0">
                        <impacts/>
                    </v-card-text>
                </v-card>
            </v-flex>






            <v-flex xs12>
                <v-card  >
                    <v-card-text class="px-0">
                        <ressources/>
                    </v-card-text>
                </v-card>
            </v-flex>

            <v-flex xs12>
                <v-card  >
                    <v-card-text class="px-0">
                        <bilan-ressources/>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>


</template>

<script>
    import {mapState} from 'vuex';
    import Facets from "./Facets";
    import Branches from "./Branches";
    import Impacts from "./Impacts";
    import BilanRessources from "./BilanRessources";
    import Trunk from "./Trunk";
    import Ressources from "./Ressources";

    export default {
        components: {
            Ressources,
            Trunk,
            BilanRessources,
            Impacts,
            Branches,
            Facets
        },
        name: 'tree',
        props: ['tree'],
        computed: {
            ...mapState(['search'])
        }
    }
</script>