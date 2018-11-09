<template>
    <v-navigation-drawer app v-model="nav.leftMenuVisible">
        <v-list dense>
            <v-list-tile @click="goCreateTree">
                <v-list-tile-action>
                    <v-icon color="primary">panorama_fish_eye</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Créer un produit ou un service</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile @click="show(Dial.ADD_IMPACT_ENTRY)">
                <v-list-tile-action>
                    <v-icon color="primary">keyboard_tab</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Ajouter un type d'impact</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile @click="show(Dial.FACET_ENTRY)">
                <v-list-tile-action>
                    <v-icon color="primary">keyboard_backspace</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Ajouter une propriété au catalogue</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

        </v-list>


        <v-list style="position:absolute;bottom:0em;width:100%">
            <v-layout ml-2 mb-2 row align-end>
                <v-list-tile-action>
                    <img src="/img/logo.svg" style="height:4em"/>
                </v-list-tile-action>
                BlueForest v{{version.web}}
            </v-layout>
            <v-divider/>
            <v-list-tile @click="showBugMessages()">
                <v-list-tile-action>
                    <v-icon color="primary">chat_bubble</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Signaler un bug</v-list-tile-title>
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
        data() {
            return {
                Dial
            }
        },
        computed: {
            ...mapState(['tree', 'nav', 'version'])
        },
        methods: {
            show(dialog){
                this.showDialog({dialog})
            },
            switchColors() {
                this.nav.dark = !this.nav.dark
                localStorage.setItem("dark", this.nav.dark)
                this.$vuetify.theme.primary = this.nav.dark ? "1098F7" : "1565c0"
            },
            showBugMessages() {
                this.dispatchShowMessages(secs.BUG)
            },
            ...mapActions({
                showDialog: On.SHOW_DIALOG,
                dispatchDeleteTrunk: On.DELETE_TREE,
                goImpactEntry: On.GO_IMPACT_ENTRY,
                goFacetEntry: On.GO_FACET_ENTRY,
                goCreateTree: On.GO_CREATE_TREE,
                dispatchShowMessages: On.SHOW_MESSAGES
            })
        },
        data: () => ({
            Dial, GO,
            items: [
                {icon: 'settings', text: 'Paramètres'},
                {icon: 'chat_bubble', text: 'Faire un commentaire'},
                {icon: 'help', text: 'Help'}
            ]
        })
    }
</script>