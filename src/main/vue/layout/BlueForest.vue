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

    .fadeInOut-quick-enter-active, .fadeInOut-enter-active {
        transition: opacity .35s
    }

    .fadeInOut-leave-active {
        transition: opacity .2s
    }

    .fadeInOut-quick-enter, .fadeInOut-quick-leave-to, .fadeInOut-enter, .fadeInOut-leave-to {
        opacity: 0
    }
</style>