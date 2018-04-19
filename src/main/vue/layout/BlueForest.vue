<template>
    <v-content>
        <v-container fluid>
            <v-layout justify-center align-center>

                <div class="logo-back"/>

                <transition name="fadeInOut">
                    <tree v-if="tree && !compareTo" :tree="tree"/>
                </transition>

                <transition name="fadeInOut">
                    <compare v-if="tree && compareTo" :leftTree="tree" :rightTree="compareTo"/>
                </transition>

            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
    import Tree from "../tree/Tree";

    import {mapState} from 'vuex';
    import Lookup from "../common/Lookup";
    import Compare from "./Compare";

    export default {
        components: {
            Compare,
            Lookup, Tree
        },
        computed: {
            ...mapState(['tree', 'compareTo'])
        },
        methods: {}
    }

</script>