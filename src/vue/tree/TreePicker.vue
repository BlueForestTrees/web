<template>
    <span>
        <v-tabs :value="tab" @change="setTab" centered slider-color="primary">
            <v-tab href="#search">Recherche</v-tab>
            <v-tab href="#favoris">Favoris</v-tab>
        </v-tabs>
        <v-divider/>
        <search v-if="tab==='search'" @select="pickTree" class="mt-5"/>
        <my-selects v-else-if="tab==='favoris'" :user="user" @select="pickSelection"/>
    </span>
</template>
<script>
    import Do from "../../const/do"
    import {mapMutations, mapState, mapActions} from "vuex"
    import On from "../../const/on"
    import {TRUNK} from "../../const/fragments"

    const Search = () => import(/* webpackChunkName: "MyBasket"*/ "../search/Search")
    const MySelects = () => import(/* webpackChunkName: "MySelects"*/ "../home/MySelects")

    export default {
        name: 'tree-picker',
        components: {MySelects, Search},
        methods: {
            pickSelection(selection) {
                const tree = this.loadTreeFromSelection({selection, fragments: [TRUNK]})
                this.$emit('pick', tree)
            },
            pickTree(tree) {
                this.$emit('pick', tree)
            },
            ...mapActions({
                loadTreeFromSelection: On.LOAD_SELECTION_TREE
            }),
            ...mapMutations({
                setTab: Do.SET_NAV_TREE_PICKER_TAB
            }),
        },
        computed: {
            ...mapState({
                user: s => s.user,
                tab: s => s.nav.tree.picker.tab
            })
        },
    }
</script>