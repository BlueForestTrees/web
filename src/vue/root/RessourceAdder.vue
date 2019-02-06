<template>
    <v-container>
        <v-card>
            <subpage-title :title="title">
                <closer @close="$emit('close')"/>
            </subpage-title>
        </v-card>

        <v-card v-if="selection">
            <v-container>
                <v-layout column align-center>
                    <destination noqt :tree="effectiveTree"/>
                    <v-list-tile>
                        <v-icon x-large>call_merge</v-icon>
                    </v-list-tile>
                    <destination noqt :tree="effectiveRoot"/>
                </v-layout>
            </v-container>
            <v-layout>
                <v-spacer/>
                <v-btn dense @click="revert"><v-icon>swap_horiz</v-icon>inverser</v-btn>
                <v-btn :disabled="!selection" color="primary" @click="validate">Ok</v-btn>
            </v-layout>
        </v-card>

        <tree-selection-picker v-if="!selection" @select="select" :tree="selection"/>
        <add-entry-fab title="Créer un produit ou un service" :action="GO.CREATE_TREE"/>
    </v-container>
</template>

<script>
    import Closer from "../common/Closer"
    import {name} from "../../services/calculations"
    import QuantityPicker from "../common/QuantityPicker"
    import On from "../../const/on"
    import {mapActions, mapState, mapMutations} from "vuex"
    import {GO} from "../../const/go"
    import TreeSelectionPicker from "../tree/TreeSelectionPicker"
    import SubpageTitle from "../tree/SubpageTitle"
    import AddEntryFab from "../common/AddEntryFab"
    import {BRANCHES, ROOTS} from "../../const/fragments"
    import Do from "../../const/do"
    import Destination from "../common/Destination"

    export default {
        name: "ressource-adder",
        props: ['tree'],
        components: {Destination, AddEntryFab, SubpageTitle, TreeSelectionPicker, QuantityPicker, Closer},
        data: () => ({
            selection: null,
            GO
        }),
        computed: {
            ...mapState({scope: s => s.nav.tree.root.scope}),
            addingRoot() {
                return this.scope === ROOTS
            },
            title() {
                return this.addingRoot ? "Ajouter une ressource" : "Ajouter un usage"
            },
            effectiveTree() {
                return this.addingRoot ? this.tree : this.selection
            },
            effectiveRoot() {
                return this.addingRoot ? this.selection : this.tree
            }
        },
        methods: {
            name,
            revert() {
                this.setScope(this.scope === ROOTS ? BRANCHES : ROOTS)
            },
            ...mapActions({
                addToTree: On.ADD_ROOT,
                snack: On.SNACKBAR
            }),
            ...mapMutations({
                setScope: Do.SET_TREE_ROOT_SCOPE
            }),
            select(item) {
                this.selection = item
            },
            validate() {
                this.addToTree({tree: this.effectiveTree, root: this.effectiveRoot})
                    .then(() => {
                        this.$emit('close')
                        this.snack({text: `1 ${this.title} ajoutée`, color: "green"})
                    })
                    .catch(e => {
                        this.snack({text: e.message, color: "orange"})
                        console.error(e)
                    })
            }
        }
    }
</script>