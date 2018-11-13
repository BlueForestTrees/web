<template>
    <v-card flat id="b">
        <h1 class="display-3 font-weight-thin">Besoin</h1>
        <p>Besoin d'une plateforme commune pour les relations privée-professionnel et les communautés qui s'en dégagent.</p>
        <p>Commun: accessible aux plus petites entreprises et actions groupées</p>
        <p>
            Réconciliation
        </p>
        <p>Transparence</p>
        <p>Culture des écosystèmes</p>
        <p>Source d'information partagée</p>
        <p>
            Responsabilisation et Déculpabilisation.
        </p>
        <p>
            Prise de conscience de son profil de consommateur, de ses points forts et de ses points faibles.
            Connaissance de son potentiel de progression, et progresser idéalement sans effort, frustration, ou dépenses supplémentaire.
            Avoir une idée de la proportion de son apport individuel sur le collectif.
        </p>
        <p>
            Les personnes ont besoin d'une perception, d'une conscience de la relation entre leurs activités personnelles de tous les jours et les impacts sur l'environnement de l'activité économique de l'homme.
        </p>
        <h2 class="display-1 font-weight-thin subtitle">Discussion</h2>
        <p @click="showMessages(b1)" class="hand">
            Donnez votre opinion sur les besoins
            <v-icon small color="primary" small>chat_bubble</v-icon>
        </p>
    </v-card>
</template>

<script>
    export default {
        name: "plan-besoin"
    }
</script>