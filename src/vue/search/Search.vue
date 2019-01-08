<template>
    <v-container key="search" grid-list-md text-xs-center>

        <v-layout row wrap justify-center align-center mx-5 xs-4 mb-1>
            <search-text :value="search.name" @input="nameChange" class="not-too-large"/>
        </v-layout>

        <v-layout :column="$vuetify.breakpoint.xsOnly" align-center justify-center class="mb-3">
            <v-menu v-model="showCat" :close-on-content-click="false" max-width="500px" offset-y class="ml-3">
                <div slot="activator" class="subheading">
                    <v-layout row align-center>
                        <span v-if="selectedCat"><b>{{selectedCat}}</b></span>
                        <span v-else>Catégorie</span>
                        <v-icon>arrow_drop_down</v-icon>
                    </v-layout>
                </div>
                <v-card>
                    <search-cat @input="catChange" map="catSelection"/>
                </v-card>
            </v-menu>
        </v-layout>

        <v-card>
            <search-comp :filter="filter" @select="select"/>
        </v-card>

    </v-container>
</template>

<script>
    import On from "../../const/on"
    import {mapActions, mapGetters, mapState} from "vuex"
    import SearchCat from "./SearchCat"
    import SearchText from "./SearchText"
    import {GO} from "../../const/go"
    import VoteFor from "../messages/VoteFor"

    const SearchComp = () => import(/* webpackChunkName: "SearchComp" */ './SearchComp')
    const ImpactEntries = () => import(/* webpackChunkName: "ImpactEntries" */ '../impact/ImpactEntries')
    const FacetEntries = () => import(/* webpackChunkName: "FacetEntries" */ '../facet/FacetEntries')

    export default {
        name: "search",
        data: () => ({
            On, GO,
            showCat: false,
            showEnv: false,
            showRes: false,
            showFac: false,
            type: null
        }),
        components: {VoteFor, ImpactEntries, FacetEntries, SearchText, SearchCat, SearchComp},
        methods: {
            ...mapActions({
                goto: On.GO_TO,
                addToBasket: On.ADD_TO_BASKET,
                compare: On.GO_COMPARE,
                showDialog: On.SHOW_DIALOG,
                unselect: On.UNSELECT,
                clearSearch: On.CLEAR_SEARCH
            }),
            nameChange(name) {
                this.search.name = name
            },
            catChange(cats) {
                this.search.cats = cats
                this.showCat = false
            },
            select(item) {
                this.$emit('select', item)
            }
        },
        computed: {
            ...mapGetters(['filter', 'hasFilter']),
            ...mapState({search: s => s.search}),
            selectedCat() {
                let length = this.search.cats.length
                return length > 0 && this.search.cats[length - 1].name
            }
        }
    }
</script>