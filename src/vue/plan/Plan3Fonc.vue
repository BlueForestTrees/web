<template>
    <div id="f">
        <h1 class="display-3 font-weight-thin">Offre</h1>
        <p>BlueForest est une plateforme suivant un modèle d'économie collaboratif. Les données viennent d'importations de bases de données existantes, des saisies d'entreprises et de particuliers. L'inscription et l'usage y est libre. On y consulte les informations de tous, et on y modifie uniquement ses propres informations.</p>
        <p>Blueforest gère le stockage des données et les services fournis autour de ces données. C'est un lieu d'argumentation, de démonstration, de pédagogie, de vulgarisation, de communication. On peut diffuser des résultats de démonstrations. Ceux-ci sont toujours liées aux détails de calculs, aux sources et aux auteurs.</p>

        <h2 class="display-1 font-weight-thin">Equivalences</h2>
        <p>Les équivalences nous permettent de prendre conscience de l’importance d’une chose en la comparant avec une autre de même importance (X équivaut Y). Exemple d’équivalence: On génère autant de réchauffement climatique en utilisant chaque jour le rouge à lèvre X qu’en mangeant une fois par semaine la pâtisserie Y.</p>


        <h2 class="display-1 font-weight-thin">Compensations</h2>
        <p>Les compensations nous permettent de nous apercevoir qu’une activité envisageable “annule” les effets d’une autre activité dont on a du mal à se passer. (X compense Y). Exemple de compensation: Réduire de 3 minutes la durée de sa douche chaque jour compense l’énergie utilisée pour éclairer une soirée poker une fois par mois.</p>




        <h2 class="display-1 font-weight-thin">Alternatives</h2>
        <p>Les alternatives nous permettent de nous rendre compte qu’en préférant un service plutôt qu’un autre, on réalise une économie correspondant à un autre service tout entier  (préférer X au lieu de Y permet d’éviter Z). Exemple d’alternative: L’été, préférer chaque semaine 1kg de banane X transportée en cargo des îles canaries au lieu de 1kg de banane Y transportée en avion depuis la République Dominicaine, revient à éviter le réchauffement climatique causé par un Paris-Moscou en voiture Z.</p>




        <h2 class="display-1 font-weight-thin">Personnalisation</h2>
        <p>Pour prendre conscience au niveau individuel (ou au niveau familial, ou au niveau d’une rue, etc.) les informations doivent être personnalisées à échelle évocatrice par le lecteur. Exemple incorrect:  de Cola contient le sucre produit en une année par 0,001 hectare de champ de canne à sucre. Exemple correct: Boire deux bouteilles de Cola par semaine nécessite pour la production de son sucre la surface d’une petite terrasse.</p>

        <h2 class="display-1 font-weight-thin">Partage</h2>
        <p>Le partage c'est important</p>



        <h2 class="display-1 font-weight-thin">Discussion</h2>
        <p><v-icon color="green" small>info</v-icon>Votre point de vue est essentiel à la poursuite de ce projet! :)</p>
        <open-message :section="secs.FEATURE"/>
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