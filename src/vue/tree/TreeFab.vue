<template>
    <v-menu offset-y>
        <v-btn class="elevation-3" fab bottom right color="primary" dark fixed slot="activator">
            <v-icon>add</v-icon>
        </v-btn>
        <v-list v-if="tree" class="font-weight-thin subheading">
            <v-list-tile @click="$emit('nav', IMPACTS)">
                <v-list-tile-title>Ajouter un impact environnemental...</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="$emit('nav', ROOTS)">
                <v-list-tile-title>Ajouter une ressource...</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="$emit('nav', FACETS)">
                <v-list-tile-title>Ajouter une propriété...</v-list-tile-title>
            </v-list-tile>
            <v-list-tile>
                <v-list-tile-title @click="">
                    <open-message :section="section">Message...</open-message>
                </v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="deleteTrunk(tree)" v-if="!deleteAsked">
                <v-list-tile-content>
                    <v-list-tile-title>Supprimer</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-avatar>
                    <v-icon large color="red">warning</v-icon>
                </v-list-tile-avatar>
            </v-list-tile>
        </v-list>
    </v-menu>

</template>

<script>
    import {mapActions, mapMutations} from 'vuex'
    import {Dial} from "../../const/dial"
    import On from "../../const/on"
    import Do from "../../const/do"
    import OpenMessage from "../common/OpenMessage"
    import {name} from "../../services/calculations"
    import {FACETS, IMPACTS, ROOTS} from "../../const/fragments"

    export default {
        name: "tree-fab",
        components: {OpenMessage},
        data: function () {
            return {
                Dial,
                deleteAsked: false,
                IMPACTS, FACETS, ROOTS
            }
        },
        props: ['tree'],
        computed: {
            section: function () {
                return {
                    title: `Message pour "${name(this.tree)}"`,
                    filter: {
                        type: 'trunk',
                        topicId: this.tree._id
                    }
                }
            }
        },
        methods: {
            name,
            ...mapMutations({
                closeTree: Do.CLOSE_TREE
            }),
            ...mapActions({
                showDialog: On.SHOW_DIALOG,
                dispatchDeleteTrunk: On.DELETE_TREE,
                goHome: On.GO_HOME,
                snack: On.SNACKBAR
            }),
            show(dialog) {
                this.showDialog({dialog, data: {tree: this.tree}})
            },
            deleteTrunk(tree) {
                this.dispatchDeleteTrunk(tree)
                    .then(this.closeTree)
                    .then(this.goHome)
                    .then(this.snack({text: "1 élement supprimé"}))
            }
        }
    }
</script>