<template>
    <v-flex key="search">
        <v-layout row wrap justify-center align-center class="ma-4">
            <v-icon color="blue">search</v-icon>
            <span class="title">Recherche</span>
        </v-layout>
        <v-layout :column="$vuetify.breakpoint.xsOnly" align-center justify-center>
            <v-menu v-model="showType" max-width="500px" offset-y>
                <div slot="activator" class="subheading">
                    <v-layout row align-center>
                        <span>{{label}}</span>
                        <v-icon>arrow_drop_down</v-icon>
                    </v-layout>
                </div>
                <v-card>
                    <v-list>
                        <v-list-tile v-if="type!==On.SEARCH_TREE" @click="setType(On.SEARCH_TREE)" color="blue">{{labels[On.SEARCH_TREE]}}</v-list-tile>
                        <v-list-tile v-if="type!==On.SEARCH_IMPACT_ENTRY" @click="setType(On.SEARCH_IMPACT_ENTRY)" color="blue">{{labels[On.SEARCH_IMPACT_ENTRY]}}</v-list-tile>
                        <v-list-tile v-if="type!==On.SEARCH_FACET_ENTRY" @click="setType(On.SEARCH_FACET_ENTRY)" color="blue">{{labels[On.SEARCH_FACET_ENTRY]}}</v-list-tile>
                    </v-list>
                </v-card>
            </v-menu>
            <template v-if="type===On.SEARCH_TREE">
                <v-menu v-model="showCat" :close-on-content-click="false" max-width="500px" offset-y class="ml-3">
                    <div slot="activator" class="subheading">
                        <v-layout row align-center>
                            <span>Catégorie</span>
                            <v-icon>arrow_drop_down</v-icon>
                        </v-layout>
                    </div>
                    <v-card>
                        <search-cat v-model="search.cats" @input="showCat=false" map="catSelection"/>
                    </v-card>
                </v-menu>
                <v-menu v-model="showName" :close-on-content-click="false" max-width="500px" offset-y class="ml-3">
                    <div slot="activator" class="subheading">
                        <v-layout row align-center>
                            <span>Nom</span>
                            <v-icon>arrow_drop_down</v-icon>
                        </v-layout>
                    </div>
                    <v-card>
                        <search-name @input="nameChange"></search-name>
                    </v-card>
                </v-menu>
            </template>
        </v-layout>
        <v-divider class="mt-3"/>

        <span v-if="type===On.SEARCH_TREE">
            <trunk-filter v-if="filter" :search="search"/>
            <search-comp :filter="filter" :type="type"/>
        </span>
        <facet-entries v-else-if="type===On.SEARCH_FACET_ENTRY"/>
        <impact-entries v-else-if="type===On.SEARCH_IMPACT_ENTRY"/>

    </v-flex>
</template>

<script>
    import On from "../../const/on"
    import {mapActions, mapGetters, mapState} from "vuex"
    import SearchCat from "./SearchCat"
    import SearchName from "./SearchName"

    const SearchComp = () => import(/* webpackChunkName: "SearchComp" */ './SearchComp')
    const TrunkFilter = () => import(/* webpackChunkName: "TrunkFilter" */ './TrunkFilter')
    const ImpactEntries = () => import(/* webpackChunkName: "ImpactEntries" */ '../impact/ImpactEntries')
    const FacetEntries = () => import(/* webpackChunkName: "FacetEntries" */ '../facet/FacetEntries')

    export default {
        name: "search",
        components: {ImpactEntries, FacetEntries, SearchName, SearchCat, SearchComp, TrunkFilter},
        methods: {
            ...mapActions({
                goTree: On.GO_TREE,
                addToBasket: On.ADD_TO_BASKET,
                compare: On.GO_COMPARE,
                showDialog: On.SHOW_DIALOG,
                unselect: On.UNSELECT,
                clearSearch: On.CLEAR_SEARCH
            }),
            nameChange(name) {
                this.search.name = name
                this.showName = false
            },
            setType(type) {
                this.unselect()
                this.clearSearch()
                this.type = type
            }
        },
        data: function () {
            return {
                On,
                showCat: false,
                showName: false,
                showType: false,
                type: On.SEARCH_TREE,
                labels: {
                    [On.SEARCH_TREE]: "Produits, Services",
                    [On.SEARCH_IMPACT_ENTRY]: "Environnement",
                    [On.SEARCH_FACET_ENTRY]: "Propriétés"
                }
            }
        },
        computed: {
            ...mapGetters(['filter', 'hasFilter']),
            ...mapState({search: s => s.search}),
            label() {
                return this.labels[this.type]
            }
        }
    }
</script>