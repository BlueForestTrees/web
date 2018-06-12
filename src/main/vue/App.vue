<template>
    <div id="app">
        <v-app light>
            <left-menu/>
            <bar/>

            <v-content>
                <v-container fluid>
                    <v-layout justify-center align-center column>
                        <v-card style="width: 100%">
                        <basket/>
                        <compare v-if="basket.length === 2" :leftTree="basket[0]" :rightTree="basket[1]"/>
                        <tree v-else-if="basket.length === 1" :tree="basket[0]"/>
                        </v-card>
                    </v-layout>
                </v-container>
            </v-content>

            <AddBtn/>

            <facet-entry-dialog/>
            <impact-entry-dialog/>
            <search-dialog/>
            <add-dialog/>
            <add-ressource-dialog/>
            <add-impact-dialog/>
            <add-usage-dialog/>
            <add-facet-dialog/>

        </v-app>
    </div>
</template>

<script>

    import LeftMenu from './layout/LeftMenu';
    import Bar from "./layout/Bar";
    import FacetEntryDialog from "./dialog/FacetEntryDialog";
    import On from "../const/on";
    import Lookup from "./common/Lookup";
    import ImpactEntryDialog from "./dialog/ImpactEntryDialog";
    import ENV from "../env";
    import SearchDialog from "./dialog/SearchDialog";
    import {mapState} from 'vuex';
    import Tree from "./tree/Tree";
    import Compare from "./layout/Compare";
    import Basket from "./layout/Basket";
    import AddDialog from "./dialog/AddDialog";
    import AddBtn from "./layout/AddBtn";
    import AddImpactDialog from "./dialog/AddImpactDialog";
    import AddUsageDialog from "./dialog/AddUsageDialog";
    import AddFacetDialog from "./dialog/AddFacetDialog";
    import AddRessourceDialog from "./dialog/AddRessourceDialog";

    export default {
        data: function () {
            return {
                cornerText: "BlueForest v" + ENV.VERSION,
            }
        },
        computed: {
            ...mapState(['basket'])
        },
        components: {
            AddRessourceDialog,
            AddFacetDialog,
            AddUsageDialog,
            AddImpactDialog,
            AddBtn,
            AddDialog,
            Basket,
            Compare,
            Tree,
            SearchDialog,
            ImpactEntryDialog,
            Lookup,
            FacetEntryDialog,
            Bar,
            LeftMenu
        },
        mounted: async function () {
            await this.$store.dispatch(On.MOUNT_APP);
        }
    }
</script>