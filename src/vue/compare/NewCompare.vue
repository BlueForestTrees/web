<template>
    <card v-if="$vuetify.breakpoint.xsOnly">
        <welcome-panel class="py-4"/>
        <subpage-title centered title="Ecran" icon="rotate_right"/>
        <subpage-title centered title="pas assez"/>
        <subpage-title centered title="large"/>
    </card>
    <card v-else>
        <subpage-title centered icon-color="white" icon-class="compare-white" title="Comparaison" titleClass="align-center" color="primary"/>

        <v-layout>
            <subpage-title centered :title="name(left, '????')" @click="goTree(left)"/>
            <subpage-title centered :title="name(right, '????')" @click="goTree(right)"/>
        </v-layout>
        <v-layout>
            <v-flex>
                <subpage-title @click="leftQtDialog = true" sub centered :title="qtUnit(left)" icon-class="carton logo"/>
            </v-flex>

            <v-layout column class="chars-width-1">
                <v-btn small>
                    <v-icon>arrow_back</v-icon>
                </v-btn>
                <v-btn small>
                    <v-icon>arrow_forward</v-icon>
                </v-btn>
            </v-layout>

            <v-flex>
                <subpage-title @click="rightQtDialog = true" sub centered :title="qtUnit(right)" icon-class="carton logo"/>
            </v-flex>


            <simple-dialog v-model="leftQtDialog" @close="leftQtDialog = false" no-name title="Modifier la quantité" icon="carton">
                <selection-picker :value="leftSelection" @pick="pickLeftSelection" @close="leftQtDialog = false" no-name/>
            </simple-dialog>
            <simple-dialog v-model="rightQtDialog" @close="rightQtDialog = false" no-name title="Modifier la quantité" icon="carton">
                <selection-picker :value="rightSelection" @pick="pickRightSelection" @close="rightQtDialog = false" no-name/>
            </simple-dialog>
        </v-layout>

        <v-expansion-panel :inset="$vuetify.breakpoint.mdAndUp" class="elevation-0" v-model="activePanelIdx">
            <v-expansion-panel-content>
                <v-layout row align-center slot="header">
                    <v-list-tile-avatar class="facet logo"/>
                    <v-toolbar-title class="font-weight-thin title">Propriétés</v-toolbar-title>
                </v-layout>
                <comparator :visible="activePanelIdx === 0" :left="left" :right="right" :fragment="FACETS"/>
            </v-expansion-panel-content>

            <v-expansion-panel-content>
                <v-layout row align-center slot="header">
                    <v-list-tile-avatar class="planet logo"/>
                    <v-toolbar-title class="font-weight-thin title">Environnement</v-toolbar-title>
                </v-layout>
                <comparator :visible="activePanelIdx === 1" :left="left" :right="right" :fragment="IMPACT_TANK"/>
            </v-expansion-panel-content>

            <v-expansion-panel-content>
                <v-layout row align-center slot="header">
                    <v-list-tile-avatar class="roots logo"/>
                    <v-toolbar-title class="font-weight-thin title">Fabrication</v-toolbar-title>
                </v-layout>
                <div>tank compare</div>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </card>
</template>

<script>
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import {TRUNK, FACETS, IMPACT_TANK} from "../../const/fragments"
    import {qtUnit, name, selectionFromTree, coefFromTrunkToSelection} from "../../services/calculations"
    import SubpageTitle from "../tree/SubpageTitle"
    import Card from "../common/Card"
    import SelectionPicker from "../tree/SelectionPicker"
    import Vue from "vue"

    const Comparator = () => import(/* webpackChunkName: "Comparator" */"./Comparator")
    const SimpleDialog = () => import(/* webpackChunkName: "SimpleDialog" */"../selection/SimpleDialog")
    const WelcomePanel = () => import(/* webpackChunkName: "WelcomePanel" */"../search/WelcomePanel")

    const fragments = [TRUNK]

    export default {
        name: "NewCompare",
        components: {Comparator, WelcomePanel, SimpleDialog, SelectionPicker, Card, SubpageTitle},
        props: ['leftId', 'rightId'],
        data: () => ({
            left: null,
            right: null,
            activePanelIdx: null,
            leftQtDialog: false,
            rightQtDialog: false,
            FACETS, IMPACT_TANK
        }),
        mounted() {
            this.loadLeft()
            this.loadRight()
        },
        watch: {
            leftId() {
                this.loadLeft()
            },
            rightId() {
                this.loadRight()
            }
        },
        methods: {
            loadLeft() {
                return this.loadTree(this.leftId)
                    .then(async tree => {
                        await tree.promises.all
                        this.left = tree
                    })
                    .catch(this.snackError)
            },
            loadRight() {
                return this.loadTree(this.rightId)
                    .then(async tree => {
                        await tree.promises.all
                        this.right = tree
                    })
                    .catch(this.snackError)
            },
            loadTree(_id) {
                return this.dispatchLoadTree({_id, fragments})
            },
            pickLeftSelection(selection) {
                Vue.set(this.left, 'coef', coefFromTrunkToSelection(selection, this.left))
                this.leftQtDialog = false
            },
            pickRightSelection(selection) {
                Vue.set(this.right, 'coef', coefFromTrunkToSelection(selection, this.right))
                this.rightQtDialog = false
            },
            ...mapActions({
                snackError: On.SNACKERROR,
                dispatchLoadTree: On.LOAD_TREE,
                goTree: On.GO_TREE
            }),
            qtUnit, name
        },
        computed: {
            leftSelection() {
                return this.left && (this.left.selection || selectionFromTree(this.left))
            },
            rightSelection() {
                return this.right && (this.right.selection || selectionFromTree(this.right))
            }
        }
    }
</script>