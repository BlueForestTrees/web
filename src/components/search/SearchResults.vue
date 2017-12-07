<template>
    <div>
        <span v-for="(trunk, i) in trunks" v-bind:key="trunk.id" @click="updateSelectedTrunkId(trunk._id)">
            {{trunk.name}}<span v-if="i !== trunks.length - 1">, </span>
        </span>
    </div>
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
            ...mapActions([Do.UPDATE_SELECTED_TRUNK_ID])
        }
    }
</script>