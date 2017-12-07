<template>
    <div id="search" v-if="trunkIsSelected">
        <search-input></search-input>
        <search-create></search-create>
        <search-results></search-results>
    </div>
</template>
<script>
    import {mapState, mapGetters} from 'vuex';
    import SearchInput from './SearchInput';
    import SearchResults from './SearchResults';
    import SearchCreate from './SearchCreate';

    export default {
        name: "search",
        components: {
            SearchInput, SearchResults, SearchCreate
        },
        computed: {
            ...mapState({
                term: state => state.search.term,
                trunkIsSelected : state => !state.selectedTrunk
            }),
            ...mapGetters(['canCreate'])
        }
    }
</script>