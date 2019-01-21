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
                                <v-list-tile v-if="!editing || idx === 5" key="5" class="list-complete-item">
                                    <v-list-tile-content>
                                        <v-list-tile-title>Description (optionnel):<span class="font-weight-medium ml-3">{{description}}</span></v-list-tile-title>
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
                            </transition-group>
                        </v-list>
                    </v-layout>
                </v-container>
                <v-window v-model="idx">
                    <v-window-item></v-window-item>
                    <v-window-item lazy transition="fade-transition">
                        <tree-selection-finder @select="selectProductA" :tree="aTree"/>
                    </v-window-item>
                    <v-window-item lazy transition="slide-x-transition" reverse-transition="slide-x-reverse-transition">
                        <tree-selection-finder @select="selectProductB" :tree="bTree"/>
                    </v-window-item>
                    <v-window-item lazy transition="slide-x-transition" reverse-transition="slide-x-reverse-transition">
                        <attribute-finder :trees="[aTree, bTree]" @select="selectFragment"/>
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
                        <v-btn :disabled="!canSave" color="primary" @click="save">Enregistrer</v-btn>
                        <div v-if="accessible">Accès à l'équivalence: <a :href="url">{{url}}</a></div>
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
    import {coefByFragment, createStringObjectId, name, qtUnitName} from "../../services/calculations"
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import NameChecker from "./NameChecker"
    import DescriptionInput from "./DescriptionInput"

    export default {
        name: "create-eq",
        components: {DescriptionInput, NameChecker, AttributeFinder, TreeSelectionFinder, TreeCard, Card},
        data: () => ({
            idx: 0, saved: true,
            aTree: null, bTree: null, fragment: null,
            path: null, description: null
        }),
        methods: {
            qtUnitName, name,
            close() {
                this.idx = 0
            },
            selectProductA(tree) {
                this.aTree = tree
                this.saved = false
                this.close()
            },
            selectProductB(tree) {
                this.bTree = tree
                this.saved = false
                this.close()
            },
            selectFragment(fragment) {
                if (this.fragment !== fragment) {
                    this.fragment = fragment
                    this.saved = false
                }
                this.close()
            },
            selectPath(path) {
                if (this.path !== path) {
                    this.path = path
                    this.saved = false
                }
                this.close()
            },
            selectDescription(description) {
                if (this.description !== description) {
                    this.description = description
                    this.saved = false
                }
                this.close()
            },
            save() {
                if (!this._id) {
                    const _id = createStringObjectId()
                    this.saveInfo({
                        _id,
                        type: "eq",
                        path: this.path,
                        leftSelection: this.aTree.selection,
                        rightSelection: this.bTree.selection,
                        fragmentType: this.fragment.type,
                        fragmentId: this.fragment._id,
                        fragmentName: this.fragment.name,
                        description: this.description
                    }).then(() => {
                        this._id = _id
                        this.saved = true
                    })
                } else {
                    this.updateInfo({
                        _id: this._id,
                        type: "eq",
                        path: this.path,
                        leftSelection: this.aTree.selection,
                        rightSelection: this.aTree.selection,
                        fragmentType: this.fragment.type,
                        fragmentId: this.fragment._id,
                        fragmentName: this.fragment.name,
                        description: this.description
                    }).then(() => {
                        this.saved = true
                    })
                }
            },
            ...mapActions({
                applyCoef: On.APPLY_QUANTITY_COEF,
                saveInfo: On.SAVE_INFO,
                updateInfo: On.UPDATE_INFO,
            }),


        },
        computed: {
            coef() {
                if (this.aTree && this.bTree && this.fragment) {
                    return coefByFragment(this.aTree, this.bTree, this.fragment)
                }
            },
            editing() {
                return this.idx !== 0
            },
            accessible() {
                return this.url && this.saved
            },
            url() {
                return this.path && `${Vue.http.options.root}/info/${this.path}`
            },
            canSave() {
                return this.path && this.aTree && this.bTree && this.fragment && !this.saved
            },
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