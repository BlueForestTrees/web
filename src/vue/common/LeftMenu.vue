<template>
    <v-navigation-drawer app v-model="nav.leftMenuVisible">
        <v-list dense>

            <v-list-tile @click="goto(GO.BASKET)">
                <v-list-tile-action>
                    <v-icon color="primary">select_all</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Mes produits</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile @click="goto(GO.MESSAGE)">
                <v-list-tile-action>
                    <v-icon color="primary">chat_bubble</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Mes messages</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>


            <v-list-group>

                <v-list-tile slot="activator">
                    <v-list-tile-action>
                        <v-icon color="primary">settings</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Paramètres</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click="goto(GO.ADD_IMPACT_ENTRY)">
                    <v-list-tile-action>
                        <v-icon color="primary">keyboard_tab</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Ajouter un type d'impact</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click="goto(GO.ADD_FACET_ENTRY)">
                    <v-list-tile-action>
                        <v-icon color="primary">keyboard_backspace</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Ajouter une propriété au catalogue</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click="goto(GO.TEAM)">
                    <v-list-tile-action>
                        <v-icon color="primary">flag</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Equipes
                            <v-icon color="orange" small>new_releases</v-icon>
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list-group>

            <v-list-tile @click="goCreateTree">
                <v-list-tile-action>
                    <v-icon color="primary">panorama_fish_eye</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Créer un produit ou un service</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="goCreatePub">
                <v-list-tile-action>
                    <v-icon color="primary">announcement</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Créer une Pub</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>


        </v-list>


        <v-list style="position:absolute;bottom:0em;width:100%" dense>
            <v-layout ml-2 mb-2 row align-end>
                <v-list-tile-action>
                    <img src="/img/logo.svg" style="height:4em"/>
                </v-list-tile-action>
                BlueForest v{{version.web}}
            </v-layout>
            <v-divider/>
            <v-list-tile @click="goto(GO.PLAN_INTRO)">
                <v-list-tile-action>
                    <v-icon color="primary">live_help</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>BlueForest, c'est quoi?</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="goto(GO.ROAD_MAP)">
                <v-list-tile-action>
                    <v-icon color="orange">new_releases</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Fonctions à venir</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="goto(GO.DATA_EXPLAINED)">
                <v-list-tile-action>
                    <v-icon color="primary">perm_data_settings</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>D'où viennnent les données?</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="showChat(secs.FEATURE)">
                <v-list-tile-action>
                    <v-icon color="primary">chat_bubble</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>{{secs.FEATURE.title}}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="showChat(secs.BUG)">
                <v-list-tile-action>
                    <v-icon color="primary">chat_bubble</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>{{secs.BUG.title}}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider/>
            <v-list-tile @click="switchColors">
                <v-list-tile-action>
                    <v-icon color="primary">invert_colors</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Mode {{nav.dark ? "clair" : "sombre"}}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    import {mapActions, mapState} from "vuex"
    import {Dial} from "../../const/dial"
    import On from "../../const/on"
    import {secs} from "../../const/sections"
    import {GO} from "../../const/go"

    export default {
        data: () => ({
            Dial, GO, secs
        }),
        computed: {
            ...mapState(['tree', 'nav', 'version'])
        },
        methods: {
            switchColors() {
                this.nav.dark = !this.nav.dark
                localStorage.setItem("dark", this.nav.dark)
                this.$vuetify.theme.primary = this.nav.dark ? "1098F7" : "1565c0"
            },
            showChat(section) {
                this.dispatchShowMessages(section)
            },
            ...mapActions({
                goto: On.GO_TO,
                showDialog: On.SHOW_DIALOG,
                dispatchDeleteTrunk: On.DELETE_TREE,
                goImpactEntry: On.GO_IMPACT_ENTRY,
                goFacetEntry: On.GO_FACET_ENTRY,
                goCreateTree: On.GO_CREATE_TREE,
                goCreatePub: On.GO_CREATE_PUB,
                dispatchShowMessages: On.SHOW_MESSAGES
            })
        },
    }
</script>