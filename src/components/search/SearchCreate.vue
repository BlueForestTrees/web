<template>
    <button v-if='canCreate' @click='create()'>Créer {{trunk.qt?trunk.qt:'?'}}{{trunk.unit}} {{trunk.unit?'de ':''}}'{{trunk.name?trunk.name:'?'}}'</button>
</template>

<script>
    import {mapState,mapGetters, mapActions} from 'vuex';
    import {UPDATE_TERM} from "mutations";
    import * as Do from 'mutations'

    export default {
        name: "search-create",
        computed: {
            ...mapState({
                trunk:state=>state.search.inputTrunk
            }),
            ...mapGetters(['canCreate'])
        },
        methods: {
            ...mapActions([Do.CREATE])
        }
    }
</script>