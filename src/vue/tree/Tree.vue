<template>
    <v-container v-if="tree && tree.trunk" id="top-page" style="min-height: 2000px">

        <v-layout column>

            <tree-headpage v-model="tabIdx" :tree="tree" class="mb-5" @close="goHome"/>

            <div id="sub-page" style="min-height: 600px">
                <transition name="slide-fade" mode="out-in">
                    <impacts-sub-page v-if="tabIdx === 0" :tree="tree" @close="close"/>
                    <ressources-sub-page v-else-if="tabIdx === 1" :tree="tree" @close="close"/>
                    <facets-sub-page v-else-if="tabIdx === 2" :tree="tree" @close="close"/>
                </transition>
            </div>

        </v-layout>

    </v-container>

</template>

<script>
    import {mapActions, mapState} from "vuex"
    import On from "../../const/on"
    import TreeFab from "./TreeFab"
    import {FACETS, IMPACTS, ROOTS, treeHeadFragments} from "../../const/fragments"
    import TreeHeadpage from "./TreeHeadPage"
    import {scrollSubPage, scrollTopPage} from "../../const/ux"

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
            tabIdx: null,
            IMPACTS, ROOTS, FACETS
        }),
        props: ['_id', 'bqt', 'sid'],
        created: function () {
            this.refresh()
        },
        computed: {
            ...mapState({
                tree: s => s.tree,
                modeAdd: s => s.nav.tree.modeAdd
            }),
        },
        watch: {
            '$route'(to, from) {
                this.refresh()
            },
            tabIdx(v, o) {
                if (v === null) {
                    scrollTopPage()
                } else {
                    scrollSubPage()
                }
            }
        },
        methods: {
            ...mapActions({
                dispatchLoad: On.LOAD_OPEN_TREE,
                dispatchSelLoad: On.LOAD_SELECTION,
                snack: On.SNACKBAR,
                goHome: On.GO_HOME
            }),
            close() {
                this.tabIdx = null
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
        }
    }
</script>