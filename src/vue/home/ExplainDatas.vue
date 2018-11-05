<template>
    <v-card>
        <v-card-title>
            <v-icon color="primary">perm_data_settings</v-icon>
            Les données
        </v-card-title>
        <v-divider/>
        <v-container>
            <p>BlueForest a besoin de données. Actuellement, on peut y trouver les données suivantes:</p>
            <ul>
                <li>Les données de la base Impact de l'<a href="https://www.ademe.fr/" target="_blank">ADEME</a> (~1200 produits et leurs impacts environementaux)</li>
                <li>Les données des entreprises</li>
                <li>Les données des particuliers</li>
            </ul>
            <br>
            <p>L'intégration des données suivantes est en cours ou à l'étude:</p>
            <ul>
                <li>La base <a href="http://eplca.jrc.ec.europa.eu/LCDN/" target="_blank">LCDN</a> (nombreux produits et leurs impacts environnementaux)</li>
                <li>La base de données <a href="https://fr.openfoodfacts.org/" target="_blank">OpenFoodFact</a> (~650000 produits alimentaires et leurs apports nutritionnels)</li>
                <li>La base de données <a href="http://www.agri-footprint.com/" target="_blank">AgriFootPrint</a> (~5000 produits alimentaires et leurs impacts environnementaux) (payant)</li>
                <li>La base de données <a href="https://www.ecoinvent.org/database/database.html" target="_blank">ecoinvent 3.5</a> (plusieurs milliers d'activités en tout genre avec impacts environnementaux)(payant)</li>
                <li>La base de données <a href="http://eplca.jrc.ec.europa.eu/ELCD3/" target="_blank">ELCD3</a> (? produits et leurs impacts)</li>
                <li>Les données des entreprises</li>
                <li>Les données des particuliers</li>
            </ul>
            <br>
            <p>Toute aide est la bienvenue pour les informations sur les conditions de travail ou autre aspects des produits.</p>
        </v-container>
    </v-card>
</template>

<script>
    import OpenMessage from "../common/OpenMessage"
    import {secs} from "../../const/sections"

    export default {
        name: "explain-datas",
        components: {OpenMessage},
    }
</script>