<template>
    <span>
        <left-menu/>
        <bar/>
        <v-content style="padding-top:48px">
            <router-view></router-view>
        </v-content>

        <snack :snack="snack"/>

        <add-facet-entry-dialog/>
        <add-impact-entry-dialog/>
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
    import {mapState} from 'vuex';
    import Tree from "./tree/Tree";
    import AddImpactDialog from "./dialog/AddImpactDialog";
    import AddUsageDialog from "./dialog/AddUsageDialog";
    import AddFacetDialog from "./dialog/AddFacetDialog";
    import AddRessourceDialog from "./dialog/AddRessourceDialog";
    import AddFacetEntryDialog from "./dialog/AddFacetEntryDialog";
    import AddTrunkDialog from "./dialog/AddTrunkDialog";
    import AddImpactEntryDialog from "./dialog/AddImpactEntryDialog";
    import Snack from "./layout/snack";

    export default {
        data: function () {
            return {
                cornerText: "BlueForest v" + ENV.VERSION,
            }
        },
        computed: {
            ...mapState(['basket', 'snack'])
        },
        components: {
            Snack,
            AddImpactEntryDialog,
            AddTrunkDialog,
            AddFacetEntryDialog,
            AddRessourceDialog,
            AddFacetDialog,
            AddUsageDialog,
            AddImpactDialog,
            Tree,
            Lookup,
            Bar,
            LeftMenu
        },
        mounted: async function () {
            await this.$store.dispatch(On.MOUNT_APP);
        }
    }
</script>