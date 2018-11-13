<template>
    <div id="b">
        <h1 class="display-3 font-weight-thin">Besoin</h1>
        <p>En ACV on cherche les bonnes méthodes pour rendre compte d'informations "multi-critère".</p>
        <p>Avons-nous besoin de nous rendre compte du rapport entre nos activités du quotidien et les impacts sur l'environnement de l'activité économique?</p>
        <p>Une plateforme commune pour les relations privée-professionnel et les communautés qui s'en dégagent.</p>
        <p>Commun: accessible aux plus petites entreprises et actions groupées</p>
        <p>A l'instar de l'Open-Source des logiciels, les industries peuvent-ils profiter d'une certaine transparence?</p>
        <p>Le grand public aurait-il besoin d'être réconcilié avec la question environnementale?</p>
        <p>Le grand public, surtout les jeunes, ont-elles besoin d'une plus grande culture des écosystèmes?</p>
        <p>Y a-t-il un intérêt à ce que les particuliers utilisent le même outil qu'un professionnel? (renseignement ludique et travail)</p>
        <p>Peut-on amplifier le sentiment de responsabilisation et de déculpabilisation à la fois?</p>
        <p>Faut-il prendre conscience de son profil de consommateur, points forts/points faibles?</p>
        <p>Cela vous plairait-il d'avoir une idée de la proportion de la part individuelle dans la part de la ville? (ou du pays, ou de la planète)</p>
        <h2 class="display-1 font-weight-thin">Discussion</h2>
        <p><v-icon color="green" small>info</v-icon>Votre point de vue est essentiel à la poursuite de ce projet! :)</p>
        <open-message :section="secs.BESOIN"/>
    </div>
</template>

<script>
    import OpenMessage from "../common/OpenMessage"
    import {secs} from "../../const/sections"
    export default {
        name: "plan-besoin",
        data:()=>({secs}),
        components: {OpenMessage}
    }
</script>