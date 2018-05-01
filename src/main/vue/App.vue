<template>
    <div id="app">
        <v-app light>
            <left-menu/>
            <bar/>
            <blueforest/>
            <Bottom-right-btns/>

            <facet-entry-dialog/>
            <impact-entry-dialog/>
            <create-trunk-dialog/>
            <lookup-tree-dialog/>
            <search-dialog/>

        </v-app>
    </div>
</template>

<script>

    import LeftMenu from './layout/LeftMenu';
    import Bar from "./layout/Bar";
    import BottomRightBtns from "./layout/BottomRightBtns";
    import Blueforest from "./layout/BlueForest";
    import CreateTrunkDialog from "./dialog/CreateTrunkDialog";
    import FacetEntryDialog from "./dialog/FacetEntryDialog";
    import On from "../const/on";
    import Lookup from "./common/Lookup";
    import LookupTreeDialog from "./dialog/CompareToDialog";
    import ImpactEntryDialog from "./dialog/ImpactEntryDialog";
    import ENV from "../env";
    import SearchDialog from "./dialog/SearchDialog";

    export default {
        data: function () {
            return {
                cornerText: "BlueForest v" + ENV.VERSION,
            }
        },
        components: {
            SearchDialog,
            ImpactEntryDialog,
            Blueforest,
            LookupTreeDialog,
            Lookup,
            FacetEntryDialog,
            CreateTrunkDialog,
            BottomRightBtns,
            Bar,
            LeftMenu
        },
        mounted: async function () {
            await this.$store.dispatch(On.MOUNT_APP);
        }
    }
</script>