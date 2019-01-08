<template>
    <v-container key="my-prods" grid-list-md text-xs-center>
        <v-container v-if="!user">Connectez-vous pour lister vos produits et services.</v-container>
        <v-card v-else>
            <search-comp :filter="ownerFilter" @select="select">
                <v-card-text slot="no-results" class="text-md-center">
                    Vous ne possédez aucun produit.
                    <br>
                    Vous pouvez <span @click="goCreateTree" style="cursor:pointer"><v-icon class="icon-line" color="primary">add</v-icon>Créer un produit ou un service</span>
                    depuis le <span @click="switchLeftMenu" style="cursor:pointer"><v-icon class="icon-line" color="primary">menu</v-icon>menu de gauche.</span>
                </v-card-text>
            </search-comp>
        </v-card>
    </v-container>
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
        props: ['user'],
        methods: {
            ...mapActions({
                switchLeftMenu: On.SWITCH_LEFT_MENU,
                goCreateTree: On.GO_CREATE_TREE
            }),
            select(item) {
                this.$emit('select', item)
            }
        },
        computed: {
            ownerFilter() {
                return this.user && {oid: this.user._id}
            }
        },
    }
</script>