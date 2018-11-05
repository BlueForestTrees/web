<template>
    <v-card>
        <v-card-title>Vos produits et services</v-card-title>
        <v-divider/>
        <search-comp :filter="ownerFilter" v-if="ownerFilter">
            <v-card-text slot="no-results" class="text-md-center">
                <br>
                Vous pouvez <span @click="goCreateTree" style="cursor:pointer"><v-icon class="icon-line" color="primary">add</v-icon>Créer un produit ou un service</span>
                depuis le <span @click="switchLeftMenu" style="cursor:pointer"><v-icon class="icon-line" color="primary">menu</v-icon>menu de gauche.</span>
            </v-card-text>
        </search-comp>
        <v-container v-else>Connectez-vous pour lister vos produits et services.</v-container>
    </v-card>
</template>

<script>
    import On from "../../const/on"
    import {Dial} from "../../const/dial"
    import SearchComp from "../search/SearchComp"
    import {mapActions, mapState} from "vuex"

    export default {
        name: "owned",
        components: {SearchComp},
        methods: {
            ...mapActions({
                switchLeftMenu: On.SWITCH_LEFT_MENU,
                goCreateTree: On.GO_CREATE_TREE,
            }),
        },
        computed: {
            ...mapState(['user']),
            ownerFilter() {
                return this.user && {oid: this.user._id}
            }
        },
    }
</script>