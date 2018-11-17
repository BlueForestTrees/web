<template>
    <span class="ma-1">
        <v-card-text v-if="user" class="text-md-center">
            <p>Vous n'avez pas de sélection enregistrée.</p>
            <p>Vous pouvez enregistrer des selections de produits depuis la recherche et leur donner un nom.</p>
            <p>Vous pourrez ensuite les partager ou les retrouver plus tard.</p>
        </v-card-text>
        <v-container v-else>Connectez-vous pour voir vos sélections enregistrées.</v-container>
    </span>
</template>
<script>
    export default {
        name:"my-basket",
        props: {user: Object},
    }
</script>