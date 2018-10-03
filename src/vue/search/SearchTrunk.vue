<template>
    <span>
        <v-layout row align-center justify-center>
            <v-menu v-model="showCat" :close-on-content-click="false" max-width="500px" offset-y>
                <div slot="activator" class="subheading">
                    <v-layout row align-center>
                        <span>Catégorie</span>
                        <v-icon>arrow_drop_down</v-icon>
                    </v-layout>
                </div>
                <v-card>
                    <search-cat v-model="search.cats" @input="showCat=false"/>
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
        </v-layout>
        <trunk-filter class="mt-3" v-if="filter" :search="search"/>
        <search-comp :filter="filter">
            <template slot-scope="{ s }">
                <slot :s="s"></slot>
            </template>
        </search-comp>
    </span>
</template>
<script>
    import {mapState, mapGetters} from "vuex"
    import SearchCat from "./SearchCat"
    import SearchComp from "./SearchComp"
    import SearchName from "./SearchName"
    import TrunkFilter from "./TrunkFilter"

    export default {
        name: 'search-trunk',
        components: {TrunkFilter, SearchName, SearchComp, SearchCat},
        data: function () {
            return {
                showCat: false,
                showName: false
            }
        },
        computed: {
            ...mapGetters(['filter', 'hasFilter']),
            ...mapState({search: s => s.search}),
        },
        methods: {
            nameChange(name) {
                this.search.name = name
                this.showName = false
            }
        }
    }
</script>