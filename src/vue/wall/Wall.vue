<template>
    <v-container class="mt-5">
        <welcome-panel class="mb-5"/>
        <filter-panel/>
        <search-result-panel @select="goAny"/>
    </v-container>
</template>

<script>
    import SearchList from "../common/SearchList"
    import WelcomePanel from "../search/WelcomePanel"
    import Icon from "../common/icon"
    import FilterPanel from "../search/FilterPanel"
    import SearchResultPanel from "../search/SearchResultPanel"

    import {mapActions} from "vuex"
    import On from "../../const/on"

    export default {
        name: "wall",
        components: {SearchResultPanel, FilterPanel, Icon, WelcomePanel, SearchList},
        methods:{
            ...mapActions({goAny: On.GO_ANY}),
        }
    }
</script>