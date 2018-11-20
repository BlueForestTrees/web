<template>
    <v-flex>
        <selectable-list :items="items" no-qt><span slot="no-items"></span></selectable-list>
        <infinite-loading v-if="active" ref="iloading" @infinite="loadResults" spinner="spiral" :distance="500" style="padding-bottom: 3em">
            <span slot="no-more">{{items.length}} résultats</span>
            <span slot="no-results"><slot name="no-results">Pas de résultats. <a>Enregistrer la recherche pour que d'autres y répondent.</a><v-icon color="orange" small>new_releases</v-icon></slot></span>
            <span slot="spinner"><loader/></span>
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
            dispatchSearch: function (query) {
                return this.$store.dispatch(this.type, query)
            },
            reset: function () {
                this.active = this.filter !== null
                this.items = []
                if (this.active) {
                    this.$nextTick(() => {
                        this.$refs.iloading.$emit('$InfiniteLoading:reset')
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