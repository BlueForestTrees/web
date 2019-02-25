<template>
    <card>
        <subpage-title title="Nouvelle information" icon-class="voice logo"/>

        <div class="pa-3">Enregistrez les informations que vous trouvez intéressantes pour les diffuser et les soumettre au débat. <br>Vous pouvez créer différents types d'informations:</div>

        <v-container>
            <v-expansion-panel popout>
                <v-expansion-panel-content>
                    <div slot="header" class="bold-font font-weight-thin display-1">Equivalence</div>
                    <v-container>
                        <p class="bold-font align display-2">A = B</p>
                        <p><span class="bold-font">Définition:</span> Les équivalences rendent compte de l'égalité de deux produits entre eux. Plus efficace quand un produit est bien connu mais pas l'autre.<br></p>
                        <p><span class="bold-font">Exemple:</span> On génère autant de réchauffement climatique en utilisant chaque jour le rouge à lèvre X qu’en mangeant une fois par semaine la pâtisserie Y.</p>
                    </v-container>
                    <v-layout row justify-end>
                        <v-spacer/>
                        <v-btn color="primary" class="ma-3" :to="{name:GO.EDIT_EQUIV, params:{path:'new'}}">Créer une équivalence</v-btn>
                    </v-layout>
                </v-expansion-panel-content>
                <v-expansion-panel-content>
                    <div slot="header" class="bold-font font-weight-thin display-1">Compensation</div>
                    <v-container>
                        <p class="bold-font align display-2">A compense B</p>
                        <p><span class="bold-font">Définition:</span> Les compensations nous permettent de nous apercevoir qu’une activité envisageable “annule” les effets d’une autre activité dont on a du mal à se passer.</p>
                        <p><span class="bold-font">Exemple:</span> Réduire de 3 minutes la durée de sa douche chaque jour compense l’énergie utilisée pour éclairer une soirée poker une fois par mois.</p>
                    </v-container>
                    <v-layout row justify-end>
                        <v-spacer/>
                        <v-btn color="primary" class="ma-3" :to="{name:GO.EDIT_COMP, params:{path:'new'}}">Créer une Compensation</v-btn>
                    </v-layout>
                </v-expansion-panel-content>
                <v-expansion-panel-content>
                    <div slot="header" class="bold-font font-weight-thin display-1">Alternative</div>
                    <v-container>
                        <p class="bold-font align display-2">A au lieu de B = C</p>
                        <p><span class="bold-font">Définition:</span> Les alternatives nous permettent de nous rendre compte qu’en préférant un service plutôt qu’un autre, on réalise une économie correspondant à un troisième service.</p>
                        <p><span class="bold-font">Exemple:</span> Préférer consommer une banane venue en bateau plutôt qu'en avion, revient à éviter la pollution causée par un trajet Paris-Moscou en voiture.</p>
                    </v-container>
                    <v-layout row justify-end>
                        <v-spacer/>
                        <v-btn color="primary" class="ma-3" :to="{name:GO.EDIT_ALT, params:{path:'new'}}">Créer une alternative</v-btn>
                    </v-layout>
                </v-expansion-panel-content>
                <v-expansion-panel-content>
                    <div slot="header" class="bold-font font-weight-thin display-1">Groupe</div>
                    <v-container>
                        <p><span class="bold-font">Définition:</span> Un groupe est un rassemblement de plusieurs messages pour former une suite.</p>
                    </v-container>
                    <v-layout row justify-end>
                        <v-spacer/>
                        <v-btn color="primary" class="ma-3" :to="{name:GO.EDIT_GROUP}">Créer un groupe</v-btn>
                    </v-layout>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-container>

    </card>
</template>
<script>
    import Card from "../common/Card"
    import {GO} from "../../const/go"
    import SubpageTitle from "../tree/SubpageTitle"

    export default {
        name: "create-info",
        components: {SubpageTitle, Card},
        data: () => ({GO})
    }
</script>