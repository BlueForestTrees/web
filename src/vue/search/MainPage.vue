<template>
    <v-flex key="search-page" grid-list-md text-xs-center>
        <v-card class="elevation-4">
            <welcome-panel/>
            <v-tabs :value="tab" @change="setTab" centered slider-color="primary">
                <v-tab href="#infos">Messages</v-tab>
                <v-tab href="#search">Produits</v-tab>
            </v-tabs>
        </v-card>
        <my-infos v-if="tab==='infos'" :user="user" @select="goAny" class="mt-5"/>
        <search v-else-if="tab==='search'" @select="goAny" class="mt-5"/>
    </v-flex>
</template>

<script>
    import WelcomePanel from "./WelcomePanel"
    import On from "../../const/on"
    import {mapActions, mapState, mapMutations} from "vuex"
    import Do from "../../const/do"

    const Search = () => import(/* webpackChunkName: "MyBasket"*/ "../search/Search")
    const MySelects = () => import(/* webpackChunkName: "MySelects"*/ "../home/MySelects")
    const MyInfos = () => import(/* webpackChunkName: "MyInfos"*/ "../home/MyInfos")

    export default {
        name: "search-page",
        components: {Search, MySelects, MyInfos, WelcomePanel},
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