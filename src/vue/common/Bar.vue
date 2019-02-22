<template>
    <v-toolbar v-if="anySelected" dense app dark class="elevation-5" color="primary" :extended="$vuetify.breakpoint.xsOnly">

        <span slot="extension" v-if="$vuetify.breakpoint.xsOnly">.
            <v-btn v-if="$route.name === GO.TREE && oneSelected" flat dense @click="goQuiDeuxFoisPlus(oneSelected)">
                Jouer
                 <v-list-tile-avatar class="game logo"></v-list-tile-avatar>
            </v-btn>
        </span>

        <v-layout row align-center>

            <v-btn v-if="oneSelected && selectionIsTree" flat @click="goTree(oneSelected)">
                <span>Consulter</span>
                <v-list-tile-avatar class="scope-tree logo"></v-list-tile-avatar>
            </v-btn>

            <v-btn v-if="$route.name === GO.TREE && oneSelected" flat dense @click="goEquiv(oneSelected)">
                Equivalences
                <v-list-tile-avatar class="balance logo"/>
            </v-btn>

            <v-btn v-if="$vuetify.breakpoint.smAndUp && $route.name === GO.TREE && oneSelected" flat dense @click="goQuiDeuxFoisPlus(oneSelected)">Jouer
                <v-list-tile-avatar class="game logo"></v-list-tile-avatar>
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
    <v-toolbar v-else dense app class="elevation-0" style='background-color:#FFFFFFBB'>
        <v-toolbar-side-icon @click="nav.leftMenuVisible = !nav.leftMenuVisible"></v-toolbar-side-icon>
        <v-spacer/>

        <v-btn icon :to="{name: GO.SEARCH}">
            <v-icon color="primary">home</v-icon>
        </v-btn>

        <logged-in/>
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
            ...mapActions({
                removeSelectionFromBasket: On.REMOVE_SELECTION_FROM_BASKET,
                goSearch: On.GO_SEARCH,
                goTree: On.GO_TREE,
                goHome: On.GO_HOME,
                showDialog: On.SHOW_DIALOG,
                dispatchGoEquiv: On.GO_EQUIV,
                dispatchGoQuiDeuxFoisPlus: On.GO_QUI_DEUX_FOIS_PLUS,
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
                    fid: e[`${e.type}Id`],
                    f: e.type
                })
            },
            createPub(selection) {
                this.go({
                    name: GO.INFO,
                    params: {
                        leftId: selection[0]._id,
                        rightId: selection[1]._id,
                        equivId: selection[2]._id
                    },
                    query: {
                        iid: selection[3]._id
                    }
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