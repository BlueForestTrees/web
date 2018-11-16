<template>
    <v-card class="ma-1">
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