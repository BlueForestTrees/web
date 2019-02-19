<template>
    <div id="t">
        <v-layout class="display-2 font-weight-thin mb-3">
            Technique
            <v-icon color="primary" x-large class="ml-2">fiber_manual_record</v-icon>
        </v-layout>

        <p><v-icon color="green">info</v-icon><b>Pour les curieux ou les développeurs en informatique :)</b></p>

        <p>BlueForest utilise JS, Docker, MongoDB, RabbitMQ, l'approche micro-services, etc.</p>
        <p>Voici une bonne part des outils et méthodes utilisés sur blueforest.org:</p>
        <ul>
            <li>
                Application
                <ul>
                    <li><a href="https://vuejs.org/" target="_blank">Vue.js</a>, <a href="https://vuex.vuejs.org/" target="_blank">Vuex</a>, <a target="_blank" href="https://vuetifyjs.com/en">Vuetify</a></li>
                    <li><a href="https://webpack.js.org/" target="_blank">Webpack</a></li>
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
                    <li><a href="https://kubernetes.io/">Kubernetes</a>, <a href="https://rancher.com/what-is-rancher/overview/">Rancher</a>, <a href="https://www.docker.com/">Docker</a></li>
                </ul>
            </li>
        </ul>

        <div class="mt-5">
        <a href="https://github.com/BlueForestTrees" target="_blank">
            <img src="img/logo.svg" class="logo"/>
            <img src="img/heart.svg" class="logo-petit mx-1"/>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="10 10 30 30" class="logo">
                <path fill-rule="evenodd" clip-rule="evenodd" fill="#181616"
                      d="M25 10c-8.3 0-15 6.7-15 15 0 6.6 4.3 12.2 10.3 14.2.8.1 1-.3 1-.7v-2.6c-4.2.9-5.1-2-5.1-2-.7-1.7-1.7-2.2-1.7-2.2-1.4-.9.1-.9.1-.9 1.5.1 2.3 1.5 2.3 1.5 1.3 2.3 3.5 1.6 4.4 1.2.1-1 .5-1.6 1-2-3.3-.4-6.8-1.7-6.8-7.4 0-1.6.6-3 1.5-4-.2-.4-.7-1.9.1-4 0 0 1.3-.4 4.1 1.5 1.2-.3 2.5-.5 3.8-.5 1.3 0 2.6.2 3.8.5 2.9-1.9 4.1-1.5 4.1-1.5.8 2.1.3 3.6.1 4 1 1 1.5 2.4 1.5 4 0 5.8-3.5 7-6.8 7.4.5.5 1 1.4 1 2.8v4.1c0 .4.3.9 1 .7 6-2 10.2-7.6 10.2-14.2C40 16.7 33.3 10 25 10z"></path>
            </svg>
        </a>
        </div>

        <p class="mt-2"><v-icon color="orange">new_releases</v-icon>Une question ou une suggestion:</p>
        <open-message :section="secs.TECH"></open-message>

    </div>
</template>

<script>
    import {secs} from "../../const/sections"
    import OpenMessage from "../common/OpenMessage"

    export default {
        name: "plan-tech",
        components: {OpenMessage},
        data: () => ({secs}),
    }
</script>