<template>
    <button v-if='canCreate' @click='create(term)'>Créer {{term}}</button>
</template>

<script>
    import {mapState,mapGetters, mapActions} from 'vuex';
    import {CHANGE_TERM} from "mutations";
    import * as Do from 'mutations'

    export default {
        name: "search-create",
        computed: {
            ...mapState({
                term:state=>state.search.term
            }),
            ...mapGetters(['canCreate'])
        },
        methods: {
            ...mapActions([Do.CREATE])
        }
    }
</script>