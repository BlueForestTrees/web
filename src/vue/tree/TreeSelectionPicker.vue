<template>
    <span v-if="changeTree || !curTree">
        <v-card>
            <v-tabs :value="tab" @change="setTab" centered slider-color="primary">
                <v-tab href="#search">Recherche</v-tab>
                <v-tab href="#mines">Vos produits</v-tab>
                <v-tab href="#favoris">Favoris</v-tab>
            </v-tabs>
        </v-card>
        <search v-if="tab==='search'" @select="selectTree" class="mt-5"/>
        <my-product v-else-if="tab==='mines'" :user="user" @select="selectTree"/>
        <my-selects v-else-if="tab==='favoris'" :user="user" @select="selectTree"/>
    </span>
    <v-layout v-else align-center column>
        <div class="font-weight-medium pa-3">
            <v-icon color="green" class="mr-2">info</v-icon>
            Choisissez la quantité:
        </div>
        <card>
            <selection-picker class="pa-3" :tree="curTree" @change="selectionChange" @close="closeSelectionPicker"></selection-picker>
        </card>
    </v-layout>
</template>
<script>
    import On from "../../const/on"
    import {mapActions, mapState, mapMutations} from "vuex"
    import {name} from "../../services/calculations"
    import Card from "../common/Card"
    import SelectionPicker from "./SelectionPicker"
    import Do from "../../const/do"
    const Search = () => import(/* webpackChunkName: "MyBasket"*/ "../search/Search")
    const MyProduct = () => import(/* webpackChunkName: "MyProduct"*/ "../home/MyProduct")
    const MySelects = () => import(/* webpackChunkName: "MySelects"*/ "../home/MySelects")

    export default {
        name: "tree-selection-picker",
        components: {Search, MySelects, MyProduct, SelectionPicker, Card},
        props: ['tree'],
        data: () => ({selectedTree: null, changeTree: false}),
        methods: {
            name,
            ...mapActions({
                loadTreeFromSelection: On.LOAD_SELECTION,
                applySelection: On.APPLY_SELECTION
            }),
            ...mapMutations({setTab: Do.SET_NAV_TREE_PICKER_TAB}),
            async selectTree(item) {
                if (item.repeted) {
                    item = await this.loadTreeFromSelection({_id: item._id, fragments: []})
                }
                this.selectedTree = item
                this.changeTree = false
            },
            selectionChange({tree, selection}) {
                this.applySelection({tree, selection})
                this.$emit("select", this.curTree)
                this.changeTree = false
            },
            closeSelectionPicker() {
                this.changeTree = true
            }
        },
        computed: {
            curTree() {
                return this.selectedTree || this.tree
            },
            ...mapState({
                user: s => s.user,
                tab: s => s.nav.tree.picker.tab
            })
        }
    }
</script>