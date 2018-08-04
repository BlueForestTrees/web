<template>
    <span>
        <v-card-title primary-title>
            <div class="headline">Panier</div>
        </v-card-title>
        <v-card-text v-if="items.length === 0">
            <div>Votre panier est vide. Faites une recherche.</div>
        </v-card-text>

        <template v-if="items.length > 0" v-for="item in items">
            <v-list-tile :key="item._id" @click="toggleSelect(item)" :style="{background: isSelected(item) ? '#E8F5E9' : '', transition: 'background .2s ease'}">
                <v-icon v-if="isSelected(item)" color="green"  style="margin-right:0.3em">check_circle</v-icon>
                <v-icon v-else :style="'color: '+item.trunk.color+';margin-right:0.3em'">lens</v-icon>
                {{item.trunk.name}}
            </v-list-tile>
            <v-divider/>
        </template>

        <transition name="slide-fade">
            <v-toolbar v-if="anySelected" app dark class="elevation-0" color="green lighten-2">
                    <v-tooltip bottom>
                        <v-btn slot="activator" icon dense @click="unselect"><v-icon>close</v-icon></v-btn>
                        <span style="pointer-events: none">Fermer</span>
                    </v-tooltip>
                    <v-spacer/>
                    <v-tooltip bottom>
                        <v-btn slot="activator" v-if="oneSelected" flat dense @click="goTree(oneSelected)">ouvrir<v-icon>launch</v-icon></v-btn>
                        <span style="pointer-events: none">Ouvrir</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                        <v-btn slot="activator" v-if="twoSelected" flat dense @click="compare(twoSelected)">comparer<v-icon>compare_arrows</v-icon></v-btn>
                        <span style="pointer-events: none">Comparer</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                        <v-btn slot="activator" v-if="anySelected" flat dense @click="removeSelectedItems">retirer<v-icon>delete_outline</v-icon></v-btn>
                        <span style="pointer-events: none">Retirer</span>
                    </v-tooltip>
            </v-toolbar>
        </transition>

    </span>
</template>

<script>
    import {mapState} from "vuex"
    import {mapActions} from "vuex"
    import {qtUnitName, shadeColor} from "../services/calculations"
    import On from "../const/on"
    import selectable from "./mixin/Selectable"

    export default {
        name: 'basket',
        mixins: [selectable],
        computed: {
            ...mapState({items: 'basket'}),
            noItems: function () {
                return this.items.length === 0
            }
        },
        methods: {
            removeSelectedItems: function () {
                this.remove(this.selection)
                    .then(this.unselect())
            },
            ...mapActions({goTree: On.GO_TREE, compare: On.GO_COMPARE, remove: On.REMOVE_FROM_BASKET}),
            qtUnitName, shadeColor
        }
    }
</script>

<style>
    ::after {
        content: none
    }
</style>