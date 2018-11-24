<template>
    <v-flex key="equiv">
        <v-layout column wrap justify-center align-center class="ma-4">
            <h2 class="font-weight-thin">
                <v-layout row align>
                    <span>Quel est celui qui a deux fois <b>plus de</b>&nbsp;</span>
                    <b v-if="filter" class="font-weight-medium">{{ name(filter)}}</b>
                    <loader v-else/>
                    <span>?</span>
                </v-layout>
            </h2>
        </v-layout>

        <v-layout column align-center>
            <v-layout row>
                <v-card style="min-width: 320px" class="ma-3 pa-3">
                    <v-flex v-if="tree">
                        <v-layout column align-center>
                            <v-flex @click="goTree(tree)">
                                <photo :trunk="tree.trunk" size="200"/>
                            </v-flex>
                        </v-layout>
                        <tree-card-front :tree="tree"></tree-card-front>
                        <v-layout column align-center>
                            <span v-if="filter">({{qtUnitName(filter)}})</span>
                        </v-layout>
                    </v-flex>
                    <loader v-else/>
                    <v-btn v-if="other && state === 'playing'" block color="primary" @click="playLeft">moi</v-btn>
                </v-card>
                <v-card style="min-width: 320px" class="ma-3 pa-3">
                    <v-flex v-if="other">
                        <v-layout column align-center>
                            <v-flex @click="goTree(other)">
                                <photo :trunk="other.trunk" size="200"/>
                            </v-flex>
                        </v-layout>
                        <tree-card-front v-if="other" :tree="other"></tree-card-front>
                        <v-layout column align-center>
                            <h3 v-if="state === 'answered' && filterRight">({{qtUnitName(filterRight)}})</h3>
                        </v-layout>
                    </v-flex>
                    <v-layout v-else column align-center>
                        <v-spacer></v-spacer>
                        <loader></loader>
                    </v-layout>
                    <v-btn v-if="other && state === 'playing'" block color="primary" @click="playRight">moi</v-btn>
                </v-card>
            </v-layout>
        </v-layout>

        <v-layout row justify-center align-center>
            <span v-if="!finished">Réponses:</span>
            <template v-for="n in nbReponses">
                <v-icon x-large v-if="reponses[n-1] !== undefined" :color="reponses[n-1] ? 'green' : 'red'">check_circle</v-icon>
                <v-icon v-else x-large>panorama_fish_eye</v-icon>
            </template>
        </v-layout>

        <v-layout row>
            <v-btn v-if="state === 'playing'" :disabled="abandonsChances === 0" block flat @click="passQuestion">
                <span>passer cette question</span>
                <template v-for="n in abandonsChances">
                    <v-icon small>delete_outline</v-icon>
                </template>
            </v-btn>
        </v-layout>

        <v-layout align-center justify-center v-if="!finished && state === 'answered' && lastWasGood !== undefined">
            <h1 v-if="lastWasGood" class="font-weight-medium">Bravo!!</h1>
            <h1 v-else class="font-weight-thin">Dommage!!!</h1>
            <v-btn color="primary" @click="refresh">suivant</v-btn>
        </v-layout>

        <v-layout v-if="finished" align-center justify-center column>
            <h1 class="font-weight-thin">score final: {{bonnesReponses}}/{{nbReponses}}</h1>
            <h1 v-if="bonnesReponses === nbReponses" class="font-weight-thin">Score parfait! <b>Félicitations!!</b> Vous remportez la médaille "initié au {{name(filter)}}" BlueForest :)</h1>
            <h1 v-else-if="bonnesReponses / nbReponses> 0.7" class="font-weight-thin">Vraiment bon! <b>Bravo!!</b></h1>
            <h1 v-else-if="bonnesReponses / nbReponses > 0.5" class="font-weight-thin">De bonnes connaissances! <b>Poursuivez!!</b></h1>
            <h1 v-else-if="bonnesReponses / nbReponses > 0.3" class="font-weight-thin">Oups! <b>Réessayons.</b></h1>
            <h1 v-else class="font-weight-thin">Le but du jeu était de trouver là où il y avait plus de sucre :(</h1>
            <v-btn @click="replay">rejouer</v-btn>
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
    import TreeCardFront from "../tree/TreeCardFront"
    import Card from "../common/Card"
    import Photo from "../common/Photo"

    export default {
        name: "qui-deux",
        components: {Photo, Card, TreeCardFront, TreeCard, SelectableList, TreeHead, Loader},
        data() {
            return {
                nbReponses: 5,
                tree: null,
                type: null,
                filter: null,
                loading: false,
                plus: null,
                equivalences: [],
                reponses: [],
                abandonsChances: 2,
                state: 'playing',
                plusADroite: null
            }
        },
        props: ['_id', 'bqt', 'sbqt', 's_id'],
        watch: {
            '$route'(to, from) {
                this.refresh()
            }
        },
        computed: {
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
            other() {
                return this.equivalences && this.equivalences[0]
            },
            filterRight() {
                if (this.filter) {
                    if (this.plusADroite) {
                        return {name: this.filter.name, quantity: {bqt: this.filter.quantity.bqt * 2, g: this.filter.quantity.g}}
                    } else {
                        return {name: this.filter.name, quantity: {bqt: this.filter.quantity.bqt * 0.5, g: this.filter.quantity.g}}
                    }
                }
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
                dispatchLoad: On.LOAD_OPEN_TREE,
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
                this.abandonsChances--
                this.refresh()
            },
            replay() {
                this.reponses = []
                this.state = 'playing'
                this.plusADroite = null
                this.abandonsChances = 2
                this.refresh()
            },
            refresh: async function () {
                this.state = 'refreshing'
                try {
                    this.tree = await this.dispatchLoad({bqt: this.bqt, _id: this._id})
                    await this.tree.promises.facets
                    await this.tree.promises.impactsTank
                    this.updateFilter()
                    this.updateEquivalences()
                    this.state = 'playing'
                } catch (e) {
                    this.snack({text: "Cet élement n'existe pas ou plus", color: "orange"})
                }
            },
            updateFilter() {
                let attribut = this.tree && this.tree.facets && find(this.tree.facets, "_id", this.s_id)
                if (attribut) {
                    this.type = "facet"
                    this.filter = attribut
                    return
                }

                attribut = this.tree && this.tree.impactsTank && find(this.tree.impactsTank, "_id", this.s_id)
                if (attribut) {
                    this.type = "impact"
                    this.filter = attribut
                    return
                }

                attribut = this.tree && this.tree.roots && find(this.tree.roots, "_id", this.s_id)
                if (attribut) {
                    this.type = "root"
                    this.filter = attribut
                    return
                }
                console.warn("update filter but no equiv attribute")
            },
            async updateEquivalences() {
                if (this.filter) {
                    this.loading = true
                    this.plusADroite = Math.random() >= 0.5
                    const bqt = this.plusADroite ? this.sbqt * 2 : this.sbqt * 0.5
                    await this.dispatchSearchEquiv({results: this.equivalences, type: this.type, bqt, _id: this.filter[(this.type === "root" ? "_id" : `${this.type}Id`)]})
                    this.loading = false
                }
            }
        },
        created: function () {
            this.refresh()
        },
    }
</script>