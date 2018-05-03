<template>
    <v-container>

        <v-tabs v-model="nav.treeTabIdx">
            <v-tab ripple>Bilan Ressources</v-tab>
            <v-tab ripple>Ressources</v-tab>
            <v-tab ripple>Description</v-tab>
            <v-tab ripple>Propriétés</v-tab>
            <v-tab ripple>Impacts</v-tab>
            <v-tab ripple>Bilan Impacts</v-tab>
            <v-tab ripple>Utilisations</v-tab>
            <v-tab-item>
                <bilan-ressources :tank="tree.tank"/>
            </v-tab-item>
            <v-tab-item>
                <ressources :tree="tree"/>
            </v-tab-item>
            <v-tab-item>
                <trunk :tree="tree"/>
            </v-tab-item>
            <v-tab-item>
                <facets :tree="tree"/>
            </v-tab-item>
            <v-tab-item>
                <impacts :tree="tree"/>
            </v-tab-item>
            <v-tab-item>
                <bilan-impacts :tree="tree"/>
            </v-tab-item>
            <v-tab-item>
                <branches :tree="tree"/>
            </v-tab-item>
        </v-tabs>

    </v-container>

</template>

<script>
    import {mapState} from 'vuex';
    import Facets from "./Facets";
    import Branches from "./Branches";
    import Trunk from "./Trunk";
    import Ressources from "./Ressources";
    import Impacts from "./Impacts";
    import BilanRessources from "./BilanRessources";
    import BilanImpacts from "./BilanImpacts";

    export default {
        components: {
            BilanImpacts,
            BilanRessources,
            Impacts,
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
    .container {
        padding: 0px;
    }

    .invisible {
        border: black;
        background-color: transparent;
    }
</style>