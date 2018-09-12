<template>
    <v-card>
            <span v-if="ownerFilter">
                <v-card-title>Vos produits et services</v-card-title>
                <v-divider/>
                <search-comp :filter="ownerFilter">
                    <template slot-scope="{ s }">
                        <v-tooltip bottom>
                            <v-btn slot="activator" v-if="s.selectionCount" flat dense @click="addToBasket(s.selection);s.unselect()"><span>Panier</span><v-icon>arrow_right_alt</v-icon><v-icon>shopping_basket</v-icon></v-btn>
                            <span style="pointer-events: none">Ajouter au panier</span>
                        </v-tooltip>

                        <v-tooltip bottom>
                            <v-btn slot="activator" v-if="s.oneSelected" flat dense @click="goTree(s.oneSelected)"><span>ouvrir</span><v-icon>category</v-icon></v-btn>
                            <span style="pointer-events: none">Ouvrir</span>
                        </v-tooltip>

                        <v-tooltip bottom>
                            <v-btn slot="activator" v-if="s.twoSelected" flat dense @click="goCompare(s.twoSelected)"><span>comparer</span><v-icon>compare_arrows</v-icon></v-btn>
                            <span style="pointer-events: none">Comparer</span>
                        </v-tooltip>

                        <v-tooltip bottom class="hidden-xs-only">
                            <v-btn slot="activator" v-if="s.twoSelected" flat dense @click="goAdd(s.twoSelected);s.unselect()"><span>Ajouter</span><v-icon>call_merge</v-icon></v-btn>
                            <span style="pointer-events: none">Ajouter</span>
                        </v-tooltip>

                    </template>
                    <v-card-text slot="no-results" class="text-md-center">
                        Vous n'êtes propriétaire d'aucun produit ou service.
                        <br>
                        Vous pouvez <span @click="openAddTrunk" style="cursor:pointer"><v-icon class="icon-line" color="primary">add</v-icon>Créer un produit ou un service</span>
                        depuis le <span @click="switchLeftMenu" style="cursor:pointer"><v-icon class="icon-line" color="primary">menu</v-icon>menu de gauche.</span>
                    </v-card-text>
                </search-comp>
            </span>
        <v-container v-else>Connectez-vous pour lister vos produits et services.</v-container>
    </v-card>
</template>

<script>
    import On from "../const/on"
    import {Dial} from "../const/dial"
    import SearchComp from "./SearchComp"
    import {mapActions, mapState} from "vuex"

    export default {
        name: "owned",
        components: {SearchComp},
        methods: {
            ...mapActions({showDialog: On.SHOW_DIALOG, switchLeftMenu: On.SWITCH_LEFT_MENU}),
            openAddTrunk() {
                this.showDialog({dialog: Dial.ADD_TRUNK})
            },
            ...mapActions({goTree: On.GO_TREE, goCompare: On.GO_COMPARE, addToBasket: On.ADD_TO_BASKET, showDialog: On.SHOW_DIALOG}),
            goAdd(selection) {
                this.showDialog({dialog: Dial.ADD_RESSOURCE, data: {left: selection[0], right: selection[1]}})
            }
        },
        computed: {
            ...mapState(['user']),
            ownerFilter() {
                return this.user && {oid: this.user._id}
            }
        },
    }
</script>