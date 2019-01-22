<template>
    <div>

        <v-card>
            <v-layout column align-center>
                <v-layout :column="$vuetify.breakpoint.smAndDown" align-center justify-center my-5>
                    <template v-if="leftTree && leftTree.selection">
                        <v-container align>
                            <v-layout column align-center>
                                <selection-link :selection="leftTree.selection"/>
                                <transition-expand>
                                    <div v-if="leftAttribute" class="font-weight-thin">Soit {{qtUnitName(leftAttribute)}}</div>
                                </transition-expand>
                            </v-layout>
                        </v-container>
                    </template>
                    <v-flex v-else class="bold-font display-2">A</v-flex>
                    <p class="bold-font align display-2 ma-4">=</p>
                    <template v-if="rightTree && rightTree.selection">
                        <v-container align>
                            <v-layout column align-center>
                                <selection-link :selection="rightTree.selection"/>
                                <transition-expand>
                                    <div v-if="rightAttribute" class="font-weight-thin">Soit {{qtUnitName(rightAttribute)}}</div>
                                </transition-expand>
                            </v-layout>
                        </v-container>
                    </template>
                    <v-flex v-else class="bold-font display-2">B</v-flex>
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
                                    <v-list-tile-title>Aspect pris en compte:<span v-if="info && info.fragment" class="font-weight-medium ml-3">{{info.fragment.name}}</span></v-list-tile-title>
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
                                    <v-list-tile-title>Nom:<span class="font-weight-medium ml-3">{{info && info.path}}</span></v-list-tile-title>
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
                                    <v-list-tile-title>Description (optionnel):<span class="font-weight-medium ml-3">{{info && info.description}}</span></v-list-tile-title>
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
                        <attribute-finder :trees="[leftTree, rightTree]" @select="selectFragment"/>
                    </v-window-item>
                    <v-window-item lazy transition="slide-x-transition" reverse-transition="slide-x-reverse-transition">
                        <name-checker @save="selectPath"/>
                    </v-window-item>
                    <v-window-item lazy transition="slide-x-transition" reverse-transition="slide-x-reverse-transition">
                        <description-input @save="selectDescription"/>
                    </v-window-item>
                </v-window>
                <v-container v-if="!editing">
                    <v-layout column align-center>
                        <v-btn :disabled="!canSave" color="primary" @click="saveOrUpdate">Enregistrer</v-btn>
                        <div v-if="canBrowseToEqPage">Accès à l'équivalence: <a :href="url">{{url}}</a></div>
                    </v-layout>
                </v-container>
            </v-card>
        </v-container>
    </div>
</template>
<script>
    import Vue from 'vue'
    import Card from "../common/Card"
    import TreeCard from "../tree/TreeCard"
    import TreeSelectionFinder from "../tree/TreeSelectionFinder"
    import AttributeFinder from "../tree/AttributeFinder"
    import {attributeCoef, createStringObjectId, getAttributeByFragment, name, qtUnitName} from "../../services/calculations"
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import NameChecker from "./NameChecker"
    import DescriptionInput from "./DescriptionInput"
    import SelectionLink from "./Selection-Link"
    import {infoFragments} from "../../const/fragments"
    import TransitionExpand from "../common/TransitionExpand"

    export default {
        name: "create-eq",
        components: {TransitionExpand, SelectionLink, DescriptionInput, NameChecker, AttributeFinder, TreeSelectionFinder, TreeCard, Card},
        props: ['path'],
        data: () => ({
            idx: 0, saved: true,
            info: {type: "eq", fragment: null, leftSelection: null, rightSelection: null, path: null, description: null},
            leftTree: null, rightTree: null
        }),
        methods: {
            qtUnitName, name,
            close() {
                this.idx = 0
            },
            selectProductA({selection}) {
                this.info.leftSelection = selection
                this.refreshTree(this.info.leftSelection).then(leftTree => this.leftTree = leftTree)
                this.saved = false
                this.close()
            },
            selectProductB({selection}) {
                this.info.rightSelection = selection
                this.refreshTree(this.info.rightSelection).then(rightTree => this.rightTree = rightTree)
                this.saved = false
                this.close()
            },
            selectFragment(fragment) {
                this.info.fragment = fragment
                this.saved = false
                this.close()
            },
            selectPath(path) {
                this.info.path = path
                this.saved = false
                this.close()
            },
            selectDescription(description) {
                this.info.description = description
                this.saved = false
                this.close()
            },
            saveOrUpdate() {
                if (this.info._id) {
                    this.update()
                } else {
                    this.save()
                }
            },
            save() {
                const _id = createStringObjectId()
                this.saveInfo({_id, ...this.info})
                    .then(() => {
                        this.info._id = _id
                        this.saved = true
                    })
            },
            update() {
                this.updateInfo(this.info).then(() => {
                    this.saved = true
                })
            },

            async refresh() {
                if (this.path) {
                    try {
                        this.info = await this.getInfo({path: this.path})
                        this.leftTree = await this.refreshTree(this.info.leftSelection)
                        this.rightTree = await this.refreshTree(this.info.rightSelection)
                    } catch (e) {
                        console.error(e)
                    }
                }
            },
            refreshTree(selection) {
                return this.loadSelectionTree({selection, fragments: infoFragments})
            },
            ...mapActions({
                loadSelectionTree: On.LOAD_SELECTION_TREE,
                applyCoef: On.APPLY_QUANTITY_COEF,
                saveInfo: On.SAVE_INFO,
                updateInfo: On.UPDATE_INFO,
                getInfo: On.GET_INFO
            }),


        },
        mounted() {
            this.refresh()
        },
        computed: {
            editing() {
                return this.idx !== 0
            },
            canBrowseToEqPage() {
                return this.url && this.saved
            },
            url() {
                return this.info.path && `${Vue.http.options.root}/info/${this.info.path}`
            },
            canSave() {
                return !this.saved && this.info.path && this.info.leftSelection && this.info.rightSelection && this.info.fragment
            },
            leftAttribute() {
                return this.leftTree && this.info.fragment && getAttributeByFragment(this.leftTree, this.info.fragment)
            },
            rightAttribute() {
                return this.rightTree && this.info.fragment && getAttributeByFragment(this.rightTree, this.info.fragment)
            },
            coef() {
                return this.leftAttribute
                    && this.rightAttribute
                    && this.info.fragment
                    && attributeCoef(this.leftAttribute, this.rightAttribute, this.info.fragment)
            },
        },
        watch: {
            coef(c) {
                if (c && c !== 1) {
                    this.applyCoef({tree: this.rightTree, coef: c})
                }
            },
            '$route'(to, from) {
                this.refresh()
            }
        }
    }
</script>