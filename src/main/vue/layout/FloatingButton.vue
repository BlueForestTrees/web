<template>

    <span>
    <v-btn v-if="!trunk" fab bottom right color="pink" dark fixed @click.stop="onAddClick" class="floating-bar">
        <v-icon>add</v-icon>
    </v-btn>
    <v-btn v-else fab bottom right color="pink" dark fixed @click.stop="doCloseTree" class="floating-bar">
        <v-icon>close</v-icon>
    </v-btn>
    </span>

</template>

<script>
    import {Dial, Do} from "../../store/keys";
    import {mapMutations, mapGetters} from 'vuex';

    export default {
        name: 'floating-button',
        methods: {
            ...mapMutations({
                "doShowDialog": Do.SHOW_DIALOG,
                "doCloseTree": Do.CLOSE_TREE
            }),
            onAddClick(){
                this.doShowDialog(Dial.TRUNK);
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