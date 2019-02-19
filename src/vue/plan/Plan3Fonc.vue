<template>
    <div id="f">

        <v-layout class="display-2 font-weight-thin mb-3">
            Offre
            <v-icon color="primary" x-large class="ml-2">fiber_manual_record</v-icon>
        </v-layout>

        <p>BlueForest est une plateforme publique orientée autour du cycle de vie des produits. On se propose de répondre à des questions comme: quels sont les produits qui émettent 100kg de CO2, est-ce que je pollue plus avec un lave-vaisselle ou à la main? Combien d'éolienne pour faire autant qu'une centrale? etc.</p>
        <p>Les données viennent d'importations de bases de données existantes (Ademe, OpenFoodFact, ...), des saisies d'entreprises et de particuliers. Les données n'ont bien sûr pas le même statut ni le même usage selon leur provenance</p>
        <ul>
            <li>L'inscription et l'usage est libre.</li>
            <li>Chacun peut consulter les informations de tous.</li>
            <li>On ne peut modifier que ses propres informations.</li>
            <li>On peut proposer des modifications sur les informations des autres.</li>
        </ul>
        <p></p>
        <p>Blueforest gère le stockage des données et les services fournis autour de ces données, c'est tout.</p>
        <p>Le projet n'a pas l'ambition de garantir "l'absolue vérité" à propos des informations environnementales. La simple raison est simple: cela est impossible et pas souhaitable. Cela retirerait la reflexion et l'esprit critique de l'utilisateur, alors même que l'on cherche à le contraire. Au lieu de garantir une vérité pure, nous préférons garantir la présence des sources des informations, l'accès à celles-ci, et cela sur tout les écrans de l'application (et pas dans une interligne écrite en police grise 6pt)</p>
        <p>Les axes choisis sont l'argumentation, la démonstration, la transparence, la pédagogie, la vulgarisation, la communication. On peut diffuser des résultats de démonstrations. Ceux-ci sont toujours liées aux détails de calculs, aux sources et aux auteurs.</p>


        <p><b>Gamification & sourcing.</b></p>

        <h2 class="display-1 font-weight-thin">Equivalences</h2>
        <p>Les équivalences nous permettent de prendre conscience de l’importance d’une chose en la comparant avec une autre de même importance (X équivaut Y). Exemple d’équivalence: On génère autant de réchauffement climatique en utilisant chaque jour le rouge à lèvre X qu’en mangeant une fois par semaine la pâtisserie Y.</p>


        <h2 class="display-1 font-weight-thin">Compensations</h2>
        <p>Les compensations nous permettent de nous apercevoir qu’une activité envisageable “annule” les effets d’une autre activité dont on a du mal à se passer. (X compense Y). Exemple de compensation: Réduire de 3 minutes la durée de sa douche chaque jour compense l’énergie utilisée pour éclairer une soirée poker une fois par mois.</p>




        <h2 class="display-1 font-weight-thin">Alternatives</h2>
        <p>Les alternatives nous permettent de nous rendre compte qu’en préférant un service plutôt qu’un autre, on réalise une économie correspondant à un autre service tout entier  (préférer X au lieu de Y permet d’éviter Z). Exemple d’alternative: L’été, préférer chaque semaine 1kg de banane X transportée en cargo des îles canaries au lieu de 1kg de banane Y transportée en avion depuis la République Dominicaine, revient à éviter le réchauffement climatique causé par un Paris-Moscou en voiture Z.</p>




        <h2 class="display-1 font-weight-thin">Personnalisation</h2>
        <p>Pour prendre conscience au niveau individuel (ou au niveau familial, ou au niveau d’une rue, etc.) les informations doivent être personnalisées à échelle évocatrice par le lecteur. Exemple incorrect:  de Cola contient le sucre produit en une année par 0,001 hectare de champ de canne à sucre. Exemple correct: Boire deux bouteilles de Cola par semaine nécessite pour la production de son sucre la surface d’une petite terrasse.</p>

        <h2 class="display-1 font-weight-thin">Partage</h2>
        <p>Le partage constitue le coeur du mécanisme de fonctionnement de BlueForest</p>



        <p class="mt-5"><v-icon color="orange">new_releases</v-icon>Plusieurs idées valent mieux qu'une:</p>
        <open-message :section="secs.FONCTION"/>
    </div>
</template>

<script>
    import {secs} from "../../const/sections"
    import OpenMessage from "../common/OpenMessage"

    export default {
        name: "plan-func",
        components: {OpenMessage},
        data:()=>({secs}),
    }
</script>