<template>
    <v-container v-if="tree && tree.trunk" fluid>

        <v-layout :column="$vuetify.breakpoint.smAndDown" >

            <tree-headpage :tree="tree" :value="currentSubPage" @input="changeSubPage" @nav="fabnav" :class="$vuetify.breakpoint.smAndDown ? 'mb-5':'mr-5'"/>

            <v-flex grow>
                <transition name="slide-fade" mode="out-in">

                    <impacts-sub-page v-if="currentSubPage === 0" :tree="tree" :modeAdd="modeAdd" @close="unsetModeAdd"/>

                    <ressources-sub-page v-else-if="currentSubPage === 1" :tree="tree" :modeAdd="modeAdd" @close="unsetModeAdd"/>

                    <facets-sub-page v-else-if="currentSubPage === 2" :tree="tree" :modeAdd="modeAdd" @close="unsetModeAdd"/>

                </transition>
            </v-flex>

        </v-layout>

    </v-container>

</template>

<script>
    import {mapActions, mapState, mapMutations} from "vuex"
    import On from "../../const/on"
    import TreeFab from "./TreeFab"
    import {FACETS, IMPACTS, ROOTS, treeHeadFragments} from "../../const/fragments"
    import TreeHeadpage from "./TreeHeadPage"
    import Do from "../../const/do"

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
            selection: [],
            IMPACTS, ROOTS, FACETS
        }),
        props: ['_id', 'bqt', 'sid'],
        computed: {
            ...mapState({
                tree: s => s.tree,
                currentSubPage: s => s.nav.tree.currentSubPage,
                modeAdd: s => s.nav.tree.modeAdd
            }),
        },
        methods: {
            ...mapMutations({
                setCurrentSubpage: Do.SET_CURRENT_TREE_SUBPAGE,
                setModeAdd: Do.SET_TREE_MODEADD
            }),
            unsetModeAdd() {
                this.setModeAdd(false)
            },
            ...mapActions({
                dispatchLoad: On.LOAD_OPEN_TREE,
                dispatchSelLoad: On.LOAD_SELECTION,
                snack: On.SNACKBAR
            }),
            changeSubPage(name) {
                this.setModeAdd(false)
                this.setCurrentSubpage(name)
            },
            fabnav(name) {
                this.setCurrentSubpage(name)
                this.setModeAdd(true)
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