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
                <v-avatar slot="activator" v-if="user" size="32px" :style="{backgroundColor:user.color}"><span
                        :style="{color:overcolor(user.color)}">SM</span></v-avatar>
                <v-avatar slot="activator" v-else size="32px" tile><img src="img/logo-rond.svg" alt="BlueForest">
                </v-avatar>

                <v-list two-line v-if="user">
                    <v-list-tile @click="">
                        <v-list-tile-avatar size="64px" style="padding-right: 1em">
                            <v-avatar slot="activator" size="64px" :style="{backgroundColor:user.color}"><span
                                    :style="{color:overcolor(user.color)}">SM</span></v-avatar>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>{{user.fullname}}</v-list-tile-title>
                            <v-list-tile-sub-title>{{user.mail}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-btn outline block class="elevation-0" @click="logout" v-if="user">Déconnexion</v-btn>
                    </v-list-tile>
                </v-list>

                <v-list v-else>
                    <v-list-tile>
                        <v-list-tile-avatar size="64px" style="padding-right: 1em">
                            <v-avatar size="64px"><img style="width: 64px;height:64px" src="img/logo-rond.svg" alt="BlueForest"></v-avatar>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>invité</v-list-tile-title>
                            <v-list-tile-sub-title>non connecté</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-btn outline block class="elevation-0" @click="connect">Connexion</v-btn>
                    </v-list-tile>
                    <v-list-tile>
                        <v-btn outline block class="elevation-0" @click="suscribe">Inscription</v-btn>
                    </v-list-tile>
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
    import {GO} from "../../const/go";
    import {overcolor} from "../../services/calculations";

    export default {
        data: function () {
            return {
                Dial, GO
            }
        },
        components: {
            Basket,
            MainDialog,
            Lookup
        },
        computed: {
            ...mapState(['nav', 'tree', 'user'])
        },
        methods: {
            suscribe: function () {
                this.$router.push({name: GO.SUSCRIBE});
            },
            connect: function () {
                this.$router.push({name: GO.LOGIN});
            },
            overcolor,
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