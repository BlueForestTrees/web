<template>
    <div id="search">
        <search-input></search-input>
        <button v-if='noResults'>Créer {{term}}</button>
        <search-results></search-results>
    </div>
</template>
<script>
    import { createNamespacedHelpers } from 'vuex'
    const { mapState, mapGetters } = createNamespacedHelpers('search');
    import SearchInput from './SearchInput';
    import SearchResults from './SearchResults'

    export default {
        name: "search",
        components: {
            SearchInput, SearchResults
        },
        computed: {
            ...mapState(['term']),
            ...mapGetters(['noResults'])
        }
    }
</script>