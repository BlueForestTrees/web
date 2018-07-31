<template>
    <span>
        <search-comp>
            <template slot-scope="{ s }">
                <v-toolbar-items>
                    <v-tooltip bottom>
                        <v-btn slot="activator" icon dense @click="s.unselect()"><v-icon>close</v-icon></v-btn>
                        <span style="pointer-events: none">Fermer</span>
                    </v-tooltip>
                </v-toolbar-items>
                <v-spacer/>
                <v-toolbar-items>
                    <v-tooltip bottom>
                        <v-btn slot="activator" v-if="s.oneSelected" flat dense @click="goTree(s.oneSelected)">ouvrir
                            <v-icon>launch</v-icon>
                        </v-btn>
                        <span style="pointer-events: none">Ouvrir</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <v-btn slot="activator" v-if="s.twoSelected" flat dense @click="compare(s.twoSelected)">comparer
                            <v-icon>compare_arrows</v-icon>
                        </v-btn>
                        <span style="pointer-events: none">Comparer</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <v-btn slot="activator" v-if="s.selectionCount" flat dense @click="addToBasket(s.selection);s.unselect()">panier<v-icon>save_alt</v-icon></v-btn>
                        <span style="pointer-events: none">Ajouter au panier</span>
                    </v-tooltip>
                </v-toolbar-items>
            </template>
        </search-comp>
        <add-tree-btn/>
    </span>
</template>

<script>
    import On from "../const/on"
    import {mapActions} from "vuex"
    import SearchComp from "./SearchComp"
    import AddTreeBtn from "./layout/AddTreeBtn"

    export default {
        name: "search",
        components: {AddTreeBtn, SearchComp},

        methods: {
            ...mapActions({
                compare: On.GO_COMPARE,
                goTree: On.GO_TREE,
                addToBasket: On.ADD_TO_BASKET
            })
        },
    }
</script>