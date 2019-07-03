<template>
    <v-menu class="full-width">
        <subpage-title slot="activator" title="Filtrer..." icon="filter_list" sub />
        <filters-bar @input="showPanel"/>
    </v-menu>
</template>

<script>
    import FiltersBar from "./FiltersBar"
    import Do from "../../const/do"
    import {mapMutations} from "vuex"
    import SubpageTitle from "../tree/SubpageTitle"

    export default {
        name: "FiltersMenu",
        components: {SubpageTitle, FiltersBar},
        methods: {
            ...mapMutations({
                showPanel: Do.SHOW_SEARCH_PANEL
            }),
        }
    }
</script>

<style scoped>

</style>