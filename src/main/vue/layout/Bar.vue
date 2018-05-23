<template>
    <v-toolbar app dark clipped color="blue darken-3">

        <v-toolbar-title>
            <v-toolbar-side-icon @click.stop="nav.leftMenuVisible = !nav.leftMenuVisible"/>
        </v-toolbar-title>

        <div class="d-flex align-center" style="margin-left: auto">
            <v-tooltip bottom>
                <span slot="activator"><v-btn icon large @click="showSearch"><v-icon>search</v-icon></v-btn></span>
                <span style="pointer-events: none">RECHERCHE</span>
            </v-tooltip>
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
    import {qtUnitName} from "../../services/calculations";
    import Basket from "./Basket";

    export default {
        components: {
            Basket,
            MainDialog,
            Lookup
        },
        computed: {
            ...mapState(['nav', 'tree'])
        },
        methods: {
            ...mapMutations([Do.SHOW_DIALOG]),
            ...mapMutations({
                commitVisible: Do.UPDATE_DIALOG_VISIBILITY
            }),
            showSearch: function () {
                this.showDialog({dialog: Dial.SEARCH});
            }
        }
    }
</script>