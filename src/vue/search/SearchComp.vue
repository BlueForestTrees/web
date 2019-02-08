<template>
    <v-flex v-if="active">
        <v-list two-lines v-if="items && items.length">
            <template v-for="item in items">
                <v-list-tile :key="item._id" avatar @click="select(item)">
                    <v-list-tile-content>
                        <v-list-tile-title>{{ name(item) }}</v-list-tile-title>
                        <v-list-tile-sub-title>quantité: {{ qtUnit(item) }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-divider/>
            </template>
        </v-list>
        <infinite-loading v-if="active" ref="iloading" @infinite="loadResults" :distance="500" style="padding-bottom: 3em">
            <span slot="no-more">{{items.length}} résultat{{items.length > 1 ? 's':''}}</span>
            <span slot="no-results"><slot name="no-results"><div class="font-weight-thin bold-font mt-5">Pas de résultats</div></slot></span>
            <span slot="spinner"><loader class="mt-5"/></span>
        </infinite-loading>
    </v-flex>
</template>

<script>
    import selectable from "../mixin/Selectable"
    import On from "../../const/on"
    import InfiniteLoading from 'vue-infinite-loading'
    import debounce from 'lodash.debounce'
    import Loader from "../loader/Loader"
    import SelectableList from "../common/SelectableList"
    import {name, qtUnit} from "../../services/calculations"

    export default {
        name: 'search-comp',
        props: {
            ps: {default: 20},
            filter: Object,
            maxSelectionSize: Number,
            type: {type: String, default: On.SEARCH_TREE}
        },
        mixins: [selectable],
        components: {
            SelectableList,
            Loader,
            InfiniteLoading,
        },
        data() {
            return {
                items: [],
                active: null
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
        mounted() {
            this.reset()
        },
        methods: {
            name, qtUnit,
            select(item) {
                this.$emit('select', item)
            },
            dispatchSearch: function (query) {
                return this.$store.dispatch(this.type, query)
            },
            reset: function () {
                this.active = this.filter !== null
                this.items = []
                if (this.active) {
                    this.$nextTick(() => {
                        this.$refs.iloading && this.$refs.iloading.$emit('$InfiniteLoading:reset')
                    })
                }
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