<template>
    <span class="subheading">

        <v-card class="ma-1">
            <v-card-title><v-icon>panorama_fish_eye</v-icon><h6 class="title">Vos produits et services</h6></v-card-title>
            <v-divider/>
            <search-comp v-if="user" :filter="ownerFilter">
                <v-card-text slot="no-results" class="text-md-center">
                    <br>
                    Vous pouvez <span @click="goCreateTree" style="cursor:pointer"><v-icon class="icon-line" color="primary">add</v-icon>Créer un produit ou un service</span>
                    depuis le <span @click="switchLeftMenu" style="cursor:pointer"><v-icon class="icon-line" color="primary">menu</v-icon>menu de gauche.</span>
                </v-card-text>
            </search-comp>
            <v-container v-else>Connectez-vous pour lister vos produits et services.</v-container>
        </v-card>

    </span>
</template>

<script>
    import On from "../../const/on"
    import SearchComp from "../search/SearchComp"
    import {mapActions} from "vuex"
    import OpenMessage from "../common/OpenMessage"
    import MyMessages from "./MyMessage"
    import MyTeam from "./MyTeam"
    import MyPuzzle from "./MyPuzzle"

    export default {
        name: "my-product",
        components: {MyPuzzle, MyTeam, MyMessages, OpenMessage, SearchComp},
        props:['user'],
        methods: {
            ...mapActions({
                switchLeftMenu: On.SWITCH_LEFT_MENU,
                goCreateTree: On.GO_CREATE_TREE,
            }),
        },
        computed: {
            ownerFilter() {
                return this.user && {oid: this.user._id}
            }
        },
    }
</script>