<template>
    <v-menu offset-y>
        <v-btn class="elevation-3" fab bottom right color="primary" dark fixed slot="activator" @click="unselect">
            <v-icon>add</v-icon>
        </v-btn>
        <v-list v-if="tree" class="font-weight-thin subheading">
            <v-list-tile @click="goInfo">
                <v-list-tile-avatar class="megaphone logo"/>
                <v-list-tile-title>Utiliser dans un message...</v-list-tile-title>
            </v-list-tile>
            <v-divider/>
            <v-list-tile @click="$emit('nav', IMPACTS)">
                <v-list-tile-avatar class="planet logo-petit"/>
                <v-list-tile-title>Ajouter un impact environnemental...</v-list-tile-title>
            </v-list-tile>
            <v-divider/>
            <v-list-tile @click="$emit('nav', ROOTS)">
                <v-list-tile-avatar class="scope-tree logo-petit"/>
                <v-list-tile-title>Ajouter une ressource...</v-list-tile-title>
            </v-list-tile>
            <v-divider/>
            <v-list-tile @click="$emit('nav', FACETS)">
                <v-list-tile-avatar class="facet logo-petit"/>
                <v-list-tile-title>Ajouter une propriété...</v-list-tile-title>
            </v-list-tile>
            <v-divider/>
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
    import {mapActions, mapMutations, mapState} from 'vuex'
    import {Dial} from "../../const/dial"
    import On from "../../const/on"
    import Do from "../../const/do"
    import OpenMessage from "../common/OpenMessage"
    import {FACETS, IMPACTS, ROOTS} from "../../const/fragments"
    import Selectable from "../mixin/Selectable"

    export default {
        name: "tree-fab",
        components: {OpenMessage},
        mixins: [Selectable],
        data: function () {
            return {
                Dial,
                deleteAsked: false,
                IMPACTS, FACETS, ROOTS
            }
        },
        computed: {
            ...mapState({
                tree: s => s.tree
            })
        },
        methods: {
            ...mapMutations({
                closeTree: Do.CLOSE_TREE
            }),
            ...mapActions({
                showDialog: On.SHOW_DIALOG,
                dispatchDeleteTrunk: On.DELETE_TREE,
                goHome: On.GO_HOME,
                snack: On.SNACKBAR,
                goInfo: On.GO_CREATE_INFO
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