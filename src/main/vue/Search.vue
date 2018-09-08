<template>
    <v-flex key="search">
        <v-layout row wrap justify-center align-center class="ma-4">
            <span class="title">Recherche</span>
        </v-layout>

        <search-trunk>
            <template slot-scope="{ s }">
                <v-toolbar-items>
                    <v-tooltip bottom>
                        <v-btn slot="activator" v-if="s.selectionCount" flat dense
                               @click="addToBasket(s.selection);s.unselect()">ajouter<v-icon>arrow_right_alt</v-icon><v-icon>shopping_basket</v-icon></v-btn>
                        <span style="pointer-events: none">Ajouter au panier</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <v-btn slot="activator" v-if="s.oneSelected" flat dense @click="goTree(s.oneSelected)">ouvrir
                            <v-icon>category</v-icon>
                        </v-btn>
                        <span style="pointer-events: none">Ouvrir</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <v-btn slot="activator" v-if="s.twoSelected" flat dense @click="compare(s.twoSelected)">comparer<v-icon>compare_arrows</v-icon></v-btn>
                        <span style="pointer-events: none">Comparer</span>
                    </v-tooltip>
                </v-toolbar-items>
                <v-spacer/>
                <v-toolbar-items>
                    <v-tooltip bottom>
                        <v-btn slot="activator" icon dense @click="s.unselect()"><v-icon>close</v-icon></v-btn>
                        <span style="pointer-events: none">Fermer</span>
                    </v-tooltip>
                </v-toolbar-items>
            </template>
        </search-trunk>
    </v-flex>
</template>

<script>
    import On from "../const/on"
    import {mapActions} from "vuex"
    import SearchTrunk from "./SearchTrunk"

    export default {
        name: "search",
        components: {SearchTrunk},
        methods: {
            ...mapActions({
                goTree: On.GO_TREE,
                addToBasket: On.ADD_TO_BASKET,
                compare: On.GO_COMPARE,
            }),
        },
    }
</script>