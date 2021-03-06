<template>
    <v-list v-if="enabled">
        <template v-for="(item,i) in items">
            <slot :item="item" :i="i" :length="items.length" :last="i === items.length - 1"/>
        </template>
        <infinite-loading ref="iloading" @infinite="loadResults" :distance="600">
            <span slot="no-more"><slot name="no-more">{{items.length}} résultat{{items.length > 1 ? 's':''}}</slot></span>
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
            ps: {default: 7, type: Number},
            action: {required: true, type: String},
            filter: Object,
            emptySearch: {type: Boolean, default: false},
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
                    aidx: (this.items && this.items.length > 0) ? this.items[this.items.length - 1]._id : null,
                    adate: (this.items && this.items.length > 0) ? this.items[this.items.length - 1].date : null,
                }
            }
        },
        methods: {
            ...mapActions({snackerror: On.SNACKERROR}),
            search: function (query) {
                return this.$store.dispatch(this.action, query).catch(this.snackerror)
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