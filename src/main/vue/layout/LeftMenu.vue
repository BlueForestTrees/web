<template>
    <v-navigation-drawer fixed app v-model="_drawer">
        <v-list dense>
            <v-list-tile @click="showDialog({dialog:Dial.FACET_ENTRY})">
                <v-list-tile-action>
                    <v-layout row>
                        <v-icon>add</v-icon>
                    </v-layout>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Créer une caractéristique</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="showDialog({dialog:Dial.IMPACT_ENTRY})">
                <v-list-tile-action>
                    <v-layout row>
                        <v-icon>add</v-icon>
                    </v-layout>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Créer un impact</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="showDialog({dialog:Dial.TRUNK})">
                <v-list-tile-action>
                    <v-layout row>
                        <v-icon>add</v-icon>
                    </v-layout>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Créer un arbre</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="closeTree" v-if="tree">
                <v-list-tile-action>
                    <v-layout row>
                        <v-icon>close</v-icon>
                    </v-layout>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Fermer</v-list-tile-title>
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
            <v-list-tile @click="">
                <v-list-tile-action>
                    <v-icon>settings</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Paramètres</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="">
                <v-list-tile-action>
                    <v-icon>chat_bubble</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Faire un commentaire</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    import Do from "../../const/do";
    import {mapMutations, mapState, mapActions} from "vuex";
    import {Dial} from "../../const/dial";
    import On from "../../const/on";

    export default {
        props: ['drawer'],
        computed: {
            _drawer: {
                get: function () {
                    return this.drawer;
                },
                set: function (value) {
                    this.$emit('update:drawer', value);
                }
            },
            ...mapState(['tree'])
        },
        methods: {
            ...mapMutations({
                closeTree: Do.CLOSE_TREE,
                showDialog: Do.SHOW_DIALOG
            }),
            action(name) {
                this[name]();
            },
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