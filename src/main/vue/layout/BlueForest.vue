<template>
    <v-content>
        <v-container fluid>
            <v-layout justify-center align-center>

                <div class="logo-back"/>

                <transition name="fade">
                    <tree v-if="tree" :tree="tree"/>
                </transition>

                <transition name="fade">
                    <compare-to v-if="tree && compareTo" :leftTree="tree" :rightTree="compareTo"/>
                </transition>

            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
    import Tree from "../tree/Tree";

    import {mapState} from 'vuex';
    import Lookup from "../common/Lookup";
    import CompareTo from "./CompareTo";

    export default {
        components: {
            CompareTo,
            Lookup, Tree
        },
        computed: {
            ...mapState(['tree', 'compareTo'])
        },
        methods: {}
    }

</script>

<style>
    .logo-back {
        background-size: 453px 568px;
        width: 453px;
        height: 568px;
        position: absolute;
        opacity: 0.2;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: url(/img/Bleuie.png) no-repeat;
    }

    .fade-quick-enter-active, .fade-enter-active {
        transition: opacity .35s
    }

    .fade-leave-active {
        transition: opacity .2s
    }

    .fade-quick-enter, .fade-quick-leave-to, .fade-enter, .fade-leave-to {
        opacity: 0
    }
</style>