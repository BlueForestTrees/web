<template>
        <v-container grid-list-md text-xs-center>

            <v-layout row wrap>
                <v-flex xs4 d-flex><trunk :trunk="tree.trunk"/></v-flex>
            </v-layout>


        </v-container>
</template>

<script>
    import {mapState} from 'vuex';
    import Facets from "./Facets";
    import Branches from "./Branches";
    import Trunk from "./Trunk";
    import Ressources from "./Ressources";
    import Tank from "./Tank";
    import FacetDialog from "../dialog/FacetDialog";
    import Impacts from "./Impacts";
    import ImpactDialog from "../dialog/ImpactDialog";
    import AddItemDialog from "../dialog/AddItemDialog";
    import ConfigureLinkDialog from "../dialog/ConfigureLinkDialog";
    import NewList from "./NewList";

    export default {
        components: {
            NewList,
            ConfigureLinkDialog,
            AddItemDialog,
            ImpactDialog,
            Impacts,
            FacetDialog,
            Tank,
            Ressources,
            Trunk,
            Branches,
            Facets
        },
        props: ['tree'],
        computed: {
            ...mapState(['search'])
        }
    }
</script>