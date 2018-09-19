<template>
    <v-container>

        <div>


            <div style="position:fixed;right:0em;top:0em;background-color: #FFFFFFDE">
                <div style="margin-right:2em;margin-top:2em">
                    <ul>
                        <a href="#c" class="body-2 mb-1 d-block grey--text text--darken-1">Constat</a>
                        <a href="#b" class="body-2 mb-1 d-block grey--text text--darken-1">Besoin</a>
                        <a href="#f" class="body-2 mb-1 d-block grey--text text--darken-1">Fonction</a>
                        <a href="#t" class="body-2 mb-2 d-block grey--text text--darken-1">Technique</a>
                    </ul>
                </div>
            </div>

            <div class="main">
                <div id="c">
                    <h1 class="display-3 font-weight-thin">Constat</h1>
                    <p>
                        <!--Au niveau mon mondial, nous polluons trop. Nous faisons des sommets, des commissions pour créer une politique durable et globale.-->
                        <!--Au niveau individuel, nous ne savons pas quoi faire. Nous ne sommes pas sûrs dans quelle mesure ce que nous faisons, ou pas, est mauvais pour l'environnment.-->

                    </p>
                    <h2 class="display-1 font-weight-thin">Références</h2>
                    <ol>
                        <li>La commission mondiale pour l'économie et le climat.</li>
                    </ol>
                    <h2 class="display-1 font-weight-thin">Discussion</h2>
                    <p @click="showMessages(c2)" class="hand">
                        Donnez votre opinion sur le constat <v-icon small color="primary" small>chat_bubble</v-icon>
                    </p>
                </div>
                <div id="b">
                    <h1 class="display-3 font-weight-thin">Besoin</h1>
                    <p>

                    </p>
                    <h2 class="display-1 font-weight-thin">Discussion</h2>
                    <p @click="showMessages(c2)" class="hand">
                        Donnez votre opinion sur les besoins <v-icon small color="primary" small>chat_bubble</v-icon>
                    </p>
                </div>
                <div id="f">
                    <h1 class="display-3 font-weight-thin">Fonction</h1>
                    <p>
                    </p>
                    <h2 class="display-1 font-weight-thin">Discussion</h2>
                    <p @click="showMessages(c2)" class="hand">
                        Donnez votre opinion sur les fonctions <v-icon small color="primary" small>chat_bubble</v-icon>
                    </p>
                </div>
                <div id="t">
                    <h1 class="display-3 font-weight-thin">Technique</h1>
                    <p>
                    </p>
                    <h2 class="display-1 font-weight-thin">Discussion</h2>
                    <p @click="showMessages(c2)" class="hand">
                        Donnez votre opinion sur la technique <v-icon small color="primary" small>chat_bubble</v-icon>
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
    </v-container>
</template>

<script>
    import RightMenu from "./layout/Messages"
    import {GO} from "../const/go"
    import On from "../const/on"
    import {mapActions} from "vuex"
    import Card from "./layout/Card"

    export default {
        name: "plan",
        components: {Card, RightMenu},
        data() {
            return {
                GO,
                c1: {title: "Constat #1", filter: {type: "constat#1"}},
                c2: {title: "Constat #2", filter: {type: "constat#2"}},
                b1: {title: "Besoin #1", filter: {type: "besoin#2"}},
                b2: {title: "Besoin #2", filter: {type: "besoin#2"}},
                f1: {title: "Fonction #1", filter: {type: "fonction#2"}},
                t1: {title: "Technique #1", filter: {type: "Technique#2"}}
            }
        },
        methods: {
            showMessages(filter) {
                this.dispatchShowMessage(filter)
            },
            ...mapActions({dispatchShowMessage: On.SHOW_MESSAGES})
        }
    }
</script>

<style>
    .main {
        margin-top: 4em
    }

    .main div {
        margin-top: 4em
    }

    p {
        margin-left: 1em
    }

    .v-btn__content {
        margin: 0px
    }

    a {
        text-decoration: none;
    }
</style>