<template>
    <v-card>
        <v-divider/>
        <v-card-title>
            <v-icon large>chrome_reader_mode</v-icon>
            <h6 class="title">Fonctions à venir</h6></v-card-title>
        <v-divider/>
        <v-container>
            <p>Nous avons plein d'idées de fonctionnalités à mettre en place pour pouvoir mieux comprendre de quoi nos produits sont faits.</p>
            <p>En voici une liste exhaustive, n'hésitez à proposer vos idées d'amélioration!</p>

            <v-expansion-panel>
                <v-expansion-panel-content v-for="item in items" :key="item.title">
                    <div slot="header"><v-icon>{{item.icon}}</v-icon>{{ item.title }}</div>
                    <v-container v-html="item.text"/>
                    <open-message :section="{title: `Votre avis sur '${item.title}'`, filter: {type: `${item.icon}.feature`}}"/>
                </v-expansion-panel-content>
            </v-expansion-panel>

            <open-message :section="secs.FEATURE"/>
        </v-container>
    </v-card>
</template>

<script>
    import OpenMessage from "../common/OpenMessage"
    import {secs} from "../../const/sections"

    export default {
        name: "road-map",
        components: {OpenMessage},
        data() {
            return {
                secs,
                items: [
                    {
                        icon: 'border_all',
                        title: 'Puzzle',
                        text:"<p>On place des produits/services comme des pièces de puzzle. Les pièces s'additionnent entre elles et forment alors un groupe. Au contraire, deux groupes entre eux se soustraient. La différence entre deux groupes représentent ce que l'on gagne (ou perd) quand on achète un groupe plutot que l'autre... Cette différence est exprimée par un troisième groupe, <i>le gain.</i></p><p>Le but du puzzle est de montrer ce que l'on gagne lorsqu'on remplace une activité par une autre. </p><p><i>Exemple: manger toute l'année des bananes en provenance des canaries par bateau plutôt que celle de la république dominicaine fait gagner l'équivalent en CO2 d'un Paris-Moscou en voiture.</p></p>"
                    },
                    {
                        icon: 'flag',
                        title: 'Equipes',
                        text:"<p>Sur blueforest on peut tout voir, mais ne modifier que ce qui nous appartient.</p><p>En formant une équipe, on peut travailler à plusieurs sur un produit/service.</p>"
                    },
                    {
                        icon: 'commute',
                        title: 'Transport',
                        text: "<p>Pouvoir affecter, lorsqu'on utilise des produits, les transports utilisés afin d'en rendre compte dans les impacts environnementaux.</p>"
                    },
                    {
                        icon: 'panorama_fish_eye',
                        title: 'Expliquer les impacts environnementaux',
                        text: "<p>La liste des impatcs est longue et compliquée. Il faut l'expliquer et la présenter sous forme de synthèse.</p>"
                    },
                    {
                        icon: 'search',
                        title: 'Recherche multi-critère',
                        text: "<p>Niveau 1: Permettre de rechercher les produits par catégorie, nom, propriétaire et par la présence d'un aspect environnemental, de ressource ou de propriété.<i>Exemple: Donne-moi les produits qui contiennent 100g de sucre.</i></p><p>Niveau 2: Pouvoir rechercher sur plusieurs aspects environnemental, de ressource ou de propriété en même temps.<i>Exemple: Donne-moi les produits de catégorie 'Transport' qui ont émis 1kg de CO2</i></p>"
                    },
                    {
                        icon: 'schedule',
                        title: 'Fréquence régulière',
                        text: "<p>Pouvoir sélectionner une quantité de produit sous forme d'<i>usage</i>, par exemple 1L de Coca <b>par jour</b>. Et ainsi créer le produit 'Boire du Coca' plutôt que '1L de Coca'</p><p>Le but de la fréquence régulière étant de pouvoir utiliser sur le puzzle 'Boire un an de Coca', 'Boire un an de Champagne', etc.</p>"
                    },
                    {
                        icon: 'link_off',
                        title: 'Aspects pas communs entre deux produits',
                        text: "<p>Lorsqu'on compare deux produits ou services, seuls les aspects qu'il ont en commun sont affichés.</p><p>Il faudrait afficher les aspects possédés par l'un, mais que l'autre ne possède pas.<i>Exemple: X et Y utilisent telle et telle quantité d'eau, mais X n'indique pas son émission de CO2.</i></p>"
                    },
                    {
                        icon: 'crop_square',
                        title:'Vue Ressources',
                        text:"<p>Dans le détail d'un produit ou service, on a que les ressources directement utilisées.</p><p>Créer une vue qui montre toute l'arborescence des flux entrants, ainsi qu'une vue qui montre les ressources 'première' uniquement, càd celle qui n'utilisent pas elle-même des ressources."
                    },
                    {
                        icon: 'control_point',
                        title:'Vue Environnement',
                        text:"<p>Dans le détail d'un produit ou service, on a que les impacts directement généré par la fabrication d'un produit.</p><p>Créer une vue qui montre l'accumulation des impacts environnementaux des flux entrants du produit."
                    },
                    {
                        icon:'crop_free',
                        title:'Périmètre',
                        text:"<p>Pouvoir assigner les parties d'un produit à sa phase: extraction ressources, production, traitement fin de vie, etc.</p>"
                    },
                    {
                        icon:'shopping_basket',
                        title:'Panier',
                        text:"<p>Rendre plus simple et scénarisée l'utilisation du panier. Permettre d'enregistrer des paniers pour les retrouver plus tard ou les partager.</p>"
                    }
                ]
            }
        }
    }
</script>