<template>
    <v-btn fab bottom right color="pink" dark fixed @click.stop="onAddClick">
        <v-icon>add</v-icon>
    </v-btn>
</template>

<script>
    import {Do} from "../store/keys";
    import {mapMutations} from 'vuex';

    export default {
        name:'floating-bar',
        methods:{
            ...mapMutations({
                "onAddClick":Do.OPEN_CREATE_DIALOG
            })
        }
    }
</script>