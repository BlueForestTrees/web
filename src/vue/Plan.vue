<template>
    <v-container>

        <div>

            <div style="position:fixed;right:0em;top:0em;background-color: #FFFFFFDE">
                <div style="margin-right:1em;margin-top:1em">
                    <v-icon @click="goHome" large>close</v-icon>
                </div>
            </div>

            <div style="position:fixed;left:0em;top:0em;background-color: #FFFFFFDE">
                <div style="margin-left:0em;margin-top:1em">
                    <ul>
                        <a href="#c" class="body-2 mb-1 d-block grey--text text--darken-1">Constat</a>
                        <a href="#b" class="body-2 mb-1 d-block grey--text text--darken-1">Besoin</a>
                        <a href="#f" class="body-2 mb-1 d-block grey--text text--darken-1">Fonction</a>
                        <a href="#t" class="body-2 mb-2 d-block grey--text text--darken-1">Technique</a>
                    </ul>
                </div>
            </div>

            <div class="main">
                <div id="i">
                    <p style="color: slategray">
                        <v-layout row align-center>
                            <v-icon color="grey">info</v-icon>Temps de lecture: 5-10min.
                        </v-layout>
                    </p>
                    <h1 class="display-3 font-weight-thin">Introduction</h1>
                    <p>Nous trouvons finalement notre planète petite. Notre façon de faire, notre organisation change petit à petit pour plus de respect de la nature et de nous-même (ou pas). Que pouvons-nous faire pour être fiers de nous?
                    <p>
                    <p>Cette page présente le projet BlueForest, il y a quatre parties:
                    <p>
                    <ul>
                        <li><b>Un constat</b>, qui se base sur un ensemble de documents sur l'homme et l'environnement.</li>
                        <li><b>Les besoins</b>: que faut-il pour remédier à ce constat?</li>
                        <li><b>Les fonctionnalités</b>, (de l'application) pour tenter de répondre aux besoins.</li>
                        <li><b>La technique</b>, pour les personnes souhaitant participer ou se renseigner à ce niveau.</li>
                    </ul>
                    <p>
                        <v-icon color="primary" small>info</v-icon>
                        Ce projet est collaboratif. Tout soutien ou précision de votre part est le bienvenu. N'hésitez pas à discuter de chaque partie, les sections 'Discussion' sont là pour ça :)
                    </p>
                </div>
                <div id="c">
                    <h1 class="display-3 font-weight-thin">Constat</h1>

                    <h2 class="display-1 font-weight-thin subtitle" id="orgamond">Les organisations mondiales</h2>
                    <p>
                        Beaucoup d'organisations internationales agissent pour l'environnement.
                    <p>
                    L'ONU a une branche environnement<a href="#une"><sup>numX</sup></a>, qui délivre des informations parfois encourageantes<a href="#encou"><sup>numX</sup></a>, parfois dramatiques<a href="#biod"><sup>numX</sup></a>.
                    </p>
                    <p>
                        7 des 17 objectifs de l'UNESCO<a href="#unes"><sup>numX</sup></a> portent sur l'environnement.
                    </p>
                    <p>le monde des organisations internationales est plus ou moins séparé de celui des consommateurs. Il tend à moins l'être</p>

                    <h2 class="display-1 font-weight-thin subtitle">Les entreprises<sup><a class="sup" href="#pers">numX</a></sup></h2>
                    <p>Le monde de l'entreprise est plus ou moins séparé de celui des consommateurs. Il tend à moins l'être</p>

                    <h2 class="display-1 font-weight-thin subtitle">Les personnes<sup><a class="sup" href="#pers">numX</a></sup></h2>
                    <p>
                        La consommation des ménages est parfois contrainte par leur niveau de vie.
                        Les choix des consommateurs restent avant tout dépendants de l’intérêt que ceux-ci portent ou pas à l’environnement.
                        <b>Le prix et le poids des habitudes continuent de freiner une volonté de changement qui existe.</b>
                    </p>
                    <p>Etes-vous plutôt optimiste, pessimiste, indifférent, ou même l'un puis l'autre à tour de rôle?</p>

                    <h2 class="display-1 font-weight-thin subtitle">Références</h2>
                    <ol>
                        <li id="encou"><a href="https://www.unenvironment.org/fr/news-and-stories/communique-de-presse/sept-idees-revolutionnaires-recompensees-par-le-prix-de" target="_blank">« 7 idées révolutionnaires »</a>, Nation Unies, site web</li>
                        <li id="biod"><a href="https://www.unenvironment.org/fr/explore-topics/ecosystemes" target="_blank">« La biodiversité disparait »</a>, Nation Unies, site web</li>
                        <li><a href="https://www.actu-environnement.com/ae/news/climat-economie-nouveau-modele-croissance-31941.php4" target="_blank">« Un nouveau modèle de croissance »</a>, Commission mondiale pour l'économie et le climat, 2018</li>
                        <li id="unes"><a href="https://fr.unesco.org/sdgs" target="_blank">« Les 17 objectifs de l'UNESCO »</a></li>
                        <li id="pers"><a href="http://www.statistiques.developpement-durable.gouv.fr/fileadmin/documents/Produits_editoriaux/Publications/Datalab_essentiel/2017/datalab-essentiel-97-francais-consommation-responsable-mars2017.pdf" target="_blank">« Les Français et la consommation responsable »</a>, Ministère Français de l'environnement, 2017
                        </li>
                    </ol>

                    <h2 class="display-1 font-weight-thin subtitle">Discussion</h2>
                    <p @click="showMessages(c2)" class="hand">
                        Donnez votre opinion sur le constat
                        <v-icon small color="primary" small>chat_bubble</v-icon>
                    </p>

                </div>
                <div id="b">
                    <h1 class="display-3 font-weight-thin">Besoin</h1>
                    <p>
                        Responsabilisation, déculpabilisation
                    </p>
                    <p>
                        Les personnes ont besoin d'une perception, d'une conscience de la relation entre leurs activités personnelles de tous les jours et les impacts sur l'environnement de l'activité économique de l'homme.
                    </p>
                    <h2 class="display-1 font-weight-thin subtitle">Discussion</h2>
                    <p @click="showMessages(b1)" class="hand">
                        Donnez votre opinion sur les besoins
                        <v-icon small color="primary" small>chat_bubble</v-icon>
                    </p>
                </div>
                <div id="f">
                    <h1 class="display-3 font-weight-thin">Fonctionnalités</h1>
                    <p>
                        Créer une ressource
                        Rechercher
                        Consulter les ressources
                        Consulter le bilan des impacts
                        Consulter le bilan des ressources
                        Comparer les impacts
                        Comparer les propriétés
                        Comparer le bilan des ressources
                        Comparer une selection d'élements
                        Attribuer des ressources
                        Attribuer des propriétés
                        Attribuer des impacts
                        Attribuer des transports


                        Diffuser un produit, une comparaison
                    </p>
                    <h2 class="display-1 font-weight-thin subtitle">Discussion</h2>
                    <p @click="showMessages(c2)" class="hand">
                        Donnez votre opinion sur les fonctions
                        <v-icon small color="primary" small>chat_bubble</v-icon>
                    </p>
                </div>
                <div id="t">
                    <h1 class="display-3 font-weight-thin">Technique</h1>
                    <p>
                    <p><v-icon>info</v-icon><b>Pour les curieux ou les développeurs :)</b><br>
                        L'application BlueForest est entièrement basée sur Javascript, les micro-services, docker et MongoDB.<br>
                        Voici une bonne part des outils et méthodes utilisés sur blueforest.org:</p>
                    <ul>
                        <li>
                            Application
                            <ul>
                                <li><a href="https://vuejs.org/" target="_blank">Vue.js</a>, <a href="https://vuex.vuejs.org/" target="_blank">Vuex</a>, <a target="_blank" href="https://vuetifyjs.com/en">Vuetify</a></li>
                                <li><a href="https://webpack.js.org/" target="_blank">Webpack</a>, <a href="https://webpack.js.org/guides/code-splitting/" target="_blank">Code splitting</a></li>
                            </ul>
                        </li>
                        <li>
                            Application & Serveur
                            <ul>
                                <li><a href="http://www.pompage.net/traduction/comment-j-ai-explique-rest-a-ma-femme" target="_blank">REST</a>, <a href="https://fr.wikipedia.org/wiki/JSON_Web_Token" target="_blank">JWT</a></li>
                                <li><a href="https://www.chaijs.com/" target="_blank">Chai</a>, <a href="https://mochajs.org/" target="_blank">Mocha</a></li>
                                <li><a href="https://www.npmjs.com/">npm</a>, <a href="https://babeljs.io/" target="_blank">Babel</a></li>
                            </ul>
                        </li>
                        <li>
                            Serveur
                            <ul>
                                <li><a href="https://expressjs.com/fr/" target="_blank">Express.js</a>, <a href="https://nodejs.org/en/" target="_blank">Node.JS</a></li>
                            </ul>
                            <ul>
                                <li><a href="https://www.mongodb.com/" target="_blank">MongoDB</a></li>
                            </ul>
                        </li>
                        <li>
                            Infrastructure
                            <ul>
                                <li><a href="https://letsencrypt.org/" target="_blank">HTTPS Let's Encrypt</a></li>
                                <li><a href="https://blog.octo.com/larchitecture-microservices-sans-la-hype-quest-ce-que-cest-a-quoi-ca-sert-est-ce-quil-men-faut/" target="_blank">Micro-Services</a>, <a href="https://openresty.org/en/" target="_blank">OpenResty API gateway</a>, <a href="https://www.nginx.com/" target="_blank">Nginx</a></li>
                                <li><a href="https://rancher.com/what-is-rancher/overview/">Rancher (cattle)</a>, <a href="https://www.docker.com/">Docker</a></li>
                            </ul>
                        </li>
                    </ul>
                    <h2 class="display-1 font-weight-thin subtitle">Discussion</h2>
                    <p>
                        <v-layout row mt-0>
                            <span class="sl">Vous pouvez poser une question sur la technique ici <v-icon @click="showMessages(t1)" small color="primary" small>chat_bubble</v-icon>, ou sinon</span>
                            <a href="https://github.com/BlueForestTrees" target="_blank">
                                <v-layout row align-center mt-0>
                                    <span class="sl">BlueForest est sur GitHub</span>
                                    <svg width="20px" xmlns="http://www.w3.org/2000/svg" viewBox="10 10 30 30">
                                        <path fill-rule="evenodd" clip-rule="evenodd" fill="#181616"
                                              d="M25 10c-8.3 0-15 6.7-15 15 0 6.6 4.3 12.2 10.3 14.2.8.1 1-.3 1-.7v-2.6c-4.2.9-5.1-2-5.1-2-.7-1.7-1.7-2.2-1.7-2.2-1.4-.9.1-.9.1-.9 1.5.1 2.3 1.5 2.3 1.5 1.3 2.3 3.5 1.6 4.4 1.2.1-1 .5-1.6 1-2-3.3-.4-6.8-1.7-6.8-7.4 0-1.6.6-3 1.5-4-.2-.4-.7-1.9.1-4 0 0 1.3-.4 4.1 1.5 1.2-.3 2.5-.5 3.8-.5 1.3 0 2.6.2 3.8.5 2.9-1.9 4.1-1.5 4.1-1.5.8 2.1.3 3.6.1 4 1 1 1.5 2.4 1.5 4 0 5.8-3.5 7-6.8 7.4.5.5 1 1.4 1 2.8v4.1c0 .4.3.9 1 .7 6-2 10.2-7.6 10.2-14.2C40 16.7 33.3 10 25 10z"></path>
                                    </svg>
                                </v-layout>
                            </a>
                        </v-layout>
                    </p>
                </div>
            </div>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="$router.push({name:GO.HOME})">entrer
                </v-btn>
            </v-card-actions>
        </div>

        <right-menu/>
        <connect-to-continue-dialog can-stay/>
    </v-container>
