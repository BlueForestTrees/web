<template>
    <span>
        <v-card-title primary-title>
            <p class="headline" style="padding-right:1em">Recherche</p>
            <v-text-field label="Filtre" autofocus v-model="namePart"/>
        </v-card-title>

        <v-list-tile v-for="item in items" :key="item._id" @click="toggleSelect(item)" :style="{background: isSelected(item) ? '#E8F5E9' : '', transition: 'background .2s ease'}">
            <v-icon v-if="isSelected(item)" color="green">check_circle</v-icon>
            <v-icon v-else :style="'color: '+item.trunk.color+';margin-right:0.2em'">lens</v-icon>
            {{item.trunk.name}}
        </v-list-tile>

        <transition name="slide-fade">
            <v-toolbar v-if="selectionNotEmpty" app dark class="elevation-0" color="green lighten-2">
                <div class="d-flex align-center" style="margin-left: auto">
                    <slot :s="this"></slot>
                </div>
            </v-toolbar>
        </transition>
    </span>
</template>

<script>
    import selectable from "./mixin/Selectable";
    import On from "../const/on";
    import {mapActions} from "vuex";

    export default {
        name: 'search-comp',
        mixins: [selectable],
        data() {
            return {
                namePart: null,
                items: null
            }
        },
        computed: {
            query: function () {
                return {
                    term: this.namePart || ""
                }
            }
        },
        created: function () {
            this.namePart = "";
        },
        watch: {
            query: function (q) {
                this.dispatchSearch(q)
                    .then(items => this.items = items);
            }
        },
        methods: {
            ...mapActions({
                dispatchSearch: On.SEARCH_TREE,
            })
        }
    }
</script>