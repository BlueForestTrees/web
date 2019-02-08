<template>
    <v-container key="search" grid-list-md text-xs-center>

        <v-layout row wrap justify-center align-center mx-5 xs-4 mb-1>
            <search-text :value="search.name" @input="pickName" class="not-too-large"/>
        </v-layout>

        <v-layout :column="$vuetify.breakpoint.xsOnly" align-center justify-center>

            <cat-picker @input="pickCat" :value="search.cats"/>
            <owner-picker @input="pickOwner" :value="search.owner"/>

        </v-layout>

        <search-comp :filter="filter" @select="select" class="mt-3"/>

    </v-container>
</template>

<script>
    import On from "../../const/on"
    import {mapActions, mapGetters, mapState} from "vuex"
    import SearchText from "./SearchText"
    import {GO} from "../../const/go"
    import VoteFor from "../messages/VoteFor"
    import CatPicker from "./CatPicker"
    import OwnerPicker from "./OwnerPicker"

    const SearchComp = () => import(/* webpackChunkName: "SearchComp" */ './SearchComp')
    const ImpactEntries = () => import(/* webpackChunkName: "ImpactEntries" */ '../impact/ImpactEntriesPicker')
    const FacetEntries = () => import(/* webpackChunkName: "FacetEntries" */ '../facet/FacetEntryPicker')

    export default {
        name: "search",
        data: () => ({
            On, GO,
            type: null
        }),
        components: {OwnerPicker, CatPicker, VoteFor, ImpactEntries, FacetEntries, SearchText, SearchComp},
        methods: {
            ...mapActions({
                goto: On.GO_TO,
                addToBasket: On.ADD_TO_BASKET,
                compare: On.GO_COMPARE,
                showDialog: On.SHOW_DIALOG,
                unselect: On.UNSELECT,
                clearSearch: On.CLEAR_SEARCH
            }),
            pickCat(cats) {
                this.search.cats = cats
            },
            pickName(name) {
                this.search.name = name
            },
            pickOwner(owner) {
                this.search.owner = owner
            },
            select(item) {
                this.$emit('select', item)
            }
        },
        computed: {
            ...mapGetters(['filter', 'hasFilter']),
            ...mapState({search: s => s.search}),
        }
    }
</script>