<template>
    <div id="app">
        <v-app id="blueforest">
            <main-bar :drawer.sync="drawer"></main-bar>
            <left-menu :drawer.sync="drawer"></left-menu>
            <main-content></main-content>
            <create-dialog :data="create"></create-dialog>
            <floating-bar></floating-bar>
            <main-footer></main-footer>
        </v-app>
    </div>
</template>

<script>

    import LeftMenu from './LeftMenu';
    import MainBar from "./MainBar";
    import FloatingBar from "./FloatingBar";
    import MainContent from "./MainContent";
    import MainFooter from "./MainFooter";
    import CreateDialog from "./dialog/CreateDialog";
    import {mapState} from 'vuex';

    export default {
        name: 'app',
        computed: {
            ...mapState({
                "create": state => state.dialogs.create
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
            CreateDialog,
            MainFooter, MainContent, FloatingBar, MainBar, LeftMenu
        }
    }
</script>
