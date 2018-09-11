<template>
    <v-flex>

        <v-toolbar v-if="!nobar && anySelected" app dark class="elevation-5" color="primary">
            <slot :s="this"></slot>
        </v-toolbar>

        <template v-if="items.length > 0" v-for="item in items">
            <div :key="item._id" @click="toggleSelect(item)" class="v-list__tile" :style="{paddingTop:'8px',paddingBottom:'8px',height:'auto', background: isSelected(item) ? '#D8E9F5' : '', transition: 'background .2s ease'}">
                <v-layout row>
                    <v-icon v-if="isSelected(item)" color="primary" style="margin-right:0.3em">check_circle</v-icon>
                    <v-icon v-else :style="'color: '+(item.color || item.trunk.color)+';margin-right:0.3em'">lens</v-icon>
                    <v-list-tile-content>{{item.name || item.trunk.name}}</v-list-tile-content>
                </v-layout>
            </div>
        </template>

        <infinite-loading v-if="ready" ref="iloading" @infinite="loadResults" spinner="spiral" :distance="500" style="padding-bottom: 3em">
            <span slot="no-more">{{items.length}} résultats</span>
            <span slot="no-results"><slot name="no-results">Pas de résultats</slot></span>
        </infinite-loading>

    </v-flex>
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
                items: []
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
            dispatchSearch: function (query) {
                return this.$store.dispatch(this.type, query)
            },
            reset: function () {
                this.items = []
                this.$nextTick(() => {
                    this.$refs.iloading.$emit('$InfiniteLoading:reset')
                })
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
            }, 400)
        },
    }
</script>