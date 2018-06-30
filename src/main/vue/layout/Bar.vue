<template>
    <v-toolbar app dark clipped color="blue darken-3">

        <v-toolbar-title>
            <v-toolbar-side-icon @click.stop="nav.leftMenuVisible = !nav.leftMenuVisible"/>
        </v-toolbar-title>

        <div class="d-flex align-center" style="margin-left: auto">
            <v-tooltip bottom>
                <span slot="activator"><v-btn icon large @click="show(Dial.SEARCH)"><v-icon>search</v-icon></v-btn></span>
                <span style="pointer-events: none">RECHERCHE</span>
            </v-tooltip>
            <v-menu>
                <v-avatar slot="activator" size="32px" tile><img src="img/logo-rond.svg" alt="BlueForest"></v-avatar>
                <v-list>
                    <v-list>
                        <v-list-tile v-if="!connected" @click="show(Dial.LOGIN)">
                            <v-list-tile-title>Connexion</v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile v-else @click="logout">
                            <v-list-tile-title>Déconnexion</v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile @click="show(Dial.SUSCRIBE)">
                            <v-list-tile-title>Inscription</v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-list>
            </v-menu>
        </div>
    </v-toolbar>
</template>

<script>
    import Lookup from "../common/Lookup";
    import MainDialog from "../dialog/MainDialog";
    import {mapMutations, mapState, mapGetters, mapActions} from "vuex";
    import {Dial} from "../../const/dial";
    import Do from "../../const/do";
    import Basket from "./Basket";
    import On from "../../const/on";

    export default {
        data: function () {
            return {
                Dial
            }
        },
        components: {
            Basket,
            MainDialog,
            Lookup
        },
        computed: {
            ...mapState(['nav', 'tree']),
            ...mapGetters(['connected'])
        },
        methods: {
            ...mapActions({
                logout: On.LOGOUT
            }),
            ...mapMutations({
                showDialog: Do.SHOW_DIALOG,
                commitVisible: Do.UPDATE_DIALOG_VISIBILITY
            }),
            show: function (dialog) {
                this.showDialog({dialog});
            }
        }
    }
</script>