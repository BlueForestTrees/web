<template>
    <v-navigation-drawer fixed temporary v-model="nav.leftMenuVisible">
        <v-list dense>
            <v-list-tile @click="nav.leftMenuVisible = false;showErrorMessages()">
                <v-list-tile-action>
                    <v-icon color="primary">chat_bubble</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Signaler un bug</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="goCreateTree">
                <v-list-tile-action>
                    <v-icon color="primary">add</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Créer un produit ou un service</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-group>
                <v-list-tile slot="activator">
                    <v-list-tile-action>
                        <v-icon color="primary">build</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Configuration</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click="showDialog({dialog:Dial.FACET_ENTRY})">
                    <v-list-tile-action>
                        <v-layout row>
                            <v-icon color="primary">add</v-icon>
                        </v-layout>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Catalogue des propriété</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="goImpactEntry">
                    <v-list-tile-action>
                        <v-layout row>
                            <v-icon color="primary">add</v-icon>
                        </v-layout>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Catalogue des impacts</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="goBulkTrunk">
                    <v-list-tile-action>
                        <v-layout row>
                            <v-icon color="primary">vertical_align_top</v-icon>
                        </v-layout>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Imports</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list-group>

            <v-spacer/>
            <v-list-tile @click="deleteTrunk(tree)" v-if="tree">
                <v-list-tile-action>
                    <v-icon color="primary">delete</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Supprimer {{tree.name}}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>


        <v-list style="position:absolute;bottom:0em">

            <v-layout ml-2 row align-end>
                <v-list-tile-action>
                    <img src="/img/logo.svg" style="height:4em"/>
                </v-list-tile-action>
                BlueForest v{{version.web}}
            </v-layout>
        </v-list>

    </v-navigation-drawer>
</template>

<script>
    import Do from "../../const/do"
    import {mapActions, mapMutations, mapState} from "vuex"
    import {Dial} from "../../const/dial"
    import On from "../../const/on"
    import {secs} from "../../const/sections"

    export default {
        computed: {
            ...mapState(['tree', 'nav', 'version'])
        },
        methods: {
            deleteTrunk(tree) {
                this.dispatchDeleteTrunk(tree)
                    .then(() => this.nav.leftMenuVisible = false)
                    .then(this.closeTree)
                    .then(this.goHome)
            },
            ...mapMutations({
                closeTree: Do.CLOSE_TREE
            }),
            ...mapActions({
                showDialog: On.SHOW_DIALOG,
                dispatchDeleteTrunk: On.DELETE_TREE,
                goHome: On.GO_HOME,
                goImpactEntry: On.GO_IMPACT_ENTRY,
                goBulkTrunk: On.GO_BULK_TRUNK,
                goCreateTree: On.GO_CREATE_TREE,
                showErrorMessages: On.SHOW_BUGS_MESSAGES
            })
        },
        data: () => ({
            Dial,
            items: [
                {icon: 'settings', text: 'Paramètres'},
                {icon: 'chat_bubble', text: 'Faire un commentaire'},
                {icon: 'help', text: 'Help'}
            ]
        })
    }
</script>