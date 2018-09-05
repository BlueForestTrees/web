<template>
    <span>

        <v-layout row wrap justify-center align-center class="ma-4">
            <span class="title">Recherche</span>
        </v-layout>

        <v-expansion-panel popout v-model="panels">
            <v-expansion-panel-content>
                <div slot="header" class="subheading">
                    <span v-if="cats.length > 0">{{cats[cats.length-1].name}}</span>
                    <span v-else>Catégorie...</span>
                </div>
                <v-container>
                    <search-cat @select="catChange" @ok="panels=null"/>
                </v-container>
            </v-expansion-panel-content>
            <v-expansion-panel-content>
                <div slot="header" class="subheading">
                    <span v-if="name && name.length > 0">Nom: {{name}}</span>
                    <span v-else>Nom...</span>
                </div>
                <v-container>
                    <v-text-field label="Nom" autofocus v-model="name" @enter="panels=null" clearable v-on:keyup.enter="panels=null"/>
                    <v-layout>
                        <v-spacer/>
                        <v-btn color="primary" @click="panels=null">Ok</v-btn>
                    </v-layout>
                </v-container>
            </v-expansion-panel-content>
        </v-expansion-panel>
        <search-comp :filter="filter" :ready="ready">
            <template slot-scope="{ s }">
                <v-toolbar-items>
                    <v-tooltip bottom>
                        <v-btn slot="activator" v-if="s.selectionCount" flat dense @click="addToBasket(s.selection);s.unselect()">ajouter<v-icon>arrow_right_alt</v-icon><v-icon>shopping_basket</v-icon></v-btn>
                        <span style="pointer-events: none">Ajouter au panier</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <v-btn slot="activator" v-if="s.oneSelected" flat dense @click="goTree(s.oneSelected)">ouvrir
                            <v-icon>category</v-icon>
                        </v-btn>
                        <span style="pointer-events: none">Ouvrir</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <v-btn slot="activator" v-if="s.twoSelected" flat dense @click="compare(s.twoSelected)">comparer<v-icon>compare_arrows</v-icon></v-btn>
                        <span style="pointer-events: none">Comparer</span>
                    </v-tooltip>
                </v-toolbar-items>
                <v-spacer/>
                <v-toolbar-items>
                    <v-tooltip bottom>
                        <v-btn slot="activator" icon dense @click="s.unselect()"><v-icon>close</v-icon></v-btn>
                        <span style="pointer-events: none">Fermer</span>
                    </v-tooltip>
                </v-toolbar-items>
            </template>
        </search-comp>
    </span>
</template>

<script>
    import On from "../const/on"
    import {mapActions} from "vuex"
    import SearchComp from "./SearchComp"
    import SearchCat from "./SearchCat"
    import Expendable from "./common/Expendable"
    import Hider from "./tree/Hider"

    export default {
        name: "search",
        data: function () {
            return {
                name:null,
                cats:[],
                ready: false,
                panels:[]
            }
        },
        components: {Hider, Expendable, SearchCat, SearchComp},
        computed:{
            filter(){
                const cat = {}
                for(let i = 0; i < this.cats.length; i++){
                    cat["c"+(i+1)] = this.cats[i]._id
                    this.ready = true
                }
                const f = {cat}
                if(this.name){
                    f.term = this.name
                    this.ready = true
                }
                return f
            }
        },
        methods: {
            ...mapActions({
                goTree: On.GO_TREE,
                addToBasket: On.ADD_TO_BASKET,
                compare: On.GO_COMPARE,
            }),
            catChange(cats) {
               this.cats = cats
            }
        },
    }
</script>