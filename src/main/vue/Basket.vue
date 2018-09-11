<template>
    <v-flex key="basket">
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
                    <v-btn slot="activator" v-if="s.twoSelected" flat dense @click="goAdd(s.twoSelected);s.unselect()">Ajouter<v-icon>call_merge</v-icon></v-btn>
                    <span style="pointer-events: none">Ajouter</span>
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
    </v-flex>
</template>

<script>
    import {mapActions} from "vuex"
    import On from "../const/on"
    import selectable from "./mixin/Selectable"
    import BasketComp from "./BasketComp"
    import {Dial} from "../const/dial"

    export default {
        name: 'basket',
        components: {BasketComp},
        mixins: [selectable],
        methods: {
            ...mapActions({goTree: On.GO_TREE, goCompare: On.GO_COMPARE, showDialog:On.SHOW_DIALOG}),
            goAdd(selection) {
                this.showDialog({dialog:Dial.ADD_RESSOURCE, data: {left: selection[0], right:selection[1]}})
            }
        }
    }
</script>

<style>
    ::after {
        content: none
    }
</style>