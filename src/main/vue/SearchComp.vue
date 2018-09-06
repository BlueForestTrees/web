<template>
    <span>
        <transition name="slide-vertical">
            <v-toolbar v-if="!nobar && anySelected" app dark class="elevation-5" color="blue">
                <slot :s="this">
                </slot>
            </v-toolbar>
        </transition>
        <template v-if="items.length > 0" v-for="item in items">
            <div :key="item._id" @click="toggleSelect(item)" class="v-list__tile"
                 :style="{paddingTop:'8px',paddingBottom:'8px',height:'auto', background: isSelected(item) ? '#D8E9F5' : '', transition: 'background .2s ease'}">
                <v-layout row>
                    <v-icon v-if="isSelected(item)" color="blue" style="margin-right:0.3em">check_circle</v-icon>
                    <v-icon v-else
                            :style="'color: '+(item.color || item.trunk.color)+';margin-right:0.3em'">lens</v-icon>
                    <v-list-tile-content>
                        {{item.name || item.trunk.name}}
                    </v-list-tile-content>
                </v-layout>
            </div>
        </template>

        <v-btn v-if="manualMode && items.length" block flat color="primary" @click="getMoreClick"
               style="margin-bottom: 3em">Voir plus</v-btn>
        <infinite-loading v-else-if="ready" ref="iloading" @infinite="loadResults" spinner="spiral" :distance="500"
                          style="padding-bottom: 3em">
            <span slot="no-more">{{items.length}} résultats</span>
            <span slot="no-results">Pas de résultats</span>
        </infinite-loading>
    </span>
</template>

<script>
    import selectable from "./mixin/Selectable"
    import On from "../const/on"
    import InfiniteLoading from 'vue-infinite-loading'
    import debounce from 'lodash.debounce'

    export default {
        name: 'search-comp',
        props: {
            ps: {default: 20},
            ready: {type: Boolean, default: true},
            filter: Object,
            nobar: Boolean,
            maxSelectionSize: Number,
            type: {type: String, default: On.SEARCH_TREE}
        },
        mixins: [selectable],
        components: {
            InfiniteLoading,
        },
        data() {
            return {
                items: [],
                manualMode: true
            }
        },
        computed: {
            query: function () {
                return {
                    ...this.filter,
                    aidx: (this.items && this.items.length > 0) ? this.items[this.items.length - 1]._id : null
                }
            }
        },
        watch: {
            filter: function () {
                this.reset()
            }
        },
        methods: {
            reset: function () {
                this.items = []
                this.$nextTick(() => {
                    this.$refs.iloading.$emit('$InfiniteLoading:reset')
                })
            },
            getMoreClick: function () {
                this.manualMode = false
                this.loadResults()
            },
            loadResults: debounce(function ($state) {
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
            dispatchSearch: function (query) {
                return this.$store.dispatch(this.type, query)
            },
        },
    }
</script>