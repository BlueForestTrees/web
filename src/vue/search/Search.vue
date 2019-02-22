<template>
    <v-container key="search">

        <v-layout row wrap justify-center align-center xs-4 mb-1>
            <v-list-tile-avatar class="scope-tree logo my-3"></v-list-tile-avatar>
            <search-text :value="search.name" @input="pickName" class="not-too-half"/>
        </v-layout>

        <v-layout :column="$vuetify.breakpoint.xsOnly" align-center justify-center>
            <cat-picker @input="pickCat" :value="search.cats"/>
            <owner-picker @input="pickOwner" :value="search.owner"/>
        </v-layout>

        <v-card class="mt-3">
            <search-tree :filter="filter" @select="select" />
        </v-card>

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

    const SearchTree = () => import(/* webpackChunkName: "SearchComp" */ './SearchTree')
    const ImpactEntries = () => import(/* webpackChunkName: "ImpactEntries" */ '../impact/ImpactEntriesPicker')
    const FacetEntries = () => import(/* webpackChunkName: "FacetEntries" */ '../facet/FacetEntryPicker')

    export default {
        name: "search",
        data: () => ({
            On, GO,
            type: null
        }),
        components: {OwnerPicker, CatPicker, VoteFor, ImpactEntries, FacetEntries, SearchText, SearchTree},
        methods: {
            ...mapActions({
                goto: On.GO_TO,
                addToBasket: On.ADD_TO_BASKET,
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
            ...mapGetters(['filter']),
            ...mapState({search: s => s.search}),
        }
    }
</script>