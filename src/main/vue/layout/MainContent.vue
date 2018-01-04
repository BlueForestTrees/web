<template>
    <v-container fluid fill-height>
        <v-layout justify-center align-center>

            <tree v-if="tree" :tree="tree"/>
            <v-icon x-large v-if="tree">settings_ethernet</v-icon>
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
            select(item){
                console.log(item);
            }
        }
    }

</script>