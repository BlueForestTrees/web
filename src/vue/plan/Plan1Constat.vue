<template>
    <div id="c">
        <p><v-icon color="green">info</v-icon>Temps de lecture: 2-3 min.</p>
        <p></p>

        <h1 class="display-3 font-weight-thin">Aujourd'hui</h1>

        <p>Nous trouvons notre planète petite. Notre façon de faire change petit à petit pour plus de respect de la nature et de nous-même (ou pas).
        <p>
        <p>L'idée "d'environnement" est un mauvais concept: l'homme y est au centre, et le reste est autour. Ne sommes-nous pas plutôt un maillon de la chaîne?</p>

        <h2 class="display-1 font-weight-thin">Consommation & environnement</h2>
        <p>
            La consommation des ménages est parfois contrainte par leur niveau de vie.
            Les choix des consommateurs restent avant tout dépendants de l’intérêt que ceux-ci portent ou pas à l’environnement.
        </p>
        <p>
            <b>Le prix et le poids des habitudes continuent de freiner une volonté de changement qui existe.(<a href="http://www.statistiques.developpement-durable.gouv.fr/fileadmin/documents/Produits_editoriaux/Publications/Datalab_essentiel/2017/datalab-essentiel-97-francais-consommation-responsable-mars2017.pdf" target="_blank">« Les Français et la
                consommation responsable »</a>)</b>
        </p>
        <p>"Il suffit de pas que ça s'achète pour pas que ça se vende" - Coluche</p>


        <h2 class="display-1 font-weight-thin">Production & environnement</h2>
        <p>Les entreprises ont des actions de rapprochement vers leurs clients:</p>
        <ul>
            <li>La <b>personnalisation</b>: c'est le fait de proposer au consommateurs un niveau plus ou moins approfondi de choix sur-mesure appliqué à un produit produit à grande échelle.</li>
            <li>La <b>communauté</b>: l'entreprise tâche de donner un sentiment identitaire aux consommateurs d'un même produit pour qu'ils soient un relais publicitaire.</li>
        </ul>
        <p>La prise en compte de l'impact environnemental sur nos manières de produire peut-elle se réduire à une "communauté bio"?</p>


        <h2 class="display-1 font-weight-thin">Environnement: les acteurs</h2>
        <p>De nombreuses organisations promeuvent le développement durable, selon différentes approches:</p>
        <ul>
            <li>Mouvement citoyen: <a href="https://www.i-boycott.org/" target="_blank">Iboycott</a>, <a href="https://lamarqueduconsommateur.com/" target="_blank">c’est qui le patron</a>, <a href="http://www.wemove.eu" target="_blank">wemove</a>, <a href="https://www.change.org/" target="_blank">change.org</a></li>
            <li>Informations sur les produits ou services:</li>
            <ul>
                <li>
                    <a href="https://fr.openfoodfacts.org/" target="_blank">OpenFoodFact</a>: Base de données ouverte d'apports nutritionnels sur les produits alimentaires industriels.
                </li>
                <li>
                    <a href="https://yuka.io/" target="_blank">Yuka</a>: Base de données d'apports nutritionnels sur les produits alimentaires industriels.
                </li>
                <li>
                    <a href="http://www.clothparency.com/" target="_blank">Clothparency</a>: Evaluation environnementale et sociale dans le secteur textile.
                </li>
                <li>
                    <a href="https://fr.openbeautyfacts.org" target="_blank">OpenBeautyFact</a>, <a href="https://www.quechoisir.org/application-mobile-quelcosmetic-n52804/" target="_blank">QuelCosmetic</a>: Informations sur les produits de beauté.
                </li>
                <li>
                    <a href="https://www.logicout.fr/couts/" target="_blank">Logicout</a>: Evaluation d'impact environnemental des transports en voiture et camion.
                </li>
            </ul>
            <li>Notation, labellisation d’entreprises: <a href="https://bcorporation.eu/about-b-lab/country-partner/france" target="_blank">B Corp</a>, <a href="http://biomattitude.com/" target="_blank">Biomattitude</a></li>
            <li>Partage de pratiques, annuaire ‘green’: <a href="https://www.wwf.fr/agir-au-quotidien/crowdacting" target="_blank">WAG</a>, <a href="https://www.greenapes.com/en/" target="_blank">Greenapes</a></li>
            <li>Création d’information détaillée et fiable sur les produits: <a href="https://ambrosus.com/fr/" target="_blank">Ambrosus</a>, <a href="https://www.sgsgroup.fr/fr-fr/news/2017/07/sgs-et-transparency-one-visibilite-chaine-d-approvisionnement" target="_blank">TransparencyOne</a>, <a href="https://www.provenance.org/" target="_blank">Provenance</a></li>
            <li>Logiciels, Base de données, cabinets d'Analyse de Cycle de Vie: <a href="http://eplca.jrc.ec.europa.eu/LCDN/" target="_blank">Life Cycle Data Network</a>, <a href="https://www.ecoinvent.org/home.html" target="_blank">Ecoinvent</a>, <a href="http://www.openlca.org/" target="_blank">Openlca</a>, <a href="https://network.simapro.com/evea/"
                                                                                                                                                                                                                                                                                                                          target="_blank">SimaPro</a>, <a
                    href="http://www.gabi-software.com/france/logiciel/" target="_blank">Gabi</a>, et de <a href="https://www.avnir.org/FR/Bureaux-d-etudes-et-cabinets-de-conseil-251.html" target="_blank">nombreux cabinets</a></li>
        </ul>
        <p></p>
        <p>Ces organisations sont très différentes les unes des autres:</p>
        <ul>
            <li>Les organisations sont portées par une seule personne, ou parfois un groupe, jusqu'à des pays entiers.</li>
            <li>Leur public visé peut être les particuliers, les professionnels d’un ou plusieurs secteurs, les gouvernements.</li>
            <li>Leur but peut être lucratif ou non.</li>
            <li>Le niveau de qualification requis par les personnes y travaillant va de l’absence de qualification à un doctorat spécialisé.</li>
        </ul>
        <p></p>


        <h2 class="display-1 font-weight-thin">Discussion</h2>
        <open-message :section="secs.CONSTAT"/>
        <p><v-icon color="green" small>info</v-icon>Votre point de vue est essentiel à la poursuite de ce projet! :)</p>
    </div>
</template>

<script>
    import OpenMessage from "../common/OpenMessage"
    import {secs} from "../../const/sections"

    export default {
        name: "plan-constat",
        data: () => ({secs}),
        components: {OpenMessage}
    }
</script>