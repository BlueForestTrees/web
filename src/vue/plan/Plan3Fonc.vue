<template>
    <v-card flat id="f">
        <h1 class="display-3 font-weight-thin">Fonctions</h1>
        <p>
            Créer une ressource
            Rechercher
            Consulter les ressources
            Consulter le bilan des impacts
            Consulter le bilan des ressources
            Comparer les impacts
            Comparer les propriétés
            Comparer le bilan des ressources
            Comparer une selection d'élements
            Attribuer des ressources
            Attribuer des propriétés
            Attribuer des impacts
            Attribuer des transports


            Diffuser un produit, une comparaison
        </p>
        <h2 class="display-1 font-weight-thin subtitle">Discussion</h2>
        <p @click="showMessages(c2)" class="hand">
            Donnez votre opinion sur les fonctions
            <v-icon small color="primary" small>chat_bubble</v-icon>
        </p>
    </v-card>
</template>

<script>
    export default {
        name: "plan-func"
    }
</script>