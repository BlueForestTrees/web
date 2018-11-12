<template>
    <v-menu offset-y>
        <v-btn class="elevation-3" fab bottom right color="primary" dark fixed slot="activator">
            <v-icon>add</v-icon>
        </v-btn>
        <v-list v-if="tree">
            <v-list-tile>
                <open-message :section="section"/>
            </v-list-tile>
            <v-list-tile @click="deleteTrunk(tree)" v-if="!deleteAsked">
                <v-list-tile-content>
                    <v-list-tile-title>Supprimer</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-avatar>
                    <v-icon large color="red">warning</v-icon>
                    <v-icon large color="red">delete</v-icon>
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

    export default {
        name: "tree-fab",
        components: {OpenMessage},
        data: function () {
            return {
                Dial,
                deleteAsked: false
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
                    .then(this.snack({text: "1 élement supprimé a été supprimé définitivement"}))
            }
        }
    }
</script>