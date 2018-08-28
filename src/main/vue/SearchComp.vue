<template>
    <span>
        <transition name="slide-fade">
            <v-toolbar v-if="!nobar && anySelected" app dark class="elevation-0" color="green lighten-2">
                <slot :s="this">
                </slot>
            </v-toolbar>
        </transition>

         <v-card-title primary-title>
            <div class="subheading">Résultats</div>
        </v-card-title>

        <!--<v-card-title primary-title>-->
            <!--<div class="subheading">{{label || "Filtre"}}</div>-->
        <!--</v-card-title>-->
        <!--<v-text-field label="Nom" autofocus v-model="namePart"/>-->
        <!--<v-divider/>-->
        <!--<v-divider/>-->

        <template v-for="item in items">
            <v-list-tile :key="item._id" @click="toggleSelect(item)" :style="{background: isSelected(item) ? '#E8F5E9' : '', transition: 'background .2s ease'}">
                <v-icon v-if="isSelected(item)" color="green" style="margin-right:0.3em">check_circle</v-icon>
                <v-icon v-else :style="'color: '+(item.color || item.trunk.color)+';margin-right:0.3em'">lens</v-icon>
                <v-list-tile-content>
                    <v-list-tile-title>{{item.name || item.trunk.name}}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider/>
        </template>

        <v-btn block flat color="primary" v-if="manualMode && items.length" @click="getMoreClick" style="margin-bottom: 3em">Voir plus</v-btn>
        <infinite-loading v-else ref="iloading" @infinite="getMore" spinner="spiral" :distance="500" style="padding-bottom: 3em">
            <span slot="no-more">{{items.length}} résultats</span>
            <span slot="no-results">Pas de résultats</span>
        </infinite-loading>
    </span>
</template>

<script>
    import selectable from "./mixin/Selectable"
    import On from "../const/on"
    import {mapActions} from "vuex"
    import InfiniteLoading from 'vue-infinite-loading'
    import debounce from 'lodash.debounce'

    export default {
        name: 'search-comp',
        props: {label: String, filter: Object, nobar: Boolean, maxSelectionSize: Number, type: {type: String, default: On.SEARCH_TREE}},
        mixins: [selectable],
        components: {
            InfiniteLoading,
        },
        data() {
            return {
                namePart: null,
                items: [],
                manualMode: true
            }
        },
        computed: {
            query: function () {
                return {
                    ...this.filter,
                    term: this.namePart || undefined,
                    ps: 30,
                    aidx: (this.items && this.items.length > 0) ? this.items[this.items.length - 1]._id : null
                }
            }
        },
        watch: {
            namePart: function () {
                this.reset()
            },
            filter: function () {
                this.reset()
            }
        },
        methods: {
            getMoreClick: function () {
                this.manualMode = false
                this.getMore()
            },
            reset: function () {
                this.items = []
                this.$nextTick(() => {
                    this.$refs.iloading.$emit('$InfiniteLoading:reset')
                })
            },
            dispatchSearch: function (query) {
                return this.$store.dispatch(this.type, query)
            },
            getMore: debounce(function ($state) {
                this.dispatchSearch(this.query)
                    .then(items => {
                        if (items.length > 0) {
                            this.items.push.apply(this.items, items)
                            $state && $state.loaded()
                            if (items.length < this.query.ps) {
                                $state && $state.complete()
                            }
                        } else {
                            $state && $state.complete()
                        }
                    })
            }, 300),
        },
    }
</script>