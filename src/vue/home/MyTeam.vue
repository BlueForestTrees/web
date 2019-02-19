<template>
    <v-card class="ma-5">
        <subpage-title title="Mes équipes" icon="group"/>
        <v-card-text v-if="user" class="text-md-center font-weight-thin">
            <p class="font-weight-bold"><v-icon color="orange" small>new_releases</v-icon>Fonction à venir</p>

            <p>Les équipes permettent de travailler à plusieurs.</p>
            <p>Vous n'avez pas d'équipe. Vous pouvez:</p>
            <v-list>
                <li>
                    <v-icon>add</v-icon>
                    Créer une équipe
                </li>
                <li>
                    <v-icon>person_add</v-icon>
                    Inviter quelqu'un à rejoindre votre équipe.
                </li>
            </v-list>
        </v-card-text>
        <v-container v-else>Connectez-vous pour voir vos équipes.</v-container>
    </v-card>
</template>

<script>
    import {mapState} from "vuex"
    import SubpageTitle from "../tree/SubpageTitle"

    export default {
        name: "my-team",
        components: {SubpageTitle},
        computed: {...mapState({user: s => s.user})}
    }
</script>