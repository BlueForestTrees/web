<template>
    <v-card class="ma-1">
        <v-card-text v-if="user" class="text-md-center">
            <p>Vous n'avez pas de puzzle.</p>
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