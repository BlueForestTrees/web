<template>
    <v-card flat id="c">
        <h1 class="display-3 font-weight-thin">Constat</h1>

        <h2 class="display-1 font-weight-thin subtitle">Consommation & environnement</h2>
        <p>"Il suffit de pas que ça s'achète pour pas que ça se vende" - Coluche</p>
        <p>
            La consommation des ménages est parfois contrainte par leur niveau de vie.
            Les choix des consommateurs restent avant tout dépendants de l’intérêt que ceux-ci portent ou pas à l’environnement.
            <b>Le prix et le poids des habitudes continuent de freiner une volonté de changement qui existe<sup><a class="sup" href="#pers">numX</a></sup>.</b>
        </p>

        <h2 class="display-1 font-weight-thin subtitle">Production & environnement</h2>
        <p>Le monde de l'entreprise est plus ou moins séparé de celui des consommateurs, en tout cas culturellement.
        </p>
        <p>Les entreprises ont des actions de rapprochement vers leurs clients. Pour être dans le coeur des clients: la <b>personnalisation</b><sup><a class="sup" href="#pers">numX</a>, <a class="sup" href="#pers">numX</a></sup> et les <b>communautés</b><sup><a class="sup" href="#pers">numX</a></sup>.</p>
        <p>La <b>personnalisation</b> est le fait de proposer au consommateurs un niveau plus ou moins approfondi de choix sur-mesure appliqué à un produit produit à grande échelle.</p>
        <p>La <b>communauté</b> par l'entreprise est le fait de tâcher de donner un sentiment identitaire aux consommateurs d'un même produit pour qu'ils soient un relais publicitaire.</p>

        <!--<h2 class="display-1 font-weight-thin subtitle">Opinion</h2>-->
        <!--<p>L'entreprise, par essence, utilise tous les moyens légaux possibles pour continuer à exister, pour avoir un bénéfice positif.<p>-->
        <!--<p>Ce constat peut sembler dur, pourtant il est salvateur: les entreprises suivent le même appât, celui de l'argent, et il suffit de modifier bla bla trop dur</p>-->

        <h2 class="display-1 font-weight-thin subtitle">Existant</h2>
        <p>De nombreuses organisations souhaitent promouvoir le développement durable. Ces organisations sont très différentes les unes des autres.</p>
        <ul>
            <li>Les organisations sont portées une seule personne, ou parfois un groupe, jusqu'à des pays entiers.</li>
            <li>Leur public visé peut être les particuliers, les entreprises d’un ou plusieurs secteurs, voire les gouvernements.</li>
            <li>Leur but peut être lucratif ou non.</li>
            <li>Le niveau de qualification requis par leur employés va de l’absence de qualification à un doctorat spécialisé.</li>
        </ul>
        <p>Yuka, Ambrosus, Clothparency, B-corp, QuelCosmetic, transparency-one, greenapes, ecoinvent, openlca, Life Cycle Data Network, gabi, biloba web, brightway2, greendelta, WWF crowdacting, logicout.fr</p>

        <h2 class="display-1 font-weight-thin subtitle">Références</h2>
        <ol>
            <li><a href="http://www.elle.fr/Mode/Tops-femme/T-shirt-personnalise-2909138" target="_blank">« On veut toutes un T-shirt personnalisé »</a>, site web elle.fr</li>
            <li><a href="https://www.dsautomobiles.fr/guide-d-achat/configurateur/modeles/ds-7-crossback/finitions-et-motorisations/finitions.html?pid=14714" target="_blank">« Configurez »</a>, site web Citroën, personnalisation de véhicules.</li>
            <li><a href="https://www.pellerin-formation.com/7-marques-qui-ont-su-creer-de-nouveaux-services-produits-en-impliquant-leur-communaute/" target="_blank">« La révolution co-création »</a>, site web, liste d'exemples de co-création.</li>
            <li id="pers"><a href="http://www.statistiques.developpement-durable.gouv.fr/fileadmin/documents/Produits_editoriaux/Publications/Datalab_essentiel/2017/datalab-essentiel-97-francais-consommation-responsable-mars2017.pdf" target="_blank">« Les Français et la consommation responsable »</a>, Ministère Français de l'environnement, 2017
            </li>
        </ol>

        <h2 class="display-1 font-weight-thin subtitle">Discussion</h2>
        <p @click="showMessages(c2)" class="hand">Donnez votre opinion sur le constat
            <v-icon small color="primary" small>chat_bubble</v-icon>
        </p>

    </v-card>
</template>

<script>
    export default {
        name: "plan-constat"
    }
</script>