<template>
    <ol>
        <li v-for="trunk in trunks" v-bind:key="trunk.id">
            {{ trunk._id }}: {{trunk.name}} ({{trunk.qt}}{{trunk.unit}})
        </li>
    </ol>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    const {mapState} = createNamespacedHelpers('search');

    export default {
        name: "search-results",
        computed: {
            ...mapState({
                'trunks': state => state.results
            })
        }
    }
</script>