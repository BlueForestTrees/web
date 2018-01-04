<template>

    <span>
    <v-btn v-if="!trunk" fab bottom right color="pink" dark fixed @click.stop="onAddClick" class="floating-bar">
        <v-icon>add</v-icon>
    </v-btn>
    <v-btn v-else fab bottom right color="pink" dark fixed @click.stop="openOtherTree" class="floating-bar">
        <v-icon x-large>settings_ethernet</v-icon>
    </v-btn>
    </span>

</template>

<script>
    import {Do} from "../../const/do";
    import {mapMutations, mapGetters} from 'vuex';
    import {Dial} from "../../const/dial";

    export default {
        name: 'floating-button',
        methods: {
            ...mapMutations({
                "doShowDialog": Do.SHOW_DIALOG
            }),
            onAddClick(){
                this.doShowDialog(Dial.TRUNK);
            },
            openOtherTree(){
                this.doShowDialog(Dial.COMPARE_TO);
            }
        },
        computed: {
            ...mapGetters(['trunk'])
        }
    }
</script>

<style>
    .btn--bottom:not(.btn--absolute) {

        bottom: 50px;
    }
</style>