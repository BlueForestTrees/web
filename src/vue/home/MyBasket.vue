<template>
    <v-card class="ma-1">
        <v-card-title>
            <v-tooltip bottom>
                <v-layout align-center slot="activator">
                    <v-icon color="orange" large>new_releases</v-icon>
                    <v-icon>flag</v-icon>
                    <h6 class="title">Paniers</h6>
                </v-layout>
                <span style="pointer-events: none">Cette fonction est à l'étude! Accélérez-la en votant pour elle dans la section 'Fonctions à venir' du menu de gauche.</span>
            </v-tooltip>
        </v-card-title>
        <v-divider/>
        <v-card-text v-if="user" class="text-md-center">
            <p>Vous n'avez pas de panier enregistré.</p>
            <p> Vous pouvez enregistrer des selections de produits depuis le panier et leur donnant un nom.</p>
            <p>Vous pourrez ensuite les partager ou les retrouver plus tard.</p>
        </v-card-text>
        <v-container v-else>Connectez-vous pour voir vos équipes.</v-container>
    </v-card>
</template>

<script>
    export default {
        name:"my-basket",
        props: {user: Object},
    }
</script>