<template>
    <v-container fluid fill-height>
        <v-layout justify-center align-center>

            <tree v-if="tree" :tree="tree"/>

        </v-layout>
    </v-container>
</template>

<script>
    import Tree from "../tree/Tree";

    import {mapState} from 'vuex';
    import Lookup from "../common/Lookup";

    export default {
        components: {
            Lookup,
            Tree},
        name: 'main-content',
        computed: {
            ...mapState(['tree'])
        },
        methods: {
        }
    }

</script>