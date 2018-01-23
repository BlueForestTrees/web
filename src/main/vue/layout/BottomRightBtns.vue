<template>

    <span>
        <v-btn v-if="tree" fab top right fixed @click.stop="close" class="floating-bar" style="top:6em;">
            <v-icon>close</v-icon>
        </v-btn>

        <v-btn v-if="!tree" fab bottom right color="pink" dark fixed @click.stop="onAddClick" class="floating-bar">
            <v-icon>add</v-icon>
        </v-btn>
        <v-btn v-else fab bottom right color="pink" dark fixed @click.stop="openOtherTree" class="floating-bar">
            <v-icon x-large>settings_ethernet</v-icon>
        </v-btn>
    </span>

</template>

<script>
    import Do from "../../const/do";
    import {mapMutations, mapState} from 'vuex';
    import {Dial} from "../../const/dial";

    export default {
        methods: {
            ...mapMutations({
                "doShowDialog": Do.SHOW_DIALOG,
                "close":Do.CLOSE_TREE
            }),
            onAddClick(){
                this.doShowDialog({dialog: Dial.TRUNK});
            },
            openOtherTree(){
                this.doShowDialog({dialog: Dial.COMPARE_TO});
            }
        },
        computed: {
            ...mapState(['tree'])
        }
    }
</script>

<style>
    .btn--bottom:not(.btn--absolute) {

        bottom: 50px;
    }
</style>