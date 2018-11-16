<template>
    <v-card class="ma-1">
        <v-card-text v-if="user" class="text-md-center">
            <p>Vous n'avez pas d'équipe. Vous pouvez:</p>
            <v-list>
                <li><v-icon>add</v-icon>Créer une équipe</li>
                <li>
                    <v-icon>person_add</v-icon>
                    Inviter quelqu'un à rejoindre votre équipe.
                </li>
            </v-list>
            <p>Les équipes permettent de partager les droits de modification sur les produits/services, les paniers, les puzzles, etc.</p>
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