</template>

<script>
    import RightMenu from "./layout/Messages"
    import {GO} from "../const/go"
    import On from "../const/on"
    import {mapActions} from "vuex"
    import Card from "./layout/Card"
    import ConnectToContinueDialog from "./dialog/ConnectToContinueDialog"

    export default {
        name: "plan",
        components: {ConnectToContinueDialog, Card, RightMenu},
        data() {
            return {
                GO,
                c2: {title: "Le constat - participez", filter: {type: "constat#2"}},
                b1: {title: "Les besoins - participez", filter: {type: "besoin#2"}},
                f1: {title: "Les fonctions - participez", filter: {type: "fonction#2"}},
                t1: {title: "Technique - participez", filter: {type: "Technique#2"}}
            }
        },
        methods: {
            showMessages(filter) {
                this.dispatchShowMessage(filter)
            },
            ...mapActions({goHome:On.GO_HOME,dispatchShowMessage: On.SHOW_MESSAGES})
        }
    }
</script>

<style>
    .main {
        margin-top: 7.5em
    }

    .main div {
        margin-top: 4em
    }

    p {
        margin-left: 1.3em
    }

    .v-btn__content {
        margin: 0px
    }

    a {
        text-decoration: none;
    }

    .subtitle {
        margin-top: 1em;
        margin-left: 0.3em;
    }

    .sup {
        font-size: small;
    }
</style>