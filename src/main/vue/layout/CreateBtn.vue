<template>

    <v-btn fab bottom right color="pink" dark fixed @click.stop="createTree">
        <v-icon>add</v-icon>
    </v-btn>

</template>

<script>
    import Do from "../../const/do";
    import {mapMutations} from 'vuex';
    import {Dial} from "../../const/dial";

    export default {
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