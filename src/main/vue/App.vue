<template>
    <div id="app">
        <v-app id="blueforest" light @keydown.ctrl.space.native="focusOnSearch">

            <corner :text="'DEMO NWX'"/>

            <bar :drawer.sync="drawer" />
            <left-menu :drawer.sync="drawer"/>
            <main-content/>
            <floating-button/>
            <!--<main-footer/>-->

            <facet-dialog :tree="tree"/>
            <facet-entry-dialog :visible="facetEntryDialog"/>
            <trunk-dialog />
            <lookup-tree-dialog/>

        </v-app>
    </div>
</template>

<script>

    import LeftMenu from './layout/LeftMenu';
    import Bar from "./layout/Bar";
    import FloatingButton from "./layout/FloatingButton";
    import MainContent from "./layout/MainContent";
    import MainFooter from "./layout/MainFooter";
    import TrunkDialog from "./dialog/TrunkDialog";
    import {mapState} from 'vuex';
    import FacetEntryDialog from "./dialog/FacetEntryDialog";
    import On from "../const/on";
    import {mapActions} from "vuex";
    import Lookup from "./common/Lookup";
    import LookupTreeDialog from "./dialog/CompareToDialog";
    import Test from "./Test";
    import FacetDialog from "./dialog/FacetDialog";
    import Corner from "./layout/Corner";

    export default {
        computed: {
            ...mapState({
                "trunkDialog": state => state.dialogs.trunk,
                "facetEntryDialog":state=>state.dialogs2.facetEntryDialog.visible,
                "tree":state=>state.tree
            })
        },
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
            Corner,
            FacetDialog,
            Test,
            LookupTreeDialog,
            Lookup,
            FacetEntryDialog,TrunkDialog,MainFooter, MainContent, FloatingButton, Bar, LeftMenu
        },
        mounted: async function(){
            this.$store.dispatch(On.MOUNT_APP);
        },
        methods: {
            ...mapActions({focusOnSearch:On.FOCUS_ON_SEARCH})
        }
    }
</script>