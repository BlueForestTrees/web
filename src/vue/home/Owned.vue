<template>
    <span class="subheading">

        <v-card class="ma-1">
            <v-card-title><v-icon>panorama_fish_eye</v-icon><h6 class="title">Vos produits et services</h6></v-card-title>
            <v-divider/>
            <search-comp v-if="ownerFilter" :filter="ownerFilter">
                <v-card-text slot="no-results" class="text-md-center">
                    <br>
                    Vous pouvez <span @click="goCreateTree" style="cursor:pointer"><v-icon class="icon-line" color="primary">add</v-icon>Créer un produit ou un service</span>
                    depuis le <span @click="switchLeftMenu" style="cursor:pointer"><v-icon class="icon-line" color="primary">menu</v-icon>menu de gauche.</span>
                </v-card-text>
            </search-comp>
            <v-container v-else>Connectez-vous pour lister vos produits et services.</v-container>
        </v-card>

        <v-card class="ma-1">
            <v-card-title>
                <v-tooltip bottom>
                    <v-layout align-center slot="activator">
                        <v-icon color="orange" large>new_releases</v-icon>
                        <v-icon>border_all</v-icon>
                        <h6 class="title">Puzzles</h6>
                    </v-layout>
                    <span style="pointer-events: none">Cette fonction est à l'étude! Accélérez-la en votant pour elle sur la road map.</span>
                </v-tooltip>
            </v-card-title>
            <v-divider/>
            <v-card-text v-if="user" class="text-md-center">
                <p>Vous n'avez pas de puzzle.</p>
                <p>Vous pouvez en créer un en sélectionnant trois produits depuis votre panier puis en choissant "puzzle".</p>
            </v-card-text>
            <v-container v-else>Connectez-vous pour lister vos équipes.</v-container>
        </v-card>

        <v-card class="ma-1">
            <v-card-title>
                <v-tooltip bottom>
                    <v-layout align-center slot="activator">
                        <v-icon color="orange" large>new_releases</v-icon>
                        <v-icon>flag</v-icon>
                        <h6 class="title">Equipes</h6>
                    </v-layout>
                    <span style="pointer-events: none">Cette fonction est à l'étude! Accélérez-la en votant pour elle sur la road map.</span>
                </v-tooltip>
            </v-card-title>
            <v-divider/>
            <v-card-text v-if="user" class="text-md-center">
                <p>Vous n'avez pas d'équipe. Vous pouvez:</p>
                <v-list>
                    <li><v-icon>add</v-icon>Créer une équipe</li>
                    <li>
                        <v-icon>person_add</v-icon>
                        Inviter quelqu'un à rejoindre votre équipe.
                    </li>
                </v-list>
            </v-card-text>
            <v-container v-else>Connectez-vous pour lister vos équipes.</v-container>
        </v-card>

        <v-card class="ma-1">
            <v-card-title>
                <v-icon>chat_bubble</v-icon>
                <h6 class="title">Messages</h6>
            </v-card-title>
            <v-divider/>
            <v-card-text v-if="user" class="text-md-center">
                <p>Vous n'avez pas encore écrit de message.</p>
                <p>Vous pouvez vous ballader dans l'application et laisser des messages d'encouragement sur les travaux en cours avec ce type de bouton:</p>
                <v-layout column align-center><open-message :section="secs.MESSAGE"/></v-layout>
            </v-card-text>
            <v-container v-else>Connectez-vous pour lister vos équipes.</v-container>
        </v-card>
    </span>
</template>

<script>
    import On from "../../const/on"
    import SearchComp from "../search/SearchComp"
    import {mapActions, mapState} from "vuex"
    import OpenMessage from "../common/OpenMessage"
    import {secs} from "../../const/sections"

    export default {
        name: "owned",
        components: {OpenMessage, SearchComp},
        data(){
            return {secs}
        },
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