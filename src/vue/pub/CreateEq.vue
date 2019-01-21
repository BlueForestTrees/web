<template>
    <div>
        <v-card>
            <v-layout column align-center>
                <v-layout :column="$vuetify.breakpoint.smAndDown" align-center justify-center my-5>
                    <span v-if="aTree" class="font-weight-thin display-1">{{qtUnitName(aTree)}}</span>
                    <v-flex v-else class="bold-font display-2">A</v-flex>
                    <p class="bold-font align display-2 ma-4">=</p>
                    <span v-if="bTree" class="font-weight-thin display-1">{{qtUnitName(bTree)}}</span>
                    <v-flex v-else class="bold-font display-2">B</v-flex>
                </v-layout>
                <v-layout v-if="fragment" row align-center class="font-weight-medium pa-3">
                    <v-icon color="green" class="mr-2">info</v-icon>
                    Aspect pris en compte: {{fragment && fragment.name}}
                </v-layout>
                <span v-else><br><br></span>
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
                            <transition-group name="list-complete">
                                <v-list-tile v-if="!editing || idx === 1" key="1" class="list-complete-item">
                                    <v-list-tile-content>
                                        <v-list-tile-title>Produit A:<span v-if="aTree" class="font-weight-medium ml-3">{{qtUnitName(aTree)}}</span></v-list-tile-title>
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
                                <v-list-tile v-if="!editing || idx === 2" key="2" class="list-complete-item">
                                    <v-list-tile-content>
                                        <v-list-tile-title>Produit B:<span v-if="bTree" class="font-weight-medium ml-3">{{name(bTree)}}</span></v-list-tile-title>
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
                                <v-list-tile v-if="!editing || idx === 3" key="3" class="list-complete-item">
                                    <v-list-tile-content>
                                        <v-list-tile-title>Aspect pris en compte:<span v-if="fragment" class="font-weight-medium ml-3">{{fragment.name}}</span></v-list-tile-title>
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
                                <v-list-tile v-if="!editing || idx === 4" key="4" class="list-complete-item">
                                    <v-list-tile-content>
                                        <v-list-tile-title>Nom:<span class="font-weight-medium ml-3">{{path}}</span></v-list-tile-title>
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
                            </transition-group>
                        </v-list>
                    </v-layout>
                </v-container>
                <v-window v-model="idx">
                    <v-window-item></v-window-item>
                    <v-window-item lazy transition="fade-transition">
                        <tree-selection-finder @select="selectProductA"/>
                    </v-window-item>
                    <v-window-item lazy transition="slide-x-transition" reverse-transition="slide-x-reverse-transition">
                        <tree-selection-finder @select="selectProductB"/>
                    </v-window-item>
                    <v-window-item lazy transition="slide-x-transition" reverse-transition="slide-x-reverse-transition">
                        <attribute-finder :trees="[aTree, bTree]" @select="selectFragment"/>
                    </v-window-item>
                    <v-window-item lazy transition="slide-x-transition" reverse-transition="slide-x-reverse-transition">
                        <name-checker @save="save"/>
                    </v-window-item>
                </v-window>
            </v-card>
        </v-container>

    </div>
</template>
<script>
    import Card from "../common/Card"
    import TreeCard from "../tree/TreeCard"
    import TreeSelectionFinder from "../tree/TreeSelectionFinder"
    import AttributeFinder from "../tree/AttributeFinder"
    import {coefByFragment, createStringObjectId, name, qtUnitName} from "../../services/calculations"
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import NameChecker from "./NameChecker"

    export default {
        name: "create-eq",
        components: {NameChecker, AttributeFinder, TreeSelectionFinder, TreeCard, Card},
        data: () => ({idx: 0, aTree: null, bTree: null, fragment: null, saved: null, path: null}),
        methods: {
            qtUnitName, name,
            close() {
                this.idx = 0
            },
            selectProductA(tree) {
                this.aTree = tree
                this.close()
            },
            selectProductB(tree) {
                this.bTree = tree
                this.close()
            },
            selectFragment(fragment) {
                this.fragment = fragment
                this.close()
            },
            save(name) {
                this.saveInfo({
                    _id: createStringObjectId(),
                    type: "eq",
                    path: name,
                    leftSelectionId: this.aTree.selection._id,
                    rightSelectionId: this.aTree.selection._id,
                    fragmentType: this.fragment.type,
                    fragmentId: this.fragment._id
                }).then(() => {
                    this.path = name
                    this.saved = true
                    this.close()
                })
            },
            ...mapActions({
                applyCoef: On.APPLY_QUANTITY_COEF,
                saveInfo: On.SAVE_INFO
            }),



            beforeEnter: function (el) {
                el.style.opacity = 0
                el.style.height = 0
            },
            enter: function (el, done) {
                var delay = el.dataset.index * 150
                setTimeout(function () {
                    Velocity(
                        el,
                        { opacity: 1, height: '1.6em' },
                        { complete: done }
                    )
                }, delay)
            },
            leave: function (el, done) {
                var delay = el.dataset.index * 150
                setTimeout(function () {
                    Velocity(
                        el,
                        { opacity: 0, height: 0 },
                        { complete: done }
                    )
                }, delay)
            }


        },
        computed: {
            coef() {
                if (this.aTree && this.bTree && this.fragment) {
                    return coefByFragment(this.aTree, this.bTree, this.fragment)
                }
            },
            editing() {
                return this.idx !== 0
            }
        },
        watch: {
            coef(c) {
                if (c) {
                    this.applyCoef({tree: this.bTree, coef: c})
                }
            }
        }
    }
</script>