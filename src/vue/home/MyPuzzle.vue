<template>
    <v-card class="ma-1">
        <v-card-title>
            <v-tooltip bottom>
                <v-layout align-center slot="activator">
                    <v-icon color="orange" large>new_releases</v-icon>
                    <v-icon>border_all</v-icon>
                    <h6 class="title">Puzzles</h6>
                </v-layout>
                <span style="pointer-events: none">Cette fonction est à l'étude! Accélérez-la en votant pour elle dans la section 'Fonctions à venir' du menu de gauche.</span>
            </v-tooltip>
        </v-card-title>
        <v-divider/>
        <v-card-text v-if="user" class="text-md-center">
            <p>Vous n'avez pas de puzzle.</p>
            <p>Vous pouvez en créer un en sélectionnant trois produits depuis votre panier puis en choissant "puzzle".</p>
        </v-card-text>
        <v-container v-else>Connectez-vous pour voir vos puzzles.</v-container>
    </v-card>
</template>

<script>
    export default {
        name: "my-puzzle",
        props: {user: Object},
    }
</script>