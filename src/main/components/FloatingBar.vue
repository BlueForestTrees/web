<template>

    <span>
    <v-btn v-if="!trunk" fab bottom right color="pink" dark fixed @click.stop="onAddClick" class="floating-bar">
        <v-icon>add</v-icon>
    </v-btn>
    <v-btn v-else fab bottom right color="pink" dark fixed @click.stop="onCloseClick" class="floating-bar">
        <v-icon>close</v-icon>
    </v-btn>
    </span>

</template>

<script>
    import {Do} from "../store/keys";
    import {mapMutations, mapGetters} from 'vuex';

    export default {
        name: 'floating-bar',
        methods: {
            ...mapMutations({
                "onAddClick": Do.OPEN_CREATE_DIALOG,
                "onCloseClick": Do.CLOSE_TREE
            })
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