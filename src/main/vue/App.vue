<template>
    <div id="app">
        <v-app light @keypress.native.ctrl.right="moveTab(1)" @keydown.native.ctrl.left="moveTab(-1)">
            <left-menu/>
            <bar/>

            <v-content>
                <v-container fluid>
                    <v-layout justify-center align-center>

                        <transition name="fadeInOut">
                            <tree v-if="tree && !compareTo" :tree="tree"/>
                        </transition>

                        <transition name="fadeInOut">
                            <compare v-if="tree && compareTo" :leftTree="tree" :rightTree="compareTo"/>
                        </transition>

                    </v-layout>
                </v-container>
            </v-content>

            <Bottom-right-btns/>

            <facet-entry-dialog/>
            <impact-entry-dialog/>
            <create-trunk-dialog/>
            <search-dialog/>

        </v-app>
    </div>
</template>

<script>

    import LeftMenu from './layout/LeftMenu';
    import Bar from "./layout/Bar";
    import BottomRightBtns from "./layout/BottomRightBtns";
    import CreateTrunkDialog from "./dialog/CreateTrunkDialog";
    import FacetEntryDialog from "./dialog/FacetEntryDialog";
    import On from "../const/on";
    import Lookup from "./common/Lookup";
    import ImpactEntryDialog from "./dialog/ImpactEntryDialog";
    import ENV from "../env";
    import SearchDialog from "./dialog/SearchDialog";
    import {mapState} from 'vuex';
    import Tree from "./tree/Tree";
    import Compare from "./layout/Compare";

    export default {
        data: function () {
            return {
                cornerText: "BlueForest v" + ENV.VERSION,
            }
        },
        computed: {
            ...mapState(['tree', 'compareTo'])
        },
        components: {
            Compare,
            Tree,
            SearchDialog,
            ImpactEntryDialog,
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