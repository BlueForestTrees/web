<template>
    <card>
        <v-toolbar class="elevation-0">
            <v-icon color="orange" large>new_releases</v-icon>
            <v-toolbar-title>Fonctions à venir</v-toolbar-title>
        </v-toolbar>
        <v-container>
            <v-expansion-panel popout>
                <v-expansion-panel-content v-for="item in items" :key="item.title">
                    <div slot="header">
                        <v-icon>{{item.icon}}</v-icon>
                        {{ item.title }}
                    </div>
                    <v-container v-html="item.description"/>
                    <template v-if="item.maquette" v-for="m in item.maquette">
                        <v-divider/>
                        <v-divider/>
                        <maquette :maquette="m" :key="m" style="margin-bottom: 3em" noDiv/>
                    </template>
                    <v-divider/>
                    <v-divider/>
                    <v-layout row justify-end>
                        <open-message class="mt-2" :section="{title: `Votre avis sur '${item.title}'`, filter: {type: `${item.icon}.feature`}}"/>
                        <v-spacer/>
                        <vote-btn text="VOTE" text-voted="merci!" :feature="`${item.title}.vote`"/>
                    </v-layout>
                </v-expansion-panel-content>
            </v-expansion-panel>
                <v-divider class="mx-3"/>
                <open-message :section="secs.FONCTION" class="mt-3 mx-0"/>
        </v-container>
    </card>
</template>

<script>
    import OpenMessage from "../common/OpenMessage"
    import {secs} from "../../const/sections"
    import maquettes from "../../const/maquettes"
    import Maquette from "../maquette/Maquette"
    import Card from "../common/Card"
    import VoteBtn from "../messages/VoteBtn"

    export default {
        name: "road-map",
        components: {VoteBtn, Card, Maquette, OpenMessage},
        data() {
            return {
                secs,
                items: [
                    {
                        icon: 'group',
                        title: 'Equipes',
                        text: "<p>Sur blueforest on peut tout voir, mais ne modifier que ce qui nous appartient.</p><p>En formant une équipe, on peut travailler à plusieurs sur un produit/service.</p>"
                    },
                    {
                        icon: 'commute',
                        title: 'Transport',
                        text: "<p>Pouvoir affecter, lorsqu'on utilise des produits, les transports utilisés afin d'en rendre compte dans les impacts environnementaux.</p>"
                    },
                    {
                        icon: 'panorama_fish_eye',
                        title: 'Expliquer les impacts environnementaux',
                        text: "<p>La liste des impatcs est longue et compliquée. Il faut l'expliquer et la présenter sous forme vulgarisée, ludique.</p>"
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
                        title: 'Vue Ressources et Vue Usages',
                        text: "<p>Dans le détail d'un produit ou service, on ne voit que les ressources directement utilisées.</p><p>Créer une vue qui montre toute l'arborescence des flux entrants, ainsi qu'une vue qui montre les ressources 'première' uniquement, càd celle qui n'utilisent pas elle-même des ressources.<p>Idem pour les usages potentiels d'un produit.</p>",
                        maquette: [maquettes.ARBRE_RESSOURCE, maquettes.ARBRE_USAGE]
                    },
                    {
                        icon: 'border_all',
                        title: 'Puzzle',
                        text: "<p>On place des produits/services comme des pièces de puzzle. Les pièces s'additionnent entre elles et forment alors un groupe. Au contraire, deux groupes entre eux se soustraient. La différence entre deux groupes représentent ce que l'on gagne (ou perd) quand on achète un groupe plutot que l'autre... Cette différence est exprimée par un troisième groupe, <i>le gain.</i></p><p>Le but du puzzle est de montrer ce que l'on gagne lorsqu'on remplace une activité par une autre. </p><p><i>Exemple: manger toute l'année des bananes en provenance des canaries par bateau plutôt que celle de la république dominicaine fait gagner l'équivalent en CO2 d'un Paris-Moscou en voiture.</p></p>",
                        maquette: [maquettes.PUZZLE]
                    },
                    {
                        icon: 'live_help',
                        title: 'Questions',
                        text: "<p>Questions est un jeu où l'ont propose au joueur de placer sur le dessin qui s'affiche correctement un élément un produit, un impact sur environnement, un apport nutritionnel.</p><p>Le but est d'étonner avec des faits.</p>",
                        maquette: [maquettes.QUESTION]
                    },
                    {
                        icon: 'control_point',
                        title: 'Vue Environnement',
                        text: "<p>Dans le détail d'un produit ou service, on ne voit que les impacts directement généré par la fabrication d'un produit.</p><p>Créer une vue qui montre l'accumulation des impacts environnementaux des flux entrants du produit."
                    },
                    {
                        icon: 'crop_free',
                        title: 'Périmètre',
                        text: "<p>Pouvoir assigner les parties d'un produit à sa phase: extraction ressources, production, utilisation, traitement fin de vie, etc.</p>"
                    },
                    {
                        icon: 'shopping_basket',
                        title: 'Panier',
                        text: "<p>Rendre plus simple et scénarisée l'utilisation du panier. Permettre d'enregistrer des paniers pour les retrouver plus tard ou les partager.</p>"
                    }
                ]
            }
        }
    }
</script>