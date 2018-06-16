<template>
    <v-navigation-drawer fixed app v-model="nav.leftMenuVisible">
        <v-list dense>
            <v-list-tile @click="showDialog({dialog:Dial.FEEDBACK})">
                <v-list-tile-action>
                    <v-icon>chat_bubble</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Faire un commentaire</v-list-tile-title>
                </v-list-tile-content>
                <feedback-dialog/>
            </v-list-tile>
            <v-list-tile @click="showDialog({dialog:Dial.FACET_ENTRY})">
                <v-list-tile-action>
                    <v-layout row>
                        <v-icon>add</v-icon>
                    </v-layout>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Créer une propriété</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="showDialog({dialog:Dial.ADD_IMPACT_ENTRY})">
                <v-list-tile-action>
                    <v-layout row>
                        <v-icon>add</v-icon>
                    </v-layout>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Créer un impact</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="cloneOpenTree(tree)" v-if="tree">
                <v-list-tile-action>
                    <v-icon>toll</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Cloner {{tree.name}}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="deleteTrunk(tree)" v-if="tree">
                <v-list-tile-action>
                    <v-icon>deletep</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Supprimer {{tree.name}}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    import Do from "../../const/do";
    import {mapActions, mapMutations, mapState} from "vuex";
    import {Dial} from "../../const/dial";
    import On from "../../const/on";
    import FeedbackDialog from "../dialog/FeeedbackDialog";

    export default {
        components: {FeedbackDialog},
        computed: {
            ...mapState(['tree', 'nav'])
        },
        methods: {
            ...mapMutations({
                showDialog: Do.SHOW_DIALOG
            }),
            ...mapActions({
                "deleteTrunk": On.DELETE_TREE,
                'cloneOpenTree': On.CLONE_OPEN_TREE
            })
        },
        data: () => ({
            Dial: Dial,
            items: [
                {icon: 'settings', text: 'Paramètres'},
                {icon: 'chat_bubble', text: 'Faire un commentaire'},
                {icon: 'help', text: 'Help'}
            ]
        })
    }
</script>