<template>
    <span>
        <v-tabs :value="tab" @change="setTab" centered slider-color="primary">
            <v-tab v-if="!noCreate" href="#create">Nouveau</v-tab>
            <v-tab href="#search">Recherche</v-tab>
            <v-tab href="#favoris">Favoris</v-tab>
        </v-tabs>
        <v-divider/>
        <create-tree v-if="!noCreate && tab==='create'" @create="pickTree" no-title/>
        <template v-else-if="tab==='search'">
            <filters-bar/>
            <filters-panel />
            <search-result-panel @select="pickTree"/>
        </template>
        <favorites v-else-if="tab==='favoris'" :user="user" @select="pickSelection"/>
    </span>
</template>
<script>
    import Do from "../../const/do"
    import {mapMutations, mapState, mapActions} from "vuex"
    import On from "../../const/on"
    import {OWNER, TRUNK} from "../../const/fragments"
    import SearchResultPanel from "../search/SearchResultPanel"
    import FiltersBar from "../search/FiltersBar"
    import FiltersPanel from "../search/FiltersPanel"

    const CreateTree = () => import(/* webpackChunkName: "CreateTree" */ './CreateTree')
    const Favorites = () => import(/* webpackChunkName: "Favorites"*/ "../home/Favorites")

    export default {
        name: 'tree-picker',
        props: {noCreate: {type: Boolean, default: false}},
        components: {FiltersPanel, FiltersBar, SearchResultPanel, CreateTree, Favorites},
        methods: {
            async pickSelection(selection) {
                const fragments = [TRUNK, OWNER]
                this.loadTreeFromSelection({selection, fragments})
                    .then(tree => tree.promises.all
                        .then(() => this.$emit('pick', tree))
                        .catch(this.snackError)
                    )
            },
            pickTree(tree) {
                this.$emit('pick', tree, this.tab)
            },
            ...mapActions({
                loadTreeFromSelection: On.LOAD_SELECTION_TREE,
                snackError: On.SNACKERROR
            }),
            ...mapMutations({
                setTab: Do.SET_NAV_TREE_PICKER_TAB
            })
        },
        computed: {
            ...mapState({
                user: s => s.user,
                tab: s => s.nav.tree.picker.tab
            })
        },
    }
</script>