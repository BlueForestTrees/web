<template>
    <v-toolbar v-if="!anySelected" dense app class="elevation-0" style='background-color:#FFFFFFBB'>
        <v-toolbar-side-icon @click="nav.leftMenuVisible = !nav.leftMenuVisible"></v-toolbar-side-icon>
        <v-spacer/>

        <v-btn icon flat :to="{name: GO.SEARCH}">
            <v-icon large color="primary">search</v-icon>
        </v-btn>

        <logged-in />

    </v-toolbar>
    <v-toolbar v-else dense app dark class="elevation-5" color="primary" :extended="$vuetify.breakpoint.xsOnly">

        <span slot="extension" v-if="$vuetify.breakpoint.xsOnly">
            <v-btn v-if="$route.name !== GO.BASKET && selectionCount" flat dense @click="addSelectionToBasket">
                <v-icon x-large>select_all</v-icon>
                <span>Mettre de côté</span>
            </v-btn>
             <v-tooltip v-if="$route.name === GO.BASKET" bottom>
                <v-btn slot="activator" v-if="anySelected" flat @click="removeSelectionFromBasket">
                    <v-icon x-large>select_all</v-icon>
                    <v-icon x-large>arrow_right_alt</v-icon>
                    <span>retirer</span>
                </v-btn>
                <span style="pointer-events: none">Retirer du panier</span>
            </v-tooltip>
        </span>

        <v-layout row align-center>

            <v-btn v-if="oneSelected && selectionIsTree" flat @click="goTree(oneSelected)">
                <v-icon x-large>open_in_new</v-icon>
                <span>Consulter</span>
            </v-btn>

            <v-tooltip bottom v-if="twoSelected && selectionIsTree">
                <v-btn slot="activator" flat @click="goCompare(twoSelected)">comparer
                    <v-icon x-large>compare_arrows</v-icon>
                </v-btn>
                <span style="pointer-events: none">Comparer ces deux éléments</span>
            </v-tooltip>

            <v-tooltip v-if="$route.name === GO.BASKET && twoSelected" bottom>
                <v-btn slot="activator" flat @click="goAdd(twoSelected);unselect()">Composer
                    <v-icon x-large>call_merge</v-icon>
                </v-btn>
                <span style="pointer-events: none">Faire d'un produit le composant de l'autre</span>
            </v-tooltip>

            <v-tooltip v-if="$vuetify.breakpoint.smAndUp && $route.name === GO.BASKET" bottom>
                <v-btn slot="activator" v-if="anySelected" flat @click="removeSelectionFromBasket">
                    <v-icon x-large>select_all</v-icon>
                    <v-icon x-large>arrow_right_alt</v-icon>
                    <span>retirer</span>
                </v-btn>
                <span style="pointer-events: none">Retirer du panier</span>
            </v-tooltip>

            <v-btn v-if="$vuetify.breakpoint.smAndUp && $route.name !== GO.BASKET && selectionCount" flat dense @click="addSelectionToBasket">
                <v-icon x-large>select_all</v-icon>
                <span>Mettre de côté</span>
            </v-btn>

            <v-btn v-if="$route.name === GO.TREE && oneSelected" flat dense @click="goEquiv(oneSelected)">Equivalence
                <v-icon x-large>arrow_right_alt</v-icon>
                <v-icon x-large>search</v-icon>
            </v-btn>

            <v-btn v-if="$route.name === GO.TREE && oneSelected" flat dense @click="goQuiDeuxFoisPlus(oneSelected)">Jouer
                <v-icon x-large>games</v-icon>
            </v-btn>

            <v-btn slot="activator" v-if="$route.name === GO.IMPACT_ENTRY && oneSelected" flat dense @click="nav.detailsDialog = true">Consulter
                <v-icon>receipt</v-icon>
            </v-btn>

            <v-spacer/>
            <v-tooltip bottom>
                <v-btn slot="activator" icon dense @click="unselect">
                    <v-icon x-large>close</v-icon>
                </v-btn>
                <span style="pointer-events: none">Fermer</span>
            </v-tooltip>
        </v-layout>

    </v-toolbar>
</template>

<script>
    import {mapActions, mapState, mapGetters} from "vuex"
    import {Dial} from "../../const/dial"
    import On from "../../const/on"
    import {GO} from "../../const/go"
    import LoginSuscribeList from "./LoginSuscribeList"
    import selectable from "../mixin/Selectable"
    import LoggedIn from "../user/LoggedIn"

    export default {
        data: function () {
            return {
                Dial, GO
            }
        },
        mixins: [selectable],
        components: {
            LoggedIn,
            LoginSuscribeList
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
            },
            ...mapGetters(['notEmptyBasket'])
        },
        methods: {
            go: function (p) {
                this.$router.push(p)
            },
            goAdd(selection) {
                this.showDialog({dialog: Dial.ADD_RESSOURCE, data: {left: selection[0], right: selection[1]}})
            },
            ...mapActions({
                removeSelectionFromBasket: On.REMOVE_SELECTION_FROM_BASKET,
                goSearch: On.GO_SEARCH,
                goTree: On.GO_TREE,
                goHome: On.GO_HOME,
                addSelectionToBasket: On.ADD_SELECTION_TO_BASKET,
                goCompare: On.GO_COMPARE,
                showDialog: On.SHOW_DIALOG,
                dispatchGoEquiv: On.GO_EQUIV,
                dispatchGoQuiDeuxFoisPlus: On.GO_QUI_DEUX_FOIS_PLUS
            }),
            goEquiv(e) {
                this.dispatchGoEquiv({
                    _id: this.tree._id,
                    bqt: this.tree.trunk.quantity.bqt,
                    s_id: e._id,
                    sbqt: e.trunk ? e.trunk.quantity.bqt : e.quantity.bqt
                })
            },
            goQuiDeuxFoisPlus(e) {
                this.dispatchGoQuiDeuxFoisPlus({
                    _id: this.tree._id,
                    bqt: this.tree.trunk.quantity.bqt,
                    s_id: e._id,
                    sbqt: e.trunk ? e.trunk.quantity.bqt : e.quantity.bqt
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