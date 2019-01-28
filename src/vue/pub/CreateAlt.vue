<template>
    <div>
        <v-card>
            <v-layout column align-center>
                <v-layout column align-center justify-center my-5>
                    <span class="font-weight-thin text-no-wrap display-1 ma-2">Choisir:</span>
                    <selection-card-front v-if="leftTree && leftTree.selection" :selection="leftTree.selection" :attribute="leftAttribute"/>
                    <v-flex v-else class="bold-font display-2 mx-3">A</v-flex>
                    <span class="font-weight-thin text-no-wrap display-1 ma-2">Au lieu de:</span>
                    <selection-card-front v-if="rightTree && rightTree.selection" :selection="rightTree.selection" :attribute="rightAttribute"/>
                    <v-flex v-else class="bold-font display-2 mx-3">B</v-flex>
                </v-layout>
                <v-layout column align-center my-5 class="align">
                    <span class="font-weight-thin display-1  ma-2">C'est éviter l'équivalent de :</span>
                    <selection-card-front v-if="equivTree && equivTree.selection" :selection="equivTree.selection" :attribute="equivAttribute"/>
                    <v-flex v-else class="bold-font display-2 mx-3">C</v-flex>
                    <v-layout align-center class="font-weight-thin"><v-icon color="orange" large>warning</v-icon>Le résultat est négatif</v-layout>
                </v-layout>
            </v-layout>
        </v-card>

        <v-container transition="slide-x-transition" reverse-transition="slide-x-reverse-transition">
            <v-card>
                <v-toolbar class="elevation-0" color="primary" dark>
                    <v-toolbar-title class="font-weight-black">Détails de l'équivalence</v-toolbar-title>
                </v-toolbar>
                <v-container>
                    <v-layout column>
                        <v-list>
                            <v-list-tile v-if="!editing || idx === 1" key="1">
                                <v-list-tile-content>
                                    <v-list-tile-title>Produit A:<span v-if="leftTree && leftTree.selection" class="font-weight-medium ml-3">{{qtUnitName(leftTree.selection)}}</span></v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-btn v-if="editing" icon @click="close">
                                        <v-icon color="grey" large>close</v-icon>
                                    </v-btn>
                                    <v-btn v-else icon @click="idx = 1">
                                        <v-icon color="primary">edit</v-icon>
                                    </v-btn>
                                </v-list-tile-action>
                            </v-list-tile>
                            <v-list-tile v-if="!editing || idx === 2" key="2">
                                <v-list-tile-content>
                                    <v-list-tile-title>Produit B:<span v-if="rightTree && rightTree.selection" class="font-weight-medium ml-3">{{name(rightTree.selection)}}</span></v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-btn v-if="editing" icon @click="close">
                                        <v-icon color="grey" large>close</v-icon>
                                    </v-btn>
                                    <v-btn v-else icon @click="idx = 2">
                                        <v-icon color="primary">edit</v-icon>
                                    </v-btn>
                                </v-list-tile-action>
                            </v-list-tile>
                            <v-list-tile v-if="!editing || idx === 3" key="3">
                                <v-list-tile-content>
                                    <v-list-tile-title>Produit C:<span v-if="equivTree && equivTree.selection" class="font-weight-medium ml-3">{{name(equivTree.selection)}}</span></v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-btn v-if="editing" icon @click="close">
                                        <v-icon color="grey" large>close</v-icon>
                                    </v-btn>
                                    <v-btn v-else icon @click="idx = 3">
                                        <v-icon color="primary">edit</v-icon>
                                    </v-btn>
                                </v-list-tile-action>
                            </v-list-tile>
                            <v-list-tile v-if="!editing || idx === 4" key="4">
                                <v-list-tile-content>
                                    <v-list-tile-title>Aspect pris en compte:<span v-if="info && info.fragment" class="font-weight-medium ml-3">{{info.fragment.name}}</span></v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-btn v-if="editing" icon @click="close">
                                        <v-icon color="grey" large>close</v-icon>
                                    </v-btn>
                                    <v-btn v-else icon @click="idx = 4">
                                        <v-icon color="primary">edit</v-icon>
                                    </v-btn>
                                </v-list-tile-action>
                            </v-list-tile>
                            <v-list-tile v-if="!editing || idx === 5" key="5">
                                <v-list-tile-content>
                                    <v-list-tile-title>Nom:<span class="font-weight-medium ml-3">{{info && info.path}}</span></v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-btn v-if="editing" icon @click="close">
                                        <v-icon color="grey" large>close</v-icon>
                                    </v-btn>
                                    <v-btn v-else icon @click="idx = 5">
                                        <v-icon color="primary">edit</v-icon>
                                    </v-btn>
                                </v-list-tile-action>
                            </v-list-tile>
                            <v-list-tile v-if="!editing || idx === 6" key="6">
                                <v-list-tile-content>
                                    <v-list-tile-title>Commentaire (optionnel):<span class="font-weight-medium ml-3">{{info && info.description}}</span></v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-btn v-if="editing" icon @click="close">
                                        <v-icon color="grey" large>close</v-icon>
                                    </v-btn>
                                    <v-btn v-else icon @click="idx = 6">
                                        <v-icon color="primary">edit</v-icon>
                                    </v-btn>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list>
                    </v-layout>
                </v-container>
                <v-window v-model="idx">
                    <v-window-item></v-window-item>
                    <v-window-item lazy transition="fade-transition">
                        <tree-selection-finder @select="selectProductA" :tree="leftTree"/>
                    </v-window-item>
                    <v-window-item lazy transition="slide-x-transition" reverse-transition="slide-x-reverse-transition">
                        <tree-selection-finder @select="selectProductB" :tree="rightTree"/>
                    </v-window-item>
                    <v-window-item lazy transition="slide-x-transition" reverse-transition="slide-x-reverse-transition">
                        <tree-selection-finder @select="selectProductC" :tree="equivTree"/>
                    </v-window-item>
                    <v-window-item lazy transition="slide-x-transition" reverse-transition="slide-x-reverse-transition">
                        <attribute-finder :trees="[leftTree, rightTree, equivTree]" @select="selectFragment"/>
                    </v-window-item>
                    <v-window-item lazy transition="slide-x-transition" reverse-transition="slide-x-reverse-transition">
                        <path-checker @save="selectPath" :path="info && info.path"/>
                    </v-window-item>
                    <v-window-item lazy transition="slide-x-transition" reverse-transition="slide-x-reverse-transition">
                        <description-input @save="selectDescription" :value="info && info.description"/>
                    </v-window-item>
                </v-window>
            </v-card>
        </v-container>

        <info-saver v-if="!editing" v-model="canSave" :info="info" @delete="remove"/>

    </div>
</template>
<script>
    import Card from "../common/Card"
    import {GO} from "../../const/go"
    import SelectionCardFront from "../tree/SelectionCardFront"
    import {getAttributeByFragment, qtFreq, name, qtUnitName} from "../../services/calculations"
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import TreeSelectionFinder from "../tree/TreeSelectionFinder"
    import AttributeFinder from "../tree/AttributeFinder"
    import PathChecker from "./PathChecker"
    import DescriptionInput from "./DescriptionInput"
    import InfoSaver from "./InfoSaver"
    import {infoFragments} from "../../const/fragments"
    import InfoLoader from "./InfoLoader"

    const createInfo = () => ({type: "alt", fragment: null, leftSelection: null, rightSelection: null, equivSelection: null, path: null, description: null})

    export default {
        name: "create-alt",
        components: {InfoSaver, DescriptionInput, PathChecker, AttributeFinder, TreeSelectionFinder, SelectionCardFront, Card},
        mixins: [InfoLoader],
        data: () => ({
            GO,
            idx: 0,
            canSave: false,
            info: createInfo(),
            leftTree: null, rightTree: null, equivTree: null
        }),
        methods: {
            qtUnitName, name, qtFreq, createInfo,
            ...mapActions({
                loadSelectionTree: On.LOAD_SELECTION_TREE,
                applyCoefAll: On.APPLY_QUANTITY_COEF_ALL,
            }),
            close() {
                this.idx = 0
            },
            selectProductA({selection}) {
                this.info.leftSelection = selection
                this.refreshTree(this.info.leftSelection).then(leftTree => this.leftTree = leftTree)
                this.canSave = true
                this.close()
            },
            selectProductB({selection}) {
                this.info.rightSelection = selection
                this.refreshTree(this.info.rightSelection).then(rightTree => this.rightTree = rightTree)
                this.canSave = true
                this.close()
            },
            selectProductC({selection}) {
                this.info.equivSelection = selection
                this.refreshTree(this.info.equivSelection).then(equivTree => this.equivTree = equivTree)
                this.canSave = true
                this.close()
            },
            selectFragment(fragment) {
                this.info.fragment = fragment
                this.canSave = true
                this.close()
            },
            selectPath(path) {
                this.info.path = path
                this.canSave = true
                this.close()
            },
            selectDescription(description) {
                this.info.description = description
                this.canSave = true
                this.close()
            },
            refreshTree(selection) {
                return this.loadSelectionTree({selection, fragments: infoFragments})
            },
            async infoChanged(info) {
                if (info) {
                    this.info = info
                    this.leftTree = await this.refreshTree(this.info.leftSelection)
                    this.rightTree = await this.refreshTree(this.info.rightSelection)
                    this.equivTree = await this.refreshTree(this.info.equivSelection)
                }
            },
            remove() {
                this.info = createInfo()
                this.leftTree = null
                this.rightTree = null
                this.equivTree = null
            }
        },
        computed: {
            leftAttribute() {
                return this.leftTree && this.info.fragment && getAttributeByFragment(this.leftTree, this.info.fragment)
            },
            rightAttribute() {
                return this.rightTree && this.info.fragment && getAttributeByFragment(this.rightTree, this.info.fragment)
            },
            equivAttribute() {
                return this.equivTree && this.info.fragment && getAttributeByFragment(this.equivTree, this.info.fragment)
            },
            deltaAttribute() {
                if (this.leftAttribute && this.rightAttribute) {
                    const deltaBqt = this.rightAttribute.quantity.bqt - this.leftAttribute.quantity.bqt
                    const delta = JSON.parse(JSON.stringify(this.rightAttribute))
                    delta.quantity.bqt = deltaBqt
                    return delta
                }
            },
            coef() {
                if (this.deltaAttribute && this.equivAttribute) {
                    return this.deltaAttribute.quantity.bqt / this.equivAttribute.quantity.bqt
                }
            },
            editing() {
                return this.idx !== 0
            }
        },
        watch: {
            coef(c) {
                if (c && c !== 1) {
                    this.applyCoefAll({tree: this.equivTree, coef: c})
                }
            }
        }
    }
</script>