<template>
    <v-card class="ma-1">
        <v-card-title>
            <v-tooltip bottom>
                <v-layout align-center slot="activator">
                    <v-icon color="orange" large>new_releases</v-icon>
                    <v-icon>flag</v-icon>
                    <h6 class="title">Equipes</h6>
                </v-layout>
                <span style="pointer-events: none">Cette fonction est à l'étude! Accélérez-la en votant pour elle dans la section 'Fonctions à venir' du menu de gauche.</span>
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
        <v-container v-else>Connectez-vous pour voir vos équipes.</v-container>
    </v-card>
</template>

<script>
    export default {
        name:"my-team",
        props: {user: Object},
    }
</script>