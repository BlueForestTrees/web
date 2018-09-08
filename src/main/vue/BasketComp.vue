<template>
    <span>
        <v-card-text class="text-md-center" v-if="items.length === 0">Votre panier est vide. <br>Faites une <span><v-icon @click="goSearch" color="blue">search</v-icon> recherche pour trouver des choses à mettre dans le panier.</span></v-card-text>

            <v-toolbar v-if="anySelected" app dark class="elevation-5" color="blue">
                <slot :s="this">
                </slot>
            </v-toolbar>
        <v-container>
            <v-layout row wrap justify-center>
                <template v-if="items.length > 0" v-for="item in items">
                    <v-card :key="item._id" class="ma-1"
                            :style="{borderRadius: '1.5em',background: isSelected(item) ? '#D8E9F5' : '', transition: 'background .2s ease'}">
                        <v-container py-2 pr-3 pl-2 @click="toggleSelect(item)" style="cursor: pointer">
                            <v-layout row align-center style="pointer-events: none">
                                <v-icon v-if="isSelected(item)" color="blue" style="margin-right:0.3em">check_circle</v-icon>
                                <v-icon v-else :style="'color: '+item.trunk.color+';margin-right:0.3em'">lens</v-icon>
                                {{item.trunk.name}}
                            </v-layout>
                        </v-container>
                    </v-card>
                </template>
            </v-layout>
        </v-container>
    </span>
</template>

<script>
    import selectable from "./mixin/Selectable"
    import On from "../const/on"
    import {mapActions} from "vuex"
    import {mapGetters} from "vuex"

    export default {
        name: 'basket-comp',
        props: ['maxSelectionSize'],
        mixins: [selectable],
        computed: {
            ...mapGetters({items:'basketArray'})
        },
        methods: {
            removeSelectedItems: function () {
                this.remove(this.selection)
                    .then(this.unselect())
            },
            ...mapActions({remove: On.REMOVE_FROM_BASKET, goSearch: On.GO_SEARCH})
        }
    }
</script>