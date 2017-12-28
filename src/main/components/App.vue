<template>
    <div id="app">
        <v-app id="blueforest">
            <main-bar :drawer.sync="drawer"></main-bar>
            <left-menu :drawer.sync="drawer"></left-menu>
            <main-content></main-content>
            <dialog-form :dialog.sync="dialog"></dialog-form>
            <floating-bar :dialog.sync="dialog"></floating-bar>
            <main-footer></main-footer>
        </v-app>
    </div>
</template>

<script>

    import LeftMenu from './LeftMenu';
    import MainBar from "./MainBar";
    import FloatingBar from "./FloatingBar";
    import DialogForm from "./Dialog";
    import MainContent from "./MainContent";
    import MainFooter from "./MainFooter";


    export default {
        name: 'app',
        watch: {
            "drawer": function (value) { this.drawer = value; },
            "dialog": function (value) { this.dialog = value; }
        },
        data: function () {
            return {
                dialog: false,
                drawer: false
            }
        },
        components: { MainFooter, MainContent, DialogForm, FloatingBar, MainBar, LeftMenu }
    }
</script>
