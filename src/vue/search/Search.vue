<template>
    <v-container key="search" grid-list-md text-xs-center>

        <v-layout row justify-center mb-3 xs-6>
            <img src="/img/blue.svg" style="width:10%">
            <img src="/img/logo.svg" style="width:20%">
            <img src="/img/forest.svg" style="width:14%">
        </v-layout>

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
            <v-menu v-model="showEnv" offset-y class="ml-3" :close-on-content-click="false">
                <div slot="activator" class="subheading">
                    <v-layout row align-center>
                        <v-icon color="orange" small>new_releases</v-icon>
                        <span>Environnement</span>
                        <v-icon>arrow_drop_down</v-icon>
                    </v-layout>
                </div>
                <v-card>
                    <v-layout align-center pa-2>
                        <vote-for text="Voter pour: la recherche de produit en fonction des impacts environnementaux." feature="impact.search.vote" @vote="showEnv=false"/>
                    </v-layout>
                </v-card>
            </v-menu>
            <v-menu v-model="showRes" offset-y :close-on-content-click="false" class="ml-3">
                <div slot="activator" class="subheading">
                    <v-layout row align-center>
                        <v-icon color="orange" small>new_releases</v-icon>
                        <span>Ressources</span>
                        <v-icon>arrow_drop_down</v-icon>
                    </v-layout>
                </div>
                <v-card>
                    <v-layout align-center pa-2>
                        <vote-for text="Voter pour: la recherche de produit en fonction des ressources utilisées pour le fabrication, le transport, le recyclage..." feature="tank.search.vote" @vote="showRes=false"/>
                    </v-layout>
                </v-card>
            </v-menu>
            <v-menu v-model="showFac" offset-y :close-on-content-click="false" class="ml-3">
                <div slot="activator" class="subheading">
                    <v-layout row align-center>
                        <v-icon color="orange" small>new_releases</v-icon>
                        <span>Propriétés</span>
                        <v-icon>arrow_drop_down</v-icon>
                    </v-layout>
                </div>
                <v-card>
                    <v-layout align-center pa-2>
                        <vote-for text="Voter pour: la recherche de produit en fonction des propriétés comme le Prix, les apport Nutritionnels..." feature="facet.search.vote" @vote="showFac=false"/>
                    </v-layout>
                </v-card>
            </v-menu>
        </v-layout>

        <v-card>
            <search-comp :filter="filter" @select="goTree"/>
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
                goTree: On.GO_TREE,
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