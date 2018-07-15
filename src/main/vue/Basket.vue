<template>
    <span>
        <v-card-title primary-title>
            <div class="headline">Panier</div>
        </v-card-title>
        <v-card-text v-if="items.length === 0">
            <div>Votre panier est vide. Faites une recherche.</div>
        </v-card-text>

        <v-list-tile d-flex v-if="items.length > 0" v-for="item in items" :key="item._id"
                     @click="toggleSelect(item)" :style="{background: isSelected(item) ? '#E8F5E9' : '', transition: 'background .2s ease'}">

                    <v-icon v-if="isSelected(item)" color="green">check_circle</v-icon>
                    <v-icon v-else :style="'color: '+item.trunk.color+';margin-right:0.2em'">lens</v-icon>
                    {{item.trunk.name}}

        </v-list-tile>

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
                        <v-btn slot="activator" icon dense @click="unselect()"><v-icon>close</v-icon></v-btn>
                        <span style="pointer-events: none">Fermer</span>
                    </v-tooltip>
                </div>
            </v-toolbar>
        </transition>

    </span>
</template>

<script>
    import {mapMutations, mapState} from "vuex";
    import {mapActions} from "vuex";
    import Do from "../const/do";
    import {qtUnitName, shadeColor} from "../services/calculations";
    import On from "../const/on";
    import selectable from "./mixin/Selectable";

    export default {
        name: 'basket',
        mixins: [selectable],
        computed: {
            ...mapState({items: 'basket'}),
            noItems: function () {
                return this.items.length === 0;
            }
        },
        methods: {
            ...mapActions({goTree: On.GO_TREE, compare: On.GO_COMPARE}),
            ...mapMutations({remove: Do.REMOVE_FROM_BASKET}),
            qtUnitName, shadeColor
        }
    }
</script>

<style>
    ::after {
        content: none;
    }
</style>