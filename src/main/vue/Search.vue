<template>
    <span>

        <hider title="Recherche"/>

        <search-cat @select="catChange"/>

        <expendable title="Nom">
            <v-text-field label="Nom" autofocus v-model="name"/>
        </expendable>

        <v-divider/>

        <search-comp :filter="filter">
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
                cats:[]
            }
        },
        components: {Hider, Expendable, SearchCat, SearchComp},
        computed:{
            filter(){
                const cat = {}
                for(let i = 0; i < this.cats.length; i++){
                    cat["c"+(i+1)] = this.cats[i]._id
                }
                const f = {cat}
                if(this.name){
                    f.term = this.name
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