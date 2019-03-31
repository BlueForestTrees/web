<template>
    <v-container class="mt-5">
        <welcome-panel class="mb-5"/>
        <v-card>
            <search-list :action="On.SEARCH_ALL">
                <template slot-scope="{item, last}">
                    <component v-bind:is="`${item.searchType}-line`" :item="item" @select="goAny"></component>
                    <v-divider v-if="!last"/>
                </template>
                <v-layout row justify-center slot="no-more">
                    <icon iconClass="blueforest logo"/>
                </v-layout>
            </search-list>
        </v-card>
    </v-container>
</template>

<script>
    import SearchList from "../common/SearchList"
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import WelcomePanel from "../search/WelcomePanel"
    import Icon from "../common/icon"

    const TrunkLine = () => import(/* webpackChunkName: "TrunkLine"*/ "./TrunkLine")
    const InfoLine = () => import(/* webpackChunkName: "InfoLine"*/ "./InfoLine")
    const GameLine = () => import(/* webpackChunkName: "GameLine"*/ "./GameLine")

    export default {
        name: "wall",
        data: () => ({On}),
        components: {Icon, WelcomePanel, TrunkLine, InfoLine, GameLine, SearchList},
        methods: {
            ...mapActions({goAny: On.GO_ANY})
        },
    }
</script>