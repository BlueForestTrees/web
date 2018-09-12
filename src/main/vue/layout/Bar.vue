<template>
    <v-toolbar dense app clipped-right class="elevation-1" style="background-color: #FAFAFACC">
        <v-toolbar-side-icon @click="nav.leftMenuVisible = !nav.leftMenuVisible"></v-toolbar-side-icon>

        <v-tabs align-with-title color="transparent">
            <v-spacer/>
            <v-tab icon dense :to="{name: GO.HOME}">
                <v-icon color="primary">home</v-icon>
            </v-tab>
            <v-tab icon dense :to="{name: GO.SEARCH}">
                <v-icon color="primary">search</v-icon>
                <v-flex hidden-sm-and-down style="pointer-events: none">Recherche</v-flex>
            </v-tab>
            <v-tab icon dense :to="{name: GO.BASKET}">
                <v-icon color="primary">shopping_basket</v-icon>
                <v-flex hidden-sm-and-down style="pointer-events: none">Panier</v-flex>
            </v-tab>
            <v-tab icon dense :to="{name: GO.TREE_EMPTY}">
                <v-icon color="primary">category</v-icon>
                <v-flex hidden-sm-and-down style="pointer-events: none">Composition</v-flex>
            </v-tab>
            <v-tab icon dense :to="{name: GO.COMPARE_EMPTY}">
                <v-icon color="primary">compare_arrows</v-icon>
                <v-flex hidden-sm-and-down style="pointer-events: none">Comparaison</v-flex>
            </v-tab>
            <v-tabs-slider color="primary"></v-tabs-slider>
            <v-spacer/>
        </v-tabs>

        <v-spacer/>
        <v-menu v-if="user">
            <v-avatar slot="activator" size="32px" :style="{backgroundColor:user.color}">
                <span :style="{color:overcolor(user.color)}">{{initiales(user.fullname)}}</span>
            </v-avatar>

            <v-list two-line>
                <v-list-tile @click="">
                    <v-list-tile-avatar size="64px" style="padding-right: 1em">
                        <v-avatar slot="activator" size="64px" :style="{backgroundColor:user.color}"><h1
                                :style="{color:overcolor(user.color)}">{{initiales(user.fullname)}}</h1></v-avatar>
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
        </v-menu>
        <v-menu v-else>
            <v-tooltip slot="activator" bottom>
                <v-btn slot="activator" icon dense>
                    <v-avatar size="32px" tile>
                        <img src="/img/logo.svg" alt="BlueForest">
                    </v-avatar>
                </v-btn>
                <span style="pointer-events: none">Connexion</span>
            </v-tooltip>
            <login-suscribe-list/>
        </v-menu>
    </v-toolbar>
</template>

<script>
    import MainDialog from "../dialog/MainDialog"
    import {mapMutations, mapState, mapActions} from "vuex"
    import {Dial} from "../../const/dial"
    import Do from "../../const/do"
    import On from "../../const/on"
    import {GO} from "../../const/go"
    import {initiales, overcolor} from "../../services/calculations"
    import LoginSuscribeList from "../common/LoginSuscribeList"

    export default {
        data: function () {
            return {
                Dial, GO
            }
        },
        components: {
            LoginSuscribeList,
            MainDialog
        },
        computed: {
            ...mapState(['nav', 'tree', 'user'])
        },
        methods: {
            overcolor, initiales,
            goSearch: function () {
                this.$router.push({name: "search"})
            },
            ...mapActions({
                logout: On.LOGOUT
            })
        }
    }
</script>

<style>
    .v-tabs__container {
        padding-left: 0px;
    }
</style>