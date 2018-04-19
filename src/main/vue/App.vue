<template>
    <div id="app">
        <v-app id="blueforest" light>
            <corner :text="cornerText"/>
            <bar :drawer.sync="drawer"/>
            <left-menu :drawer.sync="drawer"/>
            <blueforest/>
            <Bottom-right-btns/>

            <facet-entry-dialog/>
            <impact-entry-dialog/>
            <create-trunk-dialog/>
            <lookup-tree-dialog/>

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
    import Corner from "./layout/Corner";
    import ImpactEntryDialog from "./dialog/ImpactEntryDialog";
    import ENV from "../env";

    export default {
        watch: {
            "drawer": function (value) {
                this.drawer = value;
            },
        },
        data: function () {
            return {
                drawer: false,
                cornerText: "BlueForest v" + ENV.VERSION,
            }
        },
        components: {
            ImpactEntryDialog,
            Blueforest, Corner, LookupTreeDialog, Lookup, FacetEntryDialog, CreateTrunkDialog, BottomRightBtns, Bar, LeftMenu
        },
        mounted: async function () {
            await this.$store.dispatch(On.MOUNT_APP);
        }
    }
</script>