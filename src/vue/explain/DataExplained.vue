<template>
    <v-container>
        <v-card>
            <v-toolbar class="elevation-0">
                <v-icon color="primary" large>domain</v-icon>
                <v-toolbar-title>D'où viennent les données?</v-toolbar-title>
            </v-toolbar>

            <v-container>
                <p>BlueForest recueille les données sur les produits de différentes sources, en un seul endroit. Actuellement, on peut y trouver les données suivantes:</p>
                <ul>
                    <li>Les données de la base Impact de l'<a href="https://www.ademe.fr/" target="_blank">ADEME</a> (~1200 produits et leurs impacts environementaux)</li>
                    <li>La base de données <a href="https://fr.openfoodfacts.org/" target="_blank">OpenFoodFact</a> (~650000 produits alimentaires et leurs apports nutritionnels)</li>
                    <li>Entreprises: les données sur vos produits</li>
                    <li>Particuliers: les données sur vos recettes</li>
                </ul>
                <br>
                <p>L'intégration des données suivantes est à l'étude:</p>
                <ul>
                    <li>La base <a href="http://eplca.jrc.ec.europa.eu/LCDN/" target="_blank">LCDN</a> (nombreux produits et leurs impacts environnementaux)</li>
                    <li>La base de données <a href="http://www.agri-footprint.com/" target="_blank">AgriFootPrint</a> (~5000 produits alimentaires et leurs impacts environnementaux) (payant)</li>
                    <li>La base de données <a href="https://www.ecoinvent.org/database/database.html" target="_blank">ecoinvent 3.5</a> (plusieurs milliers d'activités en tout genre avec impacts environnementaux)(payant)</li>
                    <li>La base de données <a href="http://eplca.jrc.ec.europa.eu/ELCD3/" target="_blank">ELCD3</a> (? produits et leurs impacts)</li>
                    <li>Les données des entreprises</li>
                    <li>Les données des particuliers</li>
                </ul>
                <br>
                <p>Toute aide est la bienvenue pour les informations sur les conditions de travail ou envisager d'autres aspects des produits.</p>
            </v-container>
        </v-card>
    </v-container>
</template>

<script>
    import OpenMessage from "../common/OpenMessage"
    import {secs} from "../../const/sections"

    export default {
        name: "explain-datas",
        components: {OpenMessage},
    }
</script>