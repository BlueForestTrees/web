<template>
    <v-menu offset-y>
        <v-btn flat icon slot="activator" @click="unselect">
            <v-icon>more_horiz</v-icon>
        </v-btn>
        <v-list v-if="tree" class="font-weight-thin subheading">
            <v-list-tile @click="$emit('nav', 0)">
                <v-list-tile-avatar class="planet logo-petit"/>
                <v-list-tile-title>Ajouter un impact environnemental...</v-list-tile-title>
            </v-list-tile>
            <v-divider/>

            <v-divider/>
            <v-list-tile @click="$emit('nav', 2)">
                <v-list-tile-avatar class="facet logo-petit"/>
                <v-list-tile-title>Ajouter une propriété...</v-list-tile-title>
            </v-list-tile>
            <v-divider/>

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
                deleteTree: On.DELETE_OPENED_TREE,
                showDialog: On.SHOW_DIALOG,
                dispatchDeleteTrunk: On.DELETE_TREE,
                goHome: On.GO_HOME,
                snack: On.SNACKBAR
            }),
            show(dialog) {
                this.showDialog({dialog, data: {tree: this.tree}})
            }
        }
    }
</script>