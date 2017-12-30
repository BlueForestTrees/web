<template>
    <v-btn fab bottom right color="pink" dark fixed @click.stop="onAddClick" class="floating-bar">
        <v-icon>add</v-icon>
    </v-btn>
</template>

<script>
    import {Do} from "../store/keys";
    import {mapMutations} from 'vuex';

    export default {
        name: 'floating-bar',
        methods: {
            ...mapMutations({
                "onAddClick": Do.OPEN_CREATE_DIALOG
            })
        }
    }
</script>

<style>
    .btn--bottom:not(.btn--absolute) {

        bottom: 50px;
    }
</style>