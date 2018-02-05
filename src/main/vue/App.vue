<template>
    <div id="app">
        <v-app id="blueforest" light @keydown.ctrl.space.native="focusOnSearch">

            <corner :text="'BlueForest v0.0.1'"/>

            <bar :drawer.sync="drawer"/>
            <left-menu :drawer.sync="drawer"/>

            <blueforest/>

            <Bottom-right-btns/>

            <main-footer/>


            <facet-dialog/>
            <facet-entry-dialog/>
            <create-trunk-dialog/>
            <lookup-tree-dialog/>
            <add-ressource-dialog/>

        </v-app>
    </div>
</template>

<script>

    import LeftMenu from './layout/LeftMenu';
    import Bar from "./layout/Bar";
    import BottomRightBtns from "./layout/BottomRightBtns";
    import Blueforest from "./layout/BlueForest";
    import MainFooter from "./layout/MainFooter";
    import CreateTrunkDialog from "./dialog/CreateTrunkDialog";
    import FacetEntryDialog from "./dialog/FacetEntryDialog";
    import On from "../const/on";
    import {mapActions} from "vuex";
    import Lookup from "./common/Lookup";
    import LookupTreeDialog from "./dialog/CompareToDialog";
    import Test from "./Test";
    import FacetDialog from "./dialog/FacetDialog";
    import Corner from "./layout/Corner";
    import AddRessourceDialog from "./dialog/AddRessourceDialog";

    export default {
        watch: {
            "drawer": function (value) {
                this.drawer = value;
            },
        },
        data: function () {
            return {
                drawer: false
            }
        },
        components: {
            Blueforest,
            AddRessourceDialog,
            Corner,
            FacetDialog,
            Test,
            LookupTreeDialog,
            Lookup,
            FacetEntryDialog, CreateTrunkDialog, MainFooter, BottomRightBtns, Bar, LeftMenu
        },
        mounted: async function () {
            this.$store.dispatch(On.MOUNT_APP);
        },
        methods: {
            ...mapActions({focusOnSearch: On.FOCUS_ON_SEARCH})
        }
    }
</script>