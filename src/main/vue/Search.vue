<template>
    <span>


        <v-text-field
                label="Nom" autofocus
                v-model="namePart"
        />

        <template>
            <v-list-tile v-for="item in items" :key="item._id" @click="toggleSelect(item)" :style="{background: isSelected(item) ? '#E8F5E9' : '', transition: 'background .2s ease'}">
                <v-icon v-if="isSelected(item)" color="green">check_circle</v-icon>
                <v-icon v-else :style="'color: '+item.trunk.color+';margin-right:0.2em'">lens</v-icon>
                {{item.trunk.name}}
            </v-list-tile>
        </template>

        <transition name="slide-fade">
            <v-toolbar v-if="selectionNotEmpty" app color="green lighten-2">
                <div class="d-flex align-center" style="margin-left: auto">
                    <v-tooltip bottom>
                        <v-btn slot="activator" :disabled="!oneSelected" icon dense @click=""><v-icon>launch</v-icon></v-btn>
                        <span style="pointer-events: none">Consulter</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <v-btn slot="activator" icon dense @click=""><v-icon>save_alt</v-icon></v-btn>
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
            ...mapActions({
                dispatchSearch: On.SEARCH_TREE,
                select: On.SELECT_SEARCH
            })
        }
    }
</script>