<template>

    <span>
        <v-btn fab bottom right color="pink" dark fixed @click.stop="createTree" class="floating-bar">
            <v-icon>add</v-icon>
        </v-btn>
    </span>

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