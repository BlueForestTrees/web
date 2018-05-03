<template>
    <v-toolbar app dark clipped color="blue darken-3">

        <v-toolbar-title :style="$vuetify.breakpoint.smAndUp ? 'width: 300px; min-width: 250px' : 'min-width: 72px'" class="ml-0 pl-3">
            <v-toolbar-side-icon @click.stop="nav.leftMenuVisible = !nav.leftMenuVisible"/>
            <span class="hidden-xs-only">Blue Forest Trees</span>
        </v-toolbar-title>

        <div class="d-flex align-center" style="margin-left: auto">

            <v-tooltip top>
                <span slot="activator"><v-btn icon large @click="showCompare"><v-icon>timeline</v-icon></v-btn></span>
                <span>"COMPARATIF" : Comparer les bilans ressources, bilans impacts et les propriétés de plusieurs produits/service</span>
            </v-tooltip>
            <v-btn icon large @click="showSearch"><v-icon>search</v-icon></v-btn>
            <v-avatar size="32px" tile><img src="img/logo-rond.svg" alt="BlueForest"></v-avatar>
        </div>
    </v-toolbar>
</template>

<script>
    import Lookup from "../common/Lookup";
    import MainDialog from "../dialog/MainDialog";
    import {mapMutations, mapState} from "vuex";
    import {Dial} from "../../const/dial";
    import Do from "../../const/do";

    export default {
        components: {
            MainDialog,
            Lookup
        },
        computed: {
            ...mapState(['nav'])
        },
        methods: {
            ...mapMutations([Do.SHOW_DIALOG]),
            ...mapMutations({
                commitVisible: Do.UPDATE_DIALOG_VISIBILITY
            }),
            showSearch: function () {
                this.showDialog({dialog: Dial.SEARCH});
            },
            showCompare: function () {
                this.showDialog({dialog: Dial.COMPARE_TO});
            }
        }
    }
</script>