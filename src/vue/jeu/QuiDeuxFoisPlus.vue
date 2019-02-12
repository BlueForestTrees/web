<template>
    <v-flex key="equiv">


        <v-layout column align-center>
            <v-toolbar class="elevation-0" color="primary" dark>
                <v-list-tile-avatar class="game logo"></v-list-tile-avatar>
                <v-toolbar-title>Jouer avec "{{name(tree)}}"</v-toolbar-title>
            </v-toolbar>

            <v-layout column wrap justify-center align-center class="ma-4">
                <h2 class="font-weight-thin">
                    <v-layout v-if="leftFragment" row align-center>
                        <span>Quel est celui qui a <b>plus de {{ name(leftFragment)}}</b>?</span>
                        <v-btn :disabled="!canAnswer" color="grey" flat small @click="passQuestion">je passe
                            <v-icon>play_arrow</v-icon>
                        </v-btn>
                    </v-layout>
                    <loader v-else/>
                </h2>
            </v-layout>

            <v-layout row justify-center align-center>
                <template v-for="n in nbReponses">
                    <v-icon x-large v-if="score[n-1] !== undefined" :color="score[n-1] ? 'green' : 'red'">check_circle</v-icon>
                    <v-icon v-else x-large>panorama_fish_eye</v-icon>
                </template>
            </v-layout>

            <v-layout :column="$vuetify.breakpoint.xsOnly">

                <choix-produit :tree="tree" :fragment="leftFragment" showFragment
                               @select="playLeft" :can-answer="canAnswer"/>
                <choix-produit :tree="right" :fragment="rightFragment" :showFragment="state === 'answered'"
                               @select="playRight" :can-answer="canAnswer"/>

            </v-layout>
        </v-layout>


        <transition name="slide-fade" mode="out-in">
            <v-layout v-if="state === 'answered' && lastWasGood !== undefined"
                      @click="nextQuestion" class="hand"
                      row align-center justify-center mb-4>
                <h1 v-if="lastWasGood" class="font-weight-thin display-3">Bravo!!</h1>
                <span v-else-if="resteQuestions" class="font-weight-thin display-1">
                    Perdu...
                    <img src="/img/broken-heart.svg" class="logo-petit"/>
                </span>
                <v-btn v-if="resteQuestions" color="primary" flat icon>
                    <v-icon x-large>play_arrow</v-icon>
                </v-btn>
            </v-layout>
        </transition>

        <v-layout v-if="!resteQuestions" align-center justify-center column>
            <h1 v-if="bonnesReponses !== nbReponses" class="font-weight-thin">Terminé! votre score: {{bonnesReponses}}/{{nbReponses}}</h1>
            <h1 v-if="bonnesReponses === nbReponses" class="font-weight-thin align"><img src="/img/cup.svg" class="logo"/>Score parfait! <b>Félicitations!!</b><br> Vous remportez la coupe "initié au {{name(leftFragment)}}" de BlueForest <img class="logo-petit" src="/img/logo.svg"/></h1>
            <h1 v-else-if="bonnesReponses / nbReponses> 0.7" class="font-weight-thin align"><img src="/img/medal.svg" class="logo"/><br>Vraiment bon! <b>Bravo!!</b><br>La médaille d'encouragement est à vous :)</h1>
            <h1 v-else-if="bonnesReponses / nbReponses > 0.5" class="font-weight-thin align"><img src="/img/thumb1.svg" class="logo"/>De bonnes connaissances! <b>Poursuivez!!</b></h1>
            <h1 v-else-if="bonnesReponses / nbReponses > 0.3" class="font-weight-thin align"><img src="/img/thumb.svg" class="logo"/>Oups!</h1>
            <h1 v-else class="font-weight-thin"><img src="/img/broken-heart.svg" class="logo-petit"/>Il faut trouver là où il y a le plus de {{name(leftFragment)}} :(</h1>

            <v-layout v-if="saved">
                <v-btn @click="replay" color="primary">rejouer</v-btn>
                <!--<v-btn @click="replay" color="primary">partager cette partie</v-btn>-->
            </v-layout>
            <v-layout v-else>
                <loader/>
                enregistrement...
            </v-layout>

        </v-layout>
    </v-flex>
</template>
<script>
    import {mapActions} from "vuex"
    import On from "../../const/on"
    import Loader from "../loader/Loader"
    import TreeHead from "../tree/TreeHead"
    import {find, map} from "unit-manip"
    import SelectableList from "../common/SelectableList"
    import {qtUnitName, name, createStringObjectId} from "../../services/calculations"
    import TreeCard from "../tree/TreeCard"
    import Card from "../common/Card"
    import Photo from "../common/Photo"
    import QtUnitName from "../tree/QtUnitName"
    import {TRUNK} from "../../const/fragments"
    import ChoixProduit from "./ChoixProduit"
    import {QUI2} from "../../const/games"

    export default {
        name: "qui-deux",
        components: {ChoixProduit, QtUnitName, Photo, Card, TreeCard, SelectableList, TreeHead, Loader},
        data() {
            return {
                nbReponses: 5,
                tree: null,
                right: null,
                type: null,
                coef: null,
                leftFragment: null,
                plus: null,
                equivalences: [],
                game: null,
                score: [],
                state: 'playing',
                saved: false
            }
        },
        props: ['gameId', 'leftId', 'leftBqt', 'fragment', 'fragmentId'],
        watch: {
            '$route'(to, from) {
                this.refresh()
            }
        },
        computed: {
            canAnswer() {
                return !!(this.state === 'playing' && this.tree && this.right)
            },
            bonnesReponses() {
                let res = 0
                for (let i = 0; i < this.score.length; i++) {
                    if (this.score[i]) res++
                }
                return res
            },
            resteQuestions() {
                return this.score.length < this.nbReponses
            },
            rightFragment() {
                if (this.leftFragment) {
                    return {name: this.leftFragment.name, quantity: {bqt: this.applyCoef(this.leftFragment.quantity.bqt), g: this.leftFragment.quantity.g}}
                }
            },
            lastWasGood() {
                if (!this.score.length) {
                    return undefined
                } else {
                    return this.score[this.score.length - 1]
                }
            },
            nextSavedGameQuestion() {
                return this.game && this.game.questions && this.game.questions[this.score.length]
            }
        },
        async created() {
            await this.newGame()
            await this.loadGameData()
            await this.nextQuestion()
        },
        methods: {
            qtUnitName, name,
            ...mapActions({
                loadTree: On.LOAD_OPEN_TREE,
                loadGame: On.LOAD_GAME,
                saveGame: On.SAVE_GAME,
                saveScore: On.SAVE_SCORE,
                loadRandomTreeFromFragment: On.RANDOM_TREE_FROM_FRAGMENT,
            }),
            async newGame() {
                if (this.gameId) {
                    this.game = await this.loadGame({_id: this.gameId})
                } else {
                    this.game = {
                        type: QUI2,
                        leftId: this.leftId,
                        leftBqt: this.leftBqt,
                        fragment: this.fragment,
                        fragmentId: this.fragmentId,
                        questions: []
                    }
                }
            },
            async loadGameData() {
                this.tree = await this.loadTree({bqt: this.game.leftBqt, _id: this.game.leftId, fragments: [TRUNK, this.game.fragment]})
                await this.tree.promises.all
                this.leftFragment = this.tree && this.tree[this.game.fragment] && find(this.tree[this.game.fragment], `${this.game.fragment}Id`, this.game.fragmentId)
            },
            passQuestion() {
                this.nextQuestion()
            },
            applyCoef(bqt) {
                return bqt + bqt * this.coef
            },
            async nextQuestion() {
                this.state = 'playing'
                this.right = null

                this.coef = this.nextSavedGameQuestion ?
                    this.nextSavedGameQuestion.coef
                    :
                    Math.random() - 0.5//random de -0.5 à +0.5

                this.right = await this.loadRandomTreeFromFragment({
                    bqt: this.applyCoef(this.leftFragment.quantity.bqt),
                    entryId: this.game.fragmentId,
                    type: this.game.fragment,
                    treeId: this.nextSavedGameQuestion ? this.nextSavedGameQuestion.rightId : undefined
                })
                await this.right.promises.all

            },
            playLeft() {
                this.playWith(this.leftFragment.quantity.bqt >= this.rightFragment.quantity.bqt)
            },
            playRight() {
                this.playWith(this.leftFragment.quantity.bqt <= this.rightFragment.quantity.bqt)
            },
            playWith(goodResponse) {
                this.game.questions.push({rightId: this.right._id, coef: this.coef})
                this.score.push(goodResponse)
                this.state = 'answered'
                if (!this.resteQuestions) {
                    this.finishPartie()
                }
            },
            async finishPartie() {
                this.game._id = this.game._id || createStringObjectId()
                await this.saveGame(this.game)
                await this.saveScore({
                    _id: createStringObjectId(),
                    type: QUI2,
                    gameId: this.game._id,
                    score: this.score
                })
                this.saved = true
            },
            replay() {
                this.score = []
                this.state = 'playing'
                this.newGame()
                this.nextQuestion()
            }
        }
    }
</script>