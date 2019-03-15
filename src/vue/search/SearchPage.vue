<template>
    <v-flex key="search-page">
        <v-card class="elevation-4 pt-3">
            <welcome-panel/>
            <v-tabs :value="tab" @change="setTab" centered slider-color="primary">
                <v-tab href="#search"><v-list-tile-avatar class="scope-tree logo"/>Produits</v-tab>
                <v-tab href="#infos"><v-list-tile-avatar class="voice logo"/>Messages</v-tab>
                <v-tab href="#jeux"><v-list-tile-avatar class="game logo"/>Jeux</v-tab>
            </v-tabs>
        </v-card>
        <search v-if="tab==='search'" @select="goAny" class="mt-5"/>
        <my-infos v-else-if="tab==='infos'" :user="user" @select="goAny" class="mt-5"/>
        <games v-else-if="tab==='jeux'" :user="user" @select="goAny" class="mt-5"/>
    </v-flex>
</template>

<script>
    import WelcomePanel from "./WelcomePanel"
    import On from "../../const/on"
    import {mapActions, mapState, mapMutations} from "vuex"
    import Do from "../../const/do"

    const Search = () => import(/* webpackChunkName: "Search"*/ "../search/Search")
    const MyInfos = () => import(/* webpackChunkName: "MyInfos"*/ "../home/MyInfos")
    const Games = () => import(/* webpackChunkName: "Games"*/ "../jeu/Games")

    export default {
        name: "search-page",
        components: {Games, Search, MyInfos, WelcomePanel},
        methods: {
            ...mapActions({goAny: On.GO_ANY}),
            ...mapMutations({setTab: Do.SET_NAV_MAIN_TAB})
        },
        computed: {
            ...mapState({
                user: s => s.user,
                tab: s => s.nav.main.tab
            })
        },
    }
</script>