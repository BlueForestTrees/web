<template>
    <search-list :ps="20" :action="On.SEARCH_ALL" :filter="filter" empty-search>
        <template slot-scope="{item, last}">
            <component v-bind:is="`${item.searchType}-line`" :item="item" @select="select"></component>
            <v-divider v-if="!last"/>
        </template>
        <v-layout row justify-center slot="no-more">
            <icon iconClass="blueforest logo"/>
        </v-layout>
    </search-list>
</template>

<script>
    import {mapGetters} from "vuex"
    import SearchList from "../common/SearchList"
    import Icon from "../common/icon"
    import On from "../../const/on"

    const TrunkLine = () => import(/* webpackChunkName: "TrunkLine"*/ "./TrunkLine")
    const InfoLine = () => import(/* webpackChunkName: "InfoLine"*/ "./InfoLine")
    const GameLine = () => import(/* webpackChunkName: "GameLine"*/ "./GameLine")

    export default {
        name: "SearchResultPanel",
        components: {Icon, SearchList, TrunkLine, GameLine, InfoLine},
        data: () => ({On}),
        computed: {
            ...mapGetters(['filter'])
        },
        methods: {
            select(item) {
                this.$emit("select", item)
            }
        }
    }
</script>