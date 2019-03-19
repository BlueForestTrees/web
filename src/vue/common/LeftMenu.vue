<template>
    <v-navigation-drawer app v-model="nav.leftMenuVisible">
        <v-list dense>

            <v-list-tile @click="goto(GO.SEARCH)">
                <v-list-tile-action>
                    <img src="/img/home.svg" class="logo" style="margin-left: -5px"/>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Accueil</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile @click="goto(GO.RECENT)">
                <v-list-tile-action>
                    <v-icon color="primary">schedule</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Vu récemment</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile @click="createTree">
                <v-list-tile-action>
                    <img src="/img/scopeTree.svg" class="logo-petit"/>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Nouveau produit</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="goCreateInfo">
                <v-list-tile-action>
                    <img src="/img/voice.svg" class="logo-petit"/>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Nouvelle information</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile @click="goto(GO.MESSAGE)">
                <v-list-tile-action>
                    <v-icon color="primary">chat</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Vos messages</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile @click="goto(GO.ADD_IMPACT_ENTRY)" v-if="isAdmin">
                <v-list-tile-action>
                    <v-icon color="primary">add_box</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Nouvel impact</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="goto(GO.ADD_FACET_ENTRY)" v-if="isAdmin">
                <v-list-tile-action>
                    <v-icon color="primary">add_box</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Nouvelle propriété</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

        </v-list>


        <v-list style="position:absolute;bottom:0em;width:100%" dense>
            <v-layout ml-2 mb-2 row align-end>
                <v-list-tile-action>
                    <img src="/img/logo.svg" class="logo-big"/>
                </v-list-tile-action>
                BlueForest v{{version.web}}
            </v-layout>
            <v-divider/>
            <v-list-tile @click="goto(GO.PLAN_INTRO)">
                <v-list-tile-action>
                    <v-icon color="primary">live_help</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Aide</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="switchColors">
                <v-list-tile-action>
                    <v-icon color="primary">invert_colors</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Mode {{nav.dark ? "clair" : "sombre"}}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="chatBug">
                <v-list-tile-action>
                    <v-icon color="primary">bug_report</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Reporter un bug</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    import {mapActions, mapState, mapGetters} from "vuex"
    import {Dial} from "../../const/dial"
    import On from "../../const/on"
    import {secs} from "../../const/sections"
    import {GO} from "../../const/go"
    import Icon from "./icon"

    export default {
        components: {Icon},
        data: () => ({
            Dial, GO, secs
        }),
        computed: {
            ...mapState(['tree', 'nav', 'version']),
            ...mapGetters(['isAdmin'])
        },
        methods: {
            switchColors() {
                this.nav.dark = !this.nav.dark
                localStorage.setItem("dark", this.nav.dark)
                this.$vuetify.theme.primary = this.nav.dark ? "1098F7" : "1565c0"
            },
            chatBug() {
                this.nav.leftMenuVisible = false
                this.goChatBug()
            },
            createTree() {
                this.goCreateTree()
            },
            ...mapActions({
                goto: On.GO_TO,
                showDialog: On.SHOW_DIALOG,
                goImpactEntry: On.GO_IMPACT_ENTRY,
                goFacetEntry: On.GO_FACET_ENTRY,
                goCreateTree: On.GO_CREATE_TREE,
                goCreateInfo: On.GO_CREATE_INFO,
                goChatBug: On.GO_CHAT_BUG
            })
        },
    }
</script>