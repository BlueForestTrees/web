<template>
    <span>
        <v-card-title primary-title><div class="headline">Panier</div></v-card-title>
        <v-card-text v-if="items.length === 0">Votre panier est vide. Faites une recherche.</v-card-text>

        <template v-if="items.length > 0" v-for="item in items">
            <div :key="item._id" @click="toggleSelect(item)" class="v-list__tile" :style="{paddingTop:'8px',paddingBottom:'8px',height:'auto', background: isSelected(item) ? '#E8F5E9' : '', transition: 'background .2s ease'}">
                <v-icon v-if="isSelected(item)" color="green" style="margin-right:0.3em">check_circle</v-icon>
                <v-icon v-else :style="'color: '+item.trunk.color+';margin-right:0.3em'">lens</v-icon>
                {{item.trunk.name}}
            </div>
            <v-divider/>
        </template>

        <transition name="slide-fade">
            <v-toolbar v-if="anySelected" app dark class="elevation-0" color="green lighten-2">
                    <v-tooltip bottom>
                        <v-btn slot="activator" v-if="oneSelected" flat dense @click="goTree(oneSelected)">ouvrir<v-icon>category</v-icon></v-btn>
                        <span style="pointer-events: none">Ouvrir</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                        <v-btn slot="activator" v-if="twoSelected" flat dense @click="compare(twoSelected)">comparer<v-icon>compare_arrows</v-icon></v-btn>
                        <span style="pointer-events: none">Comparer</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                        <v-btn slot="activator" v-if="oneSelected" flat dense @click="removeForeverSelectedItem">supprimer<v-icon>delete_forever</v-icon></v-btn>
                        <span style="pointer-events: none">Supprimer</span>
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
    import {mapState} from "vuex"
    import {mapActions} from "vuex"
    import On from "../const/on"
    import selectable from "./mixin/Selectable"

    export default {
        name: 'basket',
        mixins: [selectable],
        computed: {
            ...mapState(['basket']),
            items:function(){
                return this.basket && Object.values(this.basket)
            }
        },
        methods: {
            removeForeverSelectedItem: function () {
                this.removeForever(this.oneSelected)
                    .then(this.unselect())
            },
            removeSelectedItems: function () {
                this.remove(this.selection)
                    .then(this.unselect())
            },
            ...mapActions({goTree: On.GO_TREE, compare: On.GO_COMPARE, remove: On.REMOVE_FROM_BASKET, removeForever: On.DELETE_TREE})
        }
    }
</script>

<style>
    ::after {
        content: none
    }
</style>