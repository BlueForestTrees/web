<template>
    <v-list>
        <v-card-title primary-title>
            <p style="padding-right:1em">{{label || 'Filtre'}}</p>
            <v-text-field label="Nom" autofocus v-model="namePart"/>
        </v-card-title>

        <v-list-tile v-for="item in items" :key="item._id" @click="toggleSelect(item)" :style="{background: isSelected(item) ? '#E8F5E9' : '', transition: 'background .2s ease'}">
            <v-icon v-if="isSelected(item)" color="green">check_circle</v-icon>
            <v-icon v-else :style="'color: '+item.trunk.color+';margin-right:0.2em'">lens</v-icon>
            {{item.trunk.name}}
        </v-list-tile>

        <transition name="slide-fade">
            <v-toolbar v-if="!nobar && anySelected" app dark class="elevation-0" color="green lighten-2">
                <slot :s="this">

                </slot>
            </v-toolbar>
        </transition>

        <infinite-loading ref="iloading" @infinite="getMore" spinner="spiral" :distance="500" style="padding-bottom: 3em">
            <span slot="no-more">{{items.length}} résultats</span>
            <span slot="no-results">Pas de résultats</span>
        </infinite-loading>
    </v-list>
</template>

<script>
    import selectable from "./mixin/Selectable"
    import On from "../const/on"
    import {mapActions} from "vuex"
    import InfiniteLoading from 'vue-infinite-loading'
    import {debounce} from 'lodash'

    export default {
        name: 'search-comp',
        props: {label: String, type: String, nobar: Boolean, maxSelectionSize: Number},
        mixins: [selectable],
        components: {
            InfiniteLoading,
        },
        data() {
            return {
                namePart: null,
                items: []
            }
        },
        computed: {
            query: function () {
                return {
                    term: this.namePart || "",
                    type: this.type,
                    ps: 5,
                    aidx: (this.items && this.items.length > 0) ? this.items[this.items.length - 1]._id : null
                }
            }
        },
        watch: {
            namePart: function () {
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
            ...mapActions({
                dispatchSearch: On.SEARCH_TREE,
            }),
            getMore: debounce(function ($state) {
                this.dispatchSearch(this.query)
                    .then(items => {
                        if (items.length > 0) {
                            this.items.push.apply(this.items, items)
                            $state.loaded()
                        } else {
                            $state.complete()
                        }
                    })
            }, 300),
        },
    }
</script>