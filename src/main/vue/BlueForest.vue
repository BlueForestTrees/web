<template>
    <span>
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

        <add-facet-entry-dialog/>
        <add-impact-entry-dialog/>
        <search-dialog/>
        <add-trunk-dialog/>
        <add-ressource-dialog/>
        <add-impact-dialog/>
        <add-usage-dialog/>
        <add-facet-dialog/>
    </span>
</template>

<script>

    import LeftMenu from './layout/LeftMenu';
    import Bar from "./layout/Bar";
    import On from "../const/on";
    import Lookup from "./common/Lookup";
    import ENV from "../env";
    import SearchDialog from "./dialog/SearchDialog";
    import {mapState} from 'vuex';
    import Tree from "./tree/Tree";
    import Compare from "./layout/Compare";
    import Basket from "./layout/Basket";
    import AddBtn from "./layout/AddBtn";
    import AddImpactDialog from "./dialog/AddImpactDialog";
    import AddUsageDialog from "./dialog/AddUsageDialog";
    import AddFacetDialog from "./dialog/AddFacetDialog";
    import AddRessourceDialog from "./dialog/AddRessourceDialog";
    import AddFacetEntryDialog from "./dialog/AddFacetEntryDialog";
    import AddTrunkDialog from "./dialog/AddTrunkDialog";
    import AddImpactEntryDialog from "./dialog/AddImpactEntryDialog";

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
            AddImpactEntryDialog,
            AddTrunkDialog,
            AddFacetEntryDialog,
            AddRessourceDialog,
            AddFacetDialog,
            AddUsageDialog,
            AddImpactDialog,
            AddBtn,
            Basket,
            Compare,
            Tree,
            SearchDialog,
            Lookup,
            Bar,
            LeftMenu
        },
        mounted: async function () {
            await this.$store.dispatch(On.MOUNT_APP);
        }
    }
</script>