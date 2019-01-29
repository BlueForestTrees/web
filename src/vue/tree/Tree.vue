<template>
    <div v-if="tree">
        <tree-headpage :tree="tree" :value="currentSubPage" @input="changeSubPage"/>

        <v-container style="min-height: 50em">

            <impacts-sub-page v-if="currentSubPage === IMPACTS" :tree="tree" :selection="selection" :modeAdd="modeAdd"/>

            <ressources-sub-page v-if="currentSubPage === ROOTS" :tree="tree" :selection="selection" :modeAdd="modeAdd"/>

            <facets-sub-page v-if="currentSubPage === FACETS" :tree="tree" :selection="selection" :modeAdd="modeAdd"/>

        </v-container>

        <tree-fab :tree="tree" @nav="fabnav"></tree-fab>
    </div>

</template>

<script>
    import {mapActions, mapState} from "vuex"
    import On from "../../const/on"
    import TreeFab from "./TreeFab"
    import {FACETS, IMPACTS, ROOTS, treeHeadFragments} from "../../const/fragments"
    import TreeHeadpage from "./TreeHeadPage"

    const RessourcesSubPage = () => import(/* webpackChunkName: "RessourcesSubPage" */ "./RessourcesSubPage")
    const FacetsSubPage = () => import(/* webpackChunkName: "FacetsSubPage" */ "./FacetsSubPage")
    const ImpactsSubPage = () => import(/* webpackChunkName: "ImpactsSubPage" */ "./ImpactsSubPage")

    export default {
        components: {
            TreeHeadpage,
            ImpactsSubPage,
            RessourcesSubPage,
            FacetsSubPage,
            TreeFab,
        },
        data: () => ({
            modeAdd: false,
            selection: [],
            currentSubPage: FACETS,
            IMPACTS, ROOTS, FACETS
        }),
        props: ['_id', 'bqt', 'sid'],
        computed: {
            ...mapState(['tree'])
        },
        methods: {
            ...mapActions({
                showDialog: On.SHOW_DIALOG,
                switchLeftMenu: On.SWITCH_LEFT_MENU,
                dispatchLoad: On.LOAD_OPEN_TREE,
                dispatchSelLoad: On.LOAD_SELECTION,
                snack: On.SNACKBAR,
                goSearch: On.GO_SEARCH,
                goBasket: On.GO_BASKET,
                goCreateTree: On.GO_CREATE_TREE,
            }),
            changeSubPage(idx) {
                this.modeAdd = false
                this.currentSubPage = idx
            },
            fabnav(idx) {
                this.currentSubPage = idx
                this.modeAdd = true
            },
            getTreeLoad() {
                if (this.bqt && this._id) {
                    return this.dispatchLoad({bqt: this.bqt, _id: this._id, fragments: treeHeadFragments})
                } else if (this.sid) {
                    return this.dispatchSelLoad({_id: this.sid, fragments: treeHeadFragments})
                } else {
                    console.warn(`bad params. bqt:${this.bqt}, _id:${this._id}, sid:${this.sid}`)
                }
            },
            refresh: async function () {
                const treeLoad = await this.getTreeLoad()
                if (treeLoad) {
                    const tree = await treeLoad
                    try {
                        await tree.promises.all
                    } catch (e) {
                        if (e.status === 404) {
                            this.snack({text: "L'élément n'a pas été trouvé :(", color: "orange"})
                        } else if (e.status === 400) {
                            this.snack({text: "L'url contient des éléments incorrects.", color: "orange"})
                        }
                    }
                }
            }
        },
        created: function () {
            this.refresh()
        },
        watch: {
            '$route'(to, from) {
                this.refresh()
            }
        },
    }
</script>