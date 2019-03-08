<template>
    <action-bar v-if="$vuetify.breakpoint.xsOnly"/>
    <v-toolbar v-else dense app class="elevation-0" style='background-color:#FFFFFFBB'>
        <v-toolbar-side-icon @click="nav.leftMenuVisible = !nav.leftMenuVisible"></v-toolbar-side-icon>
        <v-spacer/>

        <v-btn icon :to="{name: GO.SEARCH}"><v-icon color="primary">home</v-icon></v-btn>

        <logged-in/>
    </v-toolbar>


</template>

<script>
    import {mapActions, mapState} from "vuex"
    import On from "../../const/on"
    import {GO} from "../../const/go"
    import LoginSuscribeList from "./LoginSuscribeList"

    import LoggedIn from "../user/LoggedIn"
    import WelcomePanel from "../search/WelcomePanel"
    import ActionBar from "./ActionBar"

    export default {
        data: () => ({GO}),
        components: {
            ActionBar,
            WelcomePanel,
            LoggedIn,
            LoginSuscribeList
        },
        computed: {
            ...mapState(['nav', 'tree', 'user'])
        },
        methods: {
            go: function (p) {
                this.$router.push(p)
            },
            ...mapActions({
                goSearch: On.GO_SEARCH,
                goTree: On.GO_TREE,
                goHome: On.GO_HOME,
                showDialog: On.SHOW_DIALOG,
                goEquiv: On.GO_EQUIV,
                goQuiDeuxFoisPlus: On.GO_QUI_DEUX_FOIS_PLUS
            })
        }
    }
</script>

<style>
    .v-tabs__container {
        padding-left: 0px;
    }
</style>