<template>
    <v-flex key="equiv">

        <v-layout column align-center>
            <v-toolbar class="elevation-0" color="primary" dark>
                <v-list-tile-avatar class="game logo"></v-list-tile-avatar>
                <v-toolbar-title>Jouer avec "{{name(tree)}}"</v-toolbar-title>
            </v-toolbar>
            <v-layout row justify-center align-center my-3>
                <template v-for="n in nbReponses">
                    <v-icon x-large v-if="reponses[n-1] !== undefined" :color="reponses[n-1] ? 'green' : 'red'">check_circle</v-icon>
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

        <v-layout v-if="state === 'playing'" column wrap justify-center align-center class="ma-4">
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

        <v-layout v-if="state === 'answered' && lastWasGood !== undefined" row align-end justify-center mb-4>
            <h1 v-if="lastWasGood" class="font-weight-thin display-3">Bravo!!</h1>
            <h1 v-else class="font-weight-thin  display-3">Perdu...</h1>
            <v-btn v-if="!finished" color="primary" @click="nextRight" flat>suivant
                <v-icon>play_arrow</v-icon>
            </v-btn>
        </v-layout>

        <v-layout v-if="finished" align-center justify-center column>
            <h1 v-if="bonnesReponses !== nbReponses" class="font-weight-thin">Terminé! votre score: {{bonnesReponses}}/{{nbReponses}}</h1>
            <h1 v-if="bonnesReponses === nbReponses" class="font-weight-thin align"><img src="/img/cup.svg" class="logo"/>Score parfait! <b>Félicitations!!</b><br> Vous remportez la coupe "initié au {{name(leftFragment)}}" BlueForest :)</h1>
            <h1 v-else-if="bonnesReponses / nbReponses> 0.7" class="font-weight-thin align"><img src="/img/medal.svg" class="logo"/><br>Vraiment bon! <b>Bravo!!</b><br>La médaille d'encouragement est à vous :)</h1>
            <h1 v-else-if="bonnesReponses / nbReponses > 0.5" class="font-weight-thin align"><img src="/img/thumb1.svg" class="logo"/>De bonnes connaissances! <b>Poursuivez!!</b></h1>
            <h1 v-else-if="bonnesReponses / nbReponses > 0.3" class="font-weight-thin align"><img src="/img/thumb.svg" class="logo"/>Oups! <b>Réessayons.</b></h1>
            <h1 v-else class="font-weight-thin"><img src="/img/broken-heart.svg" class="logo-petit"/>Il faut trouver là où il y a le plus de {{name(leftFragment)}} :(</h1>
            <v-btn @click="replay" color="primary">rejouer</v-btn>
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
    import {qtUnitName, name} from "../../services/calculations"
    import TreeCard from "../tree/TreeCard"
    import Card from "../common/Card"
    import Photo from "../common/Photo"
    import QtUnitName from "../tree/QtUnitName"
    import {TRUNK} from "../../const/fragments"
    import ChoixProduit from "./ChoixProduit"

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
                reponses: [],
                state: 'playing'
            }
        },
        props: ['leftId', 'leftBqt', 'fragment', 'fragmentId'],
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
                for (let i = 0; i < this.reponses.length; i++) {
                    if (this.reponses[i]) res++
                }
                return res
            },
            finished() {
                return this.reponses.length >= this.nbReponses
            },
            rightFragment() {
                if (this.leftFragment) {
                    return {name: this.leftFragment.name, quantity: {bqt: this.leftFragment.quantity.bqt * this.coef, g: this.leftFragment.quantity.g}}
                }
            },
            plusADroite() {
                return this.coef > 1
            },
            lastWasGood() {
                if (!this.reponses.length) {
                    return undefined
                } else {
                    return this.reponses[this.reponses.length - 1]
                }
            }
        },
        methods: {
            qtUnitName, name,
            ...mapActions({
                loadTree: On.LOAD_OPEN_TREE,
                loadRandomTreeFromFragment: On.RANDOM_TREE_FROM_FRAGMENT,
                dispatchSearchEquiv: On.SEARCH_EQUIV,
                snack: On.SNACKBAR,
                goTree: On.GO_TREE,
                compare: On.GO_COMPARE,
                dispatchAddToBasket: On.ADD_TO_BASKET,
                showDialog: On.SHOW_DIALOG
            }),
            playLeft() {
                this.reponses.push(!this.plusADroite)
                this.state = 'answered'
            },
            playRight() {
                this.reponses.push(this.plusADroite)
                this.state = 'answered'
            },
            addToBasket: function (selection) {
                this.dispatchAddToBasket(map(selection, e => ({_id: e._id, trunk: e})))
            },
            passQuestion() {
                this.nextRight()
            },
            replay() {
                this.reponses = []
                this.state = 'playing'
                this.nextRight()
            },
            async init() {
                try {
                    this.tree = await this.loadTree({bqt: this.leftBqt, _id: this.leftId, fragments: [TRUNK, this.fragment]})
                    await this.tree.promises.all
                } catch (e) {
                    this.snack({text: "Certaines parties du jeu n'existe pas ou plus :(", color: "orange"})
                    throw e
                }
                this.leftFragment = this.tree && this.tree[this.fragment] && find(this.tree[this.fragment], `${this.fragment}Id`, this.fragmentId)
            },
            async nextRight() {
                this.right = null
                this.coef = 0.5 + (Math.random() * 1.5)//random de 0.5 à 2
                this.right = await this.loadRandomTreeFromFragment({
                    bqt: this.leftFragment.quantity.bqt * this.coef,
                    entryId: this.fragmentId,
                    type: this.fragment
                })
                await this.right.promises.all

                this.state = 'playing'
            }
        },
        async created() {
            await this.init()
            await this.nextRight()
        },
    }
</script>