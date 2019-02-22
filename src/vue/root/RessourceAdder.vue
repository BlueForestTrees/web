<template>
    <v-container>
        <v-card>
            <subpage-title :title="title">
                <closer slot="right" @close="$emit('close')"/>
            </subpage-title>
            <v-divider/>

            <tree-selection-picker v-if="!selection" @save="select" :value="selection"/>

            <order-picker v-else @revert="revert" @validate="validate" :up="up" :down="down"/>
        </v-card>

        <add-entry-fab title="Créer un produit ou un service" :route="GO.CREATE_TREE" :callback="On.NAV_PREVIOUS"/>

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
    import OrderPicker from "../common/OrderPicker"
    import TreePicker from "../tree/TreePicker"

    export default {
        name: "ressource-adder",
        props: ['tree'],
        components: {TreePicker, OrderPicker, Destination, AddEntryFab, SubpageTitle, TreeSelectionPicker, QuantityPicker, Closer},
        data: () => ({
            selection: null,
            GO, On
        }),
        computed: {
            ...mapState({scope: s => s.nav.tree.root.scope}),
            trunkRootOrder() {
                return this.scope === ROOTS
            },
            title() {
                return this.trunkRootOrder ? "Ajouter une ressource" : "Ajouter un usage"
            },
            up() {
                return this.trunkRootOrder ? this.tree : this.selection
            },
            down() {
                return this.trunkRootOrder ? this.selection : this.tree
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
                this.addToTree({tree: this.up, root: this.down})
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