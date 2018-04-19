<template>
    <v-dialog
            v-model="visible"
            fullscreen
            transition="dialog-bottom-transition"
            :overlay="false"
            scrollable
    >
        <v-card tile>
            <v-toolbar card dark color="primary">
                <lookup @select="open" cancreate style="max-width: 500px; min-width: 128px"/>
                <v-toolbar-title>Raw Edit Film</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn icon @click.native="nav.filmDialogVisible = false" dark>
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>



            <div style="flex: 1 1 auto;"></div>
        </v-card>
    </v-dialog>
</template>
<script>
    import {mapActions, mapState} from "vuex";
    import Lookup from "../common/Lookup";
    import On from "../../const/on";

    export default {
        name: "film-dialog",
        components: {Lookup},
        props: ['film'],
        computed: {
            ...mapState(['nav'])
        },
        methods: {
            ...mapActions({
                open: On.LOAD_OPEN_TREE
            })
        }
    }
</script>