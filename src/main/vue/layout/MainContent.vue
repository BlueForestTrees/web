<template>
    <v-content>
        <v-container fluid>
            <v-layout justify-center align-center>

                <div class="logo-back"/>
                <tree v-if="treeing" :tree="tree"/>
                <compare-to v-if="comparing" :leftTree="tree" :rightTree="compareTo"/>

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

<style>
    .logo-back{
        background-size:453px 568px;
        width:453px;
        height:568px;
        position: absolute;
        opacity: 0.2;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: url(/img/Bleuie.png) no-repeat;
    }
</style>