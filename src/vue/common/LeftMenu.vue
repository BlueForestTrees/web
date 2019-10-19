<template>
    <v-navigation-drawer temporary fixed v-model="nav.treeRubanVisible">

        <v-list dense>

            <v-list-tile @click="goto(GO.SEARCH)">
                <v-list-tile-avatar>
                    <v-icon color="primary">home</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>Accueil</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile @click="goto(GO.RECENT)">
                <v-list-tile-avatar>
                    <v-icon color="primary">schedule</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>Récent</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>


            <v-list-group>
                <template slot="activator">
                    <v-list-tile>
                        <v-list-tile-avatar>
                            <v-icon color="primary">add_box</v-icon>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>Créer...</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
                <v-list-tile @click="goto(GO.CREATE_TREE)">
                    <v-list-tile-avatar>
                        <icon iconClass="scope-tree logo-petit"/>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>Produit</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="goto(GO.CREATE_INFO)">
                    <v-list-tile-avatar>
                        <icon iconClass="voice logo-petit"/>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>Information</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="">
                    <v-list-tile-avatar>
                        <icon iconClass="game logo-petit"/>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>Jeu</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="">
                    <v-list-tile-avatar>
                        <icon iconClass="compare logo-petit"/>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>Comparaison</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="goto(GO.ADD_IMPACT_ENTRY)" v-if="isAdmin">
                    <v-list-tile-avatar>
                        <img src="/img/planet.svg" class="logo-petit"/>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>Impact</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="goto(GO.ADD_FACET_ENTRY)" v-if="isAdmin">
                    <v-list-tile-avatar>
                        <img src="/img/facet.svg" class="logo-petit"/>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>Propriété</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list-group>


        </v-list>

        <v-list style="position:absolute;bottom:0.2em;width:100%" dense>
            <v-menu>
                <v-layout ml-2 mb-2 row align-end slot="activator">
                    <v-list-tile-action><img src="/img/logo.svg" class="logo-big"/></v-list-tile-action>
                    BlueForest v{{version.web}}
                </v-layout>

                <v-list>
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
                    <v-list-tile @click="goto(On.GO_CHAT_BUG)">
                        <v-list-tile-action>
                            <v-icon color="primary">bug_report</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Reporter un bug</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-menu>
            <v-divider/>


            <v-divider/>
            <links-bar class="mt-2"/>

        </v-list>

    </v-navigation-drawer>
</template>

<script>
    import {mapActions, mapState, mapGetters, mapMutations} from "vuex"
    import {Dial} from "../../const/dial"
    import On from "../../const/on"
    import {secs} from "../../const/sections"
    import {GO} from "../../const/go"
    import Icon from "./icon"
    import LinksBar from "../home/LinksBar"
    import FiltersBar from "../search/FiltersBar"
    import Do from "../../const/do"

    export default {
        components: {FiltersBar, LinksBar, Icon},
        data: () => ({
            Dial, GO, secs
        }),
        computed: {
            ...mapState(['tree', 'nav', 'version']),
            ...mapGetters(['isAdmin']),
            onWall() {
                return this.$router.currentRoute.path === "/"
            }
        },
        methods: {
            switchColors() {
                this.nav.dark = !this.nav.dark
                localStorage.setItem("dark", this.nav.dark)
                this.$vuetify.theme.primary = this.nav.dark ? "1098F7" : "1565c0"
            },
            hide() {
                this.nav.treeRubanVisible = false
            },
            goto(route) {
                this.hide()
                this.got(route)
            },
            ...mapActions({
                got: On.GO_TO
            })
        },
    }
</script>