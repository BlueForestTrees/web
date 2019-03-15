<template>
    <span>
        <v-tabs :value="tab" @change="setTab" centered slider-color="primary">
            <v-tab v-if="!noCreate" href="#create">Nouveau</v-tab>
            <v-tab href="#search">Recherche</v-tab>
            <v-tab href="#favoris">Favoris</v-tab>
        </v-tabs>
        <v-divider/>
        <create-tree v-if="!noCreate && tab==='create'" @create="pickTree" no-title/>
        <search v-else-if="tab==='search'" @select="pickTree" class="mt-5"/>
        <favorites v-else-if="tab==='favoris'" :user="user" @select="pickSelection"/>
    </span>
</template>
<script>
    import Do from "../../const/do"
    import {mapMutations, mapState, mapActions} from "vuex"
    import On from "../../const/on"
    import {OWNER, TRUNK} from "../../const/fragments"

    const CreateTree = () => import(/* webpackChunkName: "CreateTree" */ './CreateTree')
    const Search = () => import(/* webpackChunkName: "Search"*/ "../search/Search")
    const Favorites = () => import(/* webpackChunkName: "Favorites"*/ "../home/Favorites")

    export default {
        name: 'tree-picker',
        props: {noCreate: {type: Boolean, default: false}},
        components: {CreateTree, Favorites, Search},
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