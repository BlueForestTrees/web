<template>
    <v-container>

        <v-tabs v-model="nav.treeTabIdx">
            <v-tab ripple>Bilan</v-tab>
            <v-tab ripple>Ressources</v-tab>
            <v-tab ripple>Description</v-tab>
            <v-tab ripple>Propriétés</v-tab>
            <v-tab ripple>Impacts</v-tab>
            <v-tab ripple>Utilisations</v-tab>
            <v-tab-item><tank :tank="tree.tank"/></v-tab-item>
            <v-tab-item><ressources :tree="tree"/></v-tab-item>
            <v-tab-item><trunk :tree="tree"/></v-tab-item>
            <v-tab-item><facets :tree="tree"/></v-tab-item>
            <v-tab-item><impacts :tree="tree"/></v-tab-item>
            <v-tab-item><branches :tree="tree"/></v-tab-item>
        </v-tabs>

        <!--<impact-dialog :tree="tree"/>-->
    </v-container>

</template>

<script>
    import {mapState} from 'vuex';
    import Facets from "./Facets";
    import Branches from "./Branches";
    import Trunk from "./Trunk";
    import Ressources from "./Ressources";
    import Tank from "./Tank";
    import Impacts from "./Impacts";
    import ImpactDialog from "../dialog/ImpactDialog";

    export default {
        components: {
            ImpactDialog,
            Impacts,
            Tank,
            Ressources,
            Trunk,
            Branches,
            Facets
        },
        props: ['tree'],
        computed: {
            ...mapState(['search', 'nav'])
        }
    }
</script>

<style>
    .container{
        padding:0px;
    }
    .invisible{
        border: black;
        background-color: transparent;
    }
</style>