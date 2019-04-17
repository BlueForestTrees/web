<template>
    <v-container class="mt-5">
        <welcome-panel class="mb-5"/>
        <filters-bar/>
        <filters-panel />
        <search-result-panel @select="goAny"/>
    </v-container>
</template>

<script>
    import SearchList from "../common/SearchList"
    import WelcomePanel from "../search/WelcomePanel"
    import Icon from "../common/icon"
    import FiltersBar from "../search/FiltersBar"
    import SearchResultPanel from "../search/SearchResultPanel"

    import {mapActions} from "vuex"
    import On from "../../const/on"
    import FiltersPanel from "../search/FiltersPanel"

    export default {
        name: "wall",
        components: {FiltersPanel, SearchResultPanel, FiltersBar, Icon, WelcomePanel, SearchList},
        methods:{
            ...mapActions({goAny: On.GO_ANY}),
        }
    }
</script>