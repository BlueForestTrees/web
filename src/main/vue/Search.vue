<template>
    <span>
        <v-card-title primary-title>
            <p class="headline" style="padding-right:1em">Recherche</p>
            <v-text-field label="Filtre" autofocus v-model="namePart"/>
        </v-card-title>


        <template>
            <v-list-tile v-for="item in items" :key="item._id" @click="toggleSelect(item)" :style="{background: isSelected(item) ? '#E8F5E9' : '', transition: 'background .2s ease'}">
                <v-icon v-if="isSelected(item)" color="green">check_circle</v-icon>
                <v-icon v-else :style="'color: '+item.trunk.color+';margin-right:0.2em'">lens</v-icon>
                {{item.trunk.name}}
            </v-list-tile>
        </template>

        <transition name="slide-fade">
            <v-toolbar v-if="selectionNotEmpty" app dark class="elevation-0" color="green lighten-2">
                <div class="d-flex align-center" style="margin-left: auto">
                    <v-tooltip bottom>
                        <v-btn slot="activator" v-if="oneSelected" icon dense @click="goTree(oneSelected)"><v-icon>launch</v-icon></v-btn>
                        <span style="pointer-events: none">Ouvrir</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <v-btn slot="activator" v-if="twoSelected" icon dense @click="compare(twoSelected)"><v-icon>compare_arrows</v-icon></v-btn>
                        <span style="pointer-events: none">Comparer</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <v-btn slot="activator" v-if="manySelected" icon dense @click="addSelectionToBasket"><v-icon>save_alt</v-icon></v-btn>
                        <span style="pointer-events: none">Ajouter au panier</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <span slot="activator"><v-btn icon dense @click="unselect()"><v-icon>close</v-icon></v-btn></span>
                        <span style="pointer-events: none">Fermer</span>
                    </v-tooltip>
                </div>
            </v-toolbar>
        </transition>
    </span>
</template>

<script>
    import {Dial} from "../const/dial";
    import On from "../const/on";
    import {mapActions} from "vuex";
    import selectable from "./mixin/Selectable";

    export default {
        name: "search",
        mixins: [selectable],
        data() {
            return {
                Dial,
                busy: false,
                namePart: null,
                items: null
            }
        },
        mounted: function () {
            this.namePart = "";
        },
        computed: {
            query: function () {
                return {
                    namePart: this.namePart,
                }
            }
        },
        watch: {
            query: async function (q) {
                this.items = await this.dispatchSearch({term: q.namePart});
            }
        },
        methods: {
            addSelectionToBasket: async function () {
                await this.addToBasket(this.selection);
                this.snack({text: `${this.selecteds} éléments ajoutés au panier.`});
                this.unselect();
            },
            ...mapActions({
                compare: On.GO_COMPARE,
                dispatchSearch: On.SEARCH_TREE,
                goTree: On.GO_TREE,
                addToBasket: On.ADD_TO_BASKET,
                snack: On.SNACKBAR
            })
        }
    }
</script>