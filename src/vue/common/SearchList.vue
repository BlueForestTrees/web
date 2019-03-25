<template>
    <v-list v-if="enabled">
        <template v-for="(item,i) in items">
            <slot :item="item" :i="i" :length="items.length"/>
        </template>
        <infinite-loading ref="iloading" @infinite="loadResults" :distance="500" style="padding-bottom: 3em">
            <span slot="no-more">{{items.length}} résultat{{items.length > 1 ? 's':''}}</span>
            <span slot="no-results"><slot name="no-results"><div class="font-weight-thin bold-font mt-5">Pas de résultats</div></slot></span>
            <span slot="spinner"><loader class="mt-5"/></span>
        </infinite-loading>
    </v-list>
</template>

<script>
    import InfiniteLoading from 'vue-infinite-loading'
    import Loader from "../loader/Loader"
    import debounce from 'lodash.debounce'
    import On from "../../const/on"
    import {mapActions} from "vuex"

    export default {
        name: "search-list",
        components: {Loader, InfiniteLoading},
        props: {
            ps: {default: 20, type: Number},
            type: {required: true, type: String},
            filter: Object,
            emptySearch: {type: Boolean, default: false},
            value: Boolean
        },
        data: () => ({
            items: [],
            enabled: null
        }),
        watch: {
            filter: function () {
                this.reset()
            }
        },
        created() {
            this.reset()
        },
        computed: {
            query: function () {
                return {
                    ...this.filter,
                    ps: this.ps,
                    aidx: (this.items && this.items.length > 0) ? this.items[this.items.length - 1]._id : null
                }
            }
        },
        methods: {
            ...mapActions({snackerror: On.SNACKERROR}),
            search: function (query) {
                return this.$store.dispatch(this.type, query).catch(this.snackerror)
            },
            reset: function () {
                this.enabled = this.filter !== null || this.emptySearch
                this.items = []
                if (this.enabled) {
                    this.$nextTick(() => {
                        this.$refs.iloading && this.$refs.iloading.$emit('$InfiniteLoading:reset')
                    })
                }
            },
            loadResults: debounce(function ($state) {
                this.search(this.query)
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