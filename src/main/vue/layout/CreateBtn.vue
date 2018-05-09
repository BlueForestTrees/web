<template>

    <v-btn v-if="basket.length === 0" fab bottom right color="pink" dark fixed @click.stop="createTree">
        <v-icon>add</v-icon>
    </v-btn>

</template>

<script>
    import Do from "../../const/do";
    import {mapMutations, mapState} from 'vuex';
    import {Dial} from "../../const/dial";

    export default {
        name: 'create-btn',
        computed: {
            ...mapState({basket: state => state.basket})
        },
        methods: {
            ...mapMutations({
                doShowDialog: Do.SHOW_DIALOG
            }),
            createTree() {
                this.doShowDialog({dialog: Dial.CREATE_TREE});
            }
        }
    }
</script>