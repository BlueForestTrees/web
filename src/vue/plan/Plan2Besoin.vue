<template>
    <div id="b">
        <h1 class="display-3 font-weight-thin">Besoin</h1>
        <p><v-icon color="orange">new_releases</v-icon><i>Ceci est une ébauche! Votre participation serait utile.</i></p>
        <ul style="list-style-type:decimal">
            <li>Besoin de toutes les idées possibles pour mettre en oeuvre <a href="https://www.ademe.fr/expertises/economie-circulaire" target="_blank">l'économie circulaire</a>.</li>
            <li>Besoin d'un lieu où l'environnement est au centre, et les personnes et entreprises autour, se concertant, etc.. et laisser le résultat du travail accessible à d'autres.</li>
            <li>L'impact environnemental est le sujet d'une communauté grandissante mais restreinte. Pourrait-on en faire une partie intégrante de l'économie?</li>
            <li>Toutes nos activités du quotidien et les impacts sur l'environnement sont liés. Nous avons besoin d'assumer les faits, ce qui impose de les connaître.</li>
            <li>Besoin d'un outil commun: accessible aux plus petites entreprises</li>
            <li>Besoin de partager, et de relier des sources d'informations entre elles.</li>
            <li>Selon ses goûts, besoin de se réunir autour d'une question pour des concertations, des actions groupées.</li>
            <li>A l'instar de l'Open-Source et des logiciels libres, les entreprises peuvent-elles profiter d'une certaine transparence?</li>
            <li>Le grand public aurait-il besoin d'être réconcilié avec la question environnementale?</li>
            <li>Besoin de notions de bases dans le fonctionnement des écosystèmes. Basé sur des éléments réels, actuels et proches.</li>
            <li>Y a-t-il un besoin à ce que les particuliers utilisent le même outil qu'un professionnel? (renseignement ludique et travail)</li>
            <li>Une idée de la part individuelle / part collective</li>
            <li>Besoin de perennité, d'un lieu où sont stockée toutes les informations s'accumulant (à l'opposé du système de news qui n'a pas de passé).</li>
            <li>Besoin d'y voir clair dans des situations complexes, à "multi-critère"</li>
            <li>...?</li>
        </ul>

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