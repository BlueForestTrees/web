<template>
    <v-toolbar v-if="!anySelected" dense app class="elevation-1">
        <v-toolbar-side-icon @click="nav.leftMenuVisible = !nav.leftMenuVisible"></v-toolbar-side-icon>
        <v-tabs align-with-title centered color="transparent">
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
                <v-flex hidden-sm-and-down style="pointer-events: none">Comparer</v-flex>
            </v-tab>
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
            <v-btn slot="activator" icon dense>
                <v-icon>person</v-icon>
            </v-btn>
            <login-suscribe-list style="width: 17em"/>
        </v-menu>
    </v-toolbar>
    <v-toolbar v-else dense app dark class="elevation-5" color="primary">


        <v-tooltip v-if="oneSelected && selectionIsTree" bottom>
            <v-btn slot="activator" flat @click="goTree(oneSelected)">ouvrir
                <v-icon>category</v-icon>
            </v-btn>
            <span style="pointer-events: none">Ouvrir</span>
        </v-tooltip>


        <v-tooltip bottom>
            <v-btn slot="activator" v-if="twoSelected" flat @click="goCompare(twoSelected)">comparer
                <v-icon>compare_arrows</v-icon>
            </v-btn>
            <span style="pointer-events: none">Comparer ces deux éléments</span>
        </v-tooltip>

        <v-tooltip v-if="$route.name === GO.BASKET && twoSelected" bottom>
            <v-btn slot="activator" flat @click="goAdd(twoSelected);unselect()">Composer
                <v-icon>call_merge</v-icon>
            </v-btn>
            <span style="pointer-events: none">Faire d'un produit le composant de l'autre</span>
        </v-tooltip>

        <v-tooltip v-if="$route.name === GO.BASKET" bottom>
            <v-btn slot="activator" v-if="anySelected" flat @click="removeSelectionFromBasket">
                <v-icon>shopping_basket</v-icon>
                <v-icon>arrow_right_alt</v-icon>
                retirer
            </v-btn>
            <span style="pointer-events: none">Retirer du panier</span>
        </v-tooltip>


        <v-tooltip v-if="$route.name !== GO.BASKET && selectionCount && selectionIsTree" bottom>
            <v-btn slot="activator" flat dense
                   @click="addSelectionToBasket">Panier
                <v-icon>arrow_right_alt</v-icon>
                <v-icon>shopping_basket</v-icon>
            </v-btn>
            <span style="pointer-events: none">Ajouter au panier</span>
        </v-tooltip>


        <v-tooltip v-if="$route.name === GO.TREE" bottom>
            <v-btn slot="activator" flat dense @click="goEquiv(oneSelected)">Equivalence
                <v-icon>arrow_right_alt</v-icon>
                <v-icon>search</v-icon>
            </v-btn>
            <span style="pointer-events: none">Trouver des équivalences</span>
        </v-tooltip>
        <v-spacer/>
        <v-tooltip bottom>
            <v-btn slot="activator" icon dense @click="unselect">
                <v-icon>close</v-icon>
            </v-btn>
            <span style="pointer-events: none">Fermer</span>
        </v-tooltip>
    </v-toolbar>
</template>

<script>
    import MainDialog from "../dialog/MainDialog"
    import {mapActions, mapState} from "vuex"
    import {Dial} from "../../const/dial"
    import On from "../../const/on"
    import {GO} from "../../const/go"
    import {initiales, overcolor} from "../../services/calculations"
    import LoginSuscribeList from "./LoginSuscribeList"
    import selectable from "../mixin/Selectable"

    export default {
        data: function () {
            return {
                Dial, GO
            }
        },
        mixins: [selectable],
        components: {
            LoginSuscribeList,
            MainDialog
        },
        computed: {
            ...mapState(['nav', 'tree', 'user']),
            selectionIsTree() {
                for (let i = 0; i < this.selection.length; i++) {
                    if (!this.selection[i].trunk) {
                        return false
                    }
                }
                return true
            }
        },
        methods: {
            overcolor, initiales,
            go: function (p) {
                this.$router.push(p)
            },
            goAdd(selection) {
                this.showDialog({dialog: Dial.ADD_RESSOURCE, data: {left: selection[0], right: selection[1]}})
            },
            ...mapActions({
                logout: On.LOGOUT,
                removeSelectionFromBasket: On.REMOVE_SELECTION_FROM_BASKET,
                goSearch: On.GO_SEARCH,
                goTree: On.GO_TREE,
                addSelectionToBasket: On.ADD_SELECTION_TO_BASKET,
                goCompare: On.GO_COMPARE,
                showDialog: On.SHOW_DIALOG
            }),
            ...mapActions({dispatchGoEquiv: On.GO_EQUIV}),
            goEquiv(impact) {
                this.dispatchGoEquiv({
                    _id: this.tree._id,
                    bqt: this.tree.trunk.quantity.bqt,
                    s_id: impact._id,
                    sbqt: impact.quantity.bqt
                })
            }
        }
    }
</script>

<style>
    .v-tabs__container {
        padding-left: 0px;
    }
</style>