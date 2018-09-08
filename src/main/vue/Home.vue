<template>
    <v-container>
        <v-card>
            <span v-if="ownerFilter">
                <v-card-title>Vos produits et services</v-card-title>
                <v-divider/>
                <search-comp :filter="ownerFilter">
                    <v-card-text class="text-md-center">
                        <div>
                            Vous n'êtes propriétaire d'aucun produit ou service.
                            Faites <span @click="openAddTrunk" style="cursor:pointer"><v-icon class="icon-line" color="primary">add</v-icon>"Créer"</span>
                            depuis le <span @click="switchLeftMenu"  style="cursor:pointer"><v-icon class="icon-line" color="primary">menu</v-icon>menu de gauche.</span>
                        </div>
                    </v-card-text>
                </search-comp>
            </span>
            <v-container v-else>Connectez-vous pour lister vos produits et services.</v-container>
        </v-card>
    </v-container>
</template>

<script>
    import SearchComp from "./SearchComp"
    import {mapState, mapActions} from "vuex"
    import {Dial} from "../const/dial"
    import On from "../const/on"

    export default {
        components: {SearchComp},
        computed: {
            ...mapState(['user']),
            ownerFilter() {
                return this.user && {oid: this.user._id}
            }
        },
        methods: {
            ...mapActions({showDialog:On.SHOW_DIALOG, switchLeftMenu: On.SWITCH_LEFT_MENU}),
            openAddTrunk() {
                this.showDialog({dialog: Dial.ADD_TRUNK})
            }
        }
    }
</script>