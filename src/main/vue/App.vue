<template>
    <div id="app">
        <v-app id="blueforest" @keydown.ctrl.space.native="focusOnSearch">

            <bar :drawer.sync="drawer" />
            <left-menu :drawer.sync="drawer"/>
            <main-content/>
            <floating-button/>
            <main-footer/>
            <trunk-dialog />
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
    import FacetDialog from "./dialog/FacetDialog";
    import {On} from "../store/keys";
    import {mapActions} from "vuex";

    export default {
        name: 'app',
        computed: {
            ...mapState({
                "trunkDialog": state => state.dialogs.trunk
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
            FacetDialog,TrunkDialog,MainFooter, MainContent, FloatingButton, Bar, LeftMenu
        },
        mounted: async function(){
            this.$store.dispatch(On.MOUNT_APP);
        },
        methods: {
            ...mapActions({focusOnSearch:On.FOCUS_ON_SEARCH})
        }
    }
</script>
