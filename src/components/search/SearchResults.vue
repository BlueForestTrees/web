<template>
    <ol>
        <li v-for="trunk in trunks" v-bind:key="trunk.id" @click="changeSelectedTrunkId(trunk._id)">
            {{trunk.name}}
        </li>
    </ol>
</template>

<script>
    import * as Do from 'mutations'
    import {mapState, mapActions} from 'vuex';

    export default {
        name: "search-results",
        computed: {
            ...mapState({
                'trunks': state => state.search.results
            })
        },
        methods: {
            ...mapActions([Do.CHANGE_SELECTED_TRUNK_ID])
        }
    }
</script>