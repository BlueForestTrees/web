<template>
    <v-btn class="elevation-3" fab bottom right color="pink" dark fixed @click.stop="showDialog({dialog:Dial.ADD_TRUNK})">
        <v-icon>add</v-icon>
    </v-btn>
</template>

<script>
    import {Dial} from "../../const/dial"
    import Do from "../../const/do"
    import {mapMutations} from 'vuex'

    export default {
        name: "add-tree-btn",
        data: function () {return {Dial}},
        methods: {
            ...mapMutations({showDialog: Do.SHOW_DIALOG})
        }
    }
</script>