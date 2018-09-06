<template>
    <span>
        <v-layout row wrap justify-center align-center class="ma-4">
            <span class="title">Panier</span>
        </v-layout>

        <basket-comp>
            <template slot-scope="{ s }">
                <v-tooltip bottom>
                    <v-btn slot="activator" v-if="s.oneSelected" flat dense @click="goTree(s.oneSelected)">ouvrir<v-icon>category</v-icon></v-btn>
                    <span style="pointer-events: none">Ouvrir</span>
                </v-tooltip>

                <v-tooltip bottom>
                    <v-btn slot="activator" v-if="s.twoSelected" flat dense @click="goCompare(s.twoSelected)">comparer<v-icon>compare_arrows</v-icon></v-btn>
                    <span style="pointer-events: none">Comparer</span>
                </v-tooltip>

                <v-tooltip bottom>
                    <v-btn slot="activator" v-if="s.anySelected" flat dense @click="s.removeSelectedItems"><v-icon>shopping_basket</v-icon><v-icon>arrow_right_alt</v-icon>retirer</v-btn>
                    <span style="pointer-events: none">Retirer</span>
                </v-tooltip>
                <v-spacer/>
                <v-tooltip bottom>
                    <v-btn slot="activator" icon dense @click="s.unselect"><v-icon>close</v-icon></v-btn>
                    <span style="pointer-events: none">Fermer</span>
                </v-tooltip>
            </template>
        </basket-comp>

    </span>
</template>

<script>
    import {mapActions} from "vuex"
    import On from "../const/on"
    import selectable from "./mixin/Selectable"
    import BasketComp from "./BasketComp"

    export default {
        name: 'basket',
        components: {BasketComp},
        mixins: [selectable],
        methods: {
            ...mapActions({goTree: On.GO_TREE, goCompare: On.GO_COMPARE})
        }
    }
</script>

<style>
    ::after {
        content: none
    }
</style>