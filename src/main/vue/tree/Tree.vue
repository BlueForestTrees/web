<template>
    <v-container grid-list-md text-xs-center>

        <v-tabs v-model="nav.tabs">
            <v-tab ripple>Bilan</v-tab>
            <v-tab ripple>Ressources</v-tab>
            <v-tab ripple>Description</v-tab>
            <v-tab ripple>Propriétés</v-tab>
            <v-tab ripple>Impacts</v-tab>
            <v-tab ripple>Utilisations</v-tab>
            <v-tab-item><tank :tank="tree.tank"/></v-tab-item>
            <v-tab-item><ressources :tree="tree"/></v-tab-item>
            <v-tab-item><trunk :trunk="tree.trunk"/></v-tab-item>
            <v-tab-item><facets :facets="tree.facets"/></v-tab-item>
            <v-tab-item><impacts :impacts="tree.impacts"/></v-tab-item>
            <v-tab-item><branches :tree="tree"/></v-tab-item>
        </v-tabs>

        <!--<impact-dialog :tree="tree"/>-->
        <!--<configure-link-dialog/>-->
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
    import ConfigureLinkDialog from "../dialog/ConfigureLinkDialog";
    import CreateDialog from "../dialog/CreateDialog";

    export default {
        components: {
            CreateDialog,
            ConfigureLinkDialog,
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