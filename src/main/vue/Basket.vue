<template>
    <span>
        <v-layout row wrap justify-center align-center class="ma-4">
            <span class="title">Panier</span>
        </v-layout>
        <v-card-text class="text-md-center" v-if="items.length === 0">Votre panier est vide. <br>Faites une <span><v-icon @click="goSearch" color="blue">search</v-icon> recherche pour trouver des choses à mettre dans le panier.</span></v-card-text>

        <v-container>
            <v-layout row wrap justify-center>
                <template v-if="items.length > 0" v-for="item in items">
                    <v-card :key="item._id" class="ma-1" :style="{borderRadius: '1.5em',background: isSelected(item) ? '#D8E9F5' : '', transition: 'background .2s ease'}">
                        <v-container py-2 pr-3 pl-2 @click="toggleSelect(item)" style="cursor: pointer">
                            <v-layout row align-center  style="pointer-events: none">
                                <v-icon v-if="isSelected(item)" color="blue" style="margin-right:0.3em">check_circle</v-icon>
                                <v-icon v-else :style="'color: '+item.trunk.color+';margin-right:0.3em'">lens</v-icon>
                                {{item.trunk.name}}
                            </v-layout>
                        </v-container>
                    </v-card>
                </template>
            </v-layout>
        </v-container>

        <transition name="slide-fade">
            <v-toolbar v-if="anySelected" app dark class="elevation-0" color="blue">
                    <v-tooltip bottom>
                        <v-btn slot="activator" v-if="anySelected" flat dense @click="removeSelectedItems"><v-icon>call_merge</v-icon>Ajouter à</v-btn>
                        <span style="pointer-events: none">Ajouter à</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <v-btn slot="activator" v-if="oneSelected" flat dense @click="goTree(oneSelected)">ouvrir<v-icon>category</v-icon></v-btn>
                        <span style="pointer-events: none">Ouvrir</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                        <v-btn slot="activator" v-if="twoSelected" flat dense @click="compare(twoSelected)">comparer<v-icon>compare_arrows</v-icon></v-btn>
                        <span style="pointer-events: none">Comparer</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                        <v-btn slot="activator" v-if="anySelected" flat dense @click="removeSelectedItems"><v-icon>shopping_basket</v-icon><v-icon>arrow_right_alt</v-icon>retirer</v-btn>
                        <span style="pointer-events: none">Retirer</span>
                    </v-tooltip>
                    <v-spacer/>
                    <v-tooltip bottom>
                        <v-btn slot="activator" icon dense @click="unselect"><v-icon>close</v-icon></v-btn>
                        <span style="pointer-events: none">Fermer</span>
                    </v-tooltip>
            </v-toolbar>
        </transition>

    </span>
</template>

<script>
    import {mapGetters} from "vuex"
    import {mapActions} from "vuex"
    import On from "../const/on"
    import selectable from "./mixin/Selectable"

    export default {
        name: 'basket',
        mixins: [selectable],
        computed: {
            ...mapGetters({items:'basketArray'})
        },
        methods: {
            removeSelectedItems: function () {
                this.remove(this.selection)
                    .then(this.unselect())
            },
            ...mapActions({goTree: On.GO_TREE, compare: On.GO_COMPARE, remove: On.REMOVE_FROM_BASKET, goSearch: On.GO_SEARCH})
        }
    }
</script>

<style>
    ::after {
        content: none
    }
</style>