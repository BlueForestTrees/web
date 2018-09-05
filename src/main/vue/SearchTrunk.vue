<template>
    <span>
        <v-expansion-panel popout v-model="panels">
            <v-expansion-panel-content>
                <div slot="header" class="subheading">
                    <span>{{'Catégorie... ' + (search.cats.length > 0 ? search.cats[search.cats.length-1].name : '')}}</span>
                </div>
                <v-container>
                    <search-cat v-model="search.cats" @ok="panels=null"/>
                </v-container>
            </v-expansion-panel-content>
            <v-expansion-panel-content>
                <div slot="header" class="subheading">
                    <span v-if="search.name && search.name.length > 0">Nom: {{search.name}}</span>
                    <span v-else>Nom...</span>
                </div>
                <v-container>
                    <v-text-field label="Nom" autofocus v-model="search.name" @enter="panels=null" clearable
                                  v-on:keyup.enter="panels=null"/>
                    <v-layout>
                        <v-spacer/>
                        <v-btn color="primary" @click="panels=null">Ok</v-btn>
                    </v-layout>
                </v-container>
            </v-expansion-panel-content>
        </v-expansion-panel>
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

    export default {
        name: 'search-trunk',
        components: {SearchComp, SearchCat},
        data: function () {
            return {
                panels: []
            }
        },
        computed: {
            ...mapGetters(['filter']),
            ...mapState({search: s => s.search}),
        },
    }
</script>