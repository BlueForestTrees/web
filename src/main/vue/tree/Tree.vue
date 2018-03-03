<template>
        <v-container grid-list-md text-xs-center>

            <v-layout row wrap>
                <v-flex xs12 d-flex><branches :tree="tree"/></v-flex>
                <v-flex xs4 d-flex><facets :facets="tree.facets"/></v-flex>
                <v-flex xs4 d-flex><trunk :trunk="tree.trunk"/></v-flex>
                <v-flex xs4 d-flex><impacts :tree="tree"/></v-flex>
                <v-flex xs12 d-flex><ressources :tree="tree"/></v-flex>
                <v-flex xs12 d-flex><tank :tree="tree"/></v-flex>
            </v-layout>

            <facet-dialog :tree="tree"/>
            <impact-dialog :tree="tree"/>
            <add-item-dialog />
            <configure-link-dialog/>

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

    export default {
        components: {
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

<style>
    .air {
        margin: 2em
    }
</style>