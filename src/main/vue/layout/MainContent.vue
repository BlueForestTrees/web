<template>
    <v-content>
        <v-container fluid>
            <v-layout justify-center align-center>

                <tree v-if="treeing" :tree="tree"/>
                <compare-to v-if="comparing" :tree="tree" :compareTo="compareTo"/>

            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
    import Tree from "../tree/Tree";

    import {mapState, mapGetters} from 'vuex';
    import Lookup from "../common/Lookup";
    import CompareTo from "./CompareTo";

    export default {
        components: {
            CompareTo,
            Lookup, Tree
        },
        computed: {
            ...mapState(['tree', 'compareTo']),
            ...mapGetters(['treeing', 'comparing'])
        },
        methods: {}
    }

</script>