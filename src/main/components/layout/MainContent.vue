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

    export default {
        components: {Tree},
        name: 'main-content',
        computed: {
            ...mapState(['tree'])
        }
    }

</script>