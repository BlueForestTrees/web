<template>
    <div>
        <v-card class="mb-5">
            <subpage-title title="Fabrication" iconClass="scope-tree logo">
                <closer slot="right" @close="$emit('close')"/>
            </subpage-title>

            <transition name="slide-fade" mode="out-in">
                <tree-nav2 v-if="idx === 0" :tree="tree" key="2" :note="`Carte des ressources et des usages ${deQtUnitName}`"/>
                <fragment-list v-if="idx === 1" :tree="tree" :fragment="ROOTS" none="Pas encore d'informations sur les ressources" key="0" :note="`Liste des dernières ressources ${deQtUnitName}`"/>
                <fragment-list v-else-if="idx === 2" :tree="tree" :fragment="TANK" none="Pas encore d'informations sur les matières premières" key="1" :note="`Liste des premières ressources ${deQtUnitName}`"/>
                <fragment-list v-else-if="idx === 3" :tree="tree" :fragment="BRANCHES" none="Pas encore d'informations sur les usages" key="4" :note="`Liste des usages possibles ${deQtUnitName}`"/>
            </transition>

            <v-divider/>
            <v-layout justify-center>
                <scope-menu :value="idx" @input="setIdx" dense :scope="rootScope"/>
                <open-message :section="section" no-text/>
                <btn icon-class="root-add logo logo" @click="setAdding(true)"></btn>
                <btn :enabled="oneSelected" icon-class="blueforest logo" @click="goTree(oneSelected)"></btn>
                <btn :enabled="oneSelected" icon-class="balance logo" @click="goEquiv({tree, oneSelected})"></btn>
                <btn :enabled="oneSelected" icon-class="game logo" @click="goQuiDeuxFoisPlus({tree, oneSelected})"></btn>
            </v-layout>
        </v-card>
        <div id="adder">
            <ressource-adder v-if="adding" :tree="oneSelected || tree" @close="setAdding(false)"/>
        </div>
    </div>
</template>

<script>
    import On from "../../const/on"
    import Do from "../../const/do"
    import {mapActions, mapMutations, mapState} from 'vuex'
    import ScopeMenu from "../root/ScopeMenu"
    import {BRANCHES, ROOTS, TANK} from "../../const/fragments"
    import SubpageTitle from "./SubpageTitle"
    import {rootScope} from "../../const/img"
    import {qtUnitName, de, name} from "../../services/calculations"
    import Closer from "../common/Closer"
    import {scrollSubPage, scrollTo} from "../../const/ux"
    import OpenMessage from "../common/OpenMessage"
    import Selectable from "../mixin/Selectable"
    import Btn from "../common/btn"

    const TreeNav = () => import(/* webpackChunkName: "TreeNav"*/"../root/TreeNav")
    const TreeNav2 = () => import(/* webpackChunkName: "TreeNav2"*/"../treenav/TreeNav2")
    const RessourceAdder = () => import(/* webpackChunkName: "RessourceAdder"*/"../root/RessourceAdder")
    const FragmentList = () => import(/* webpackChunkName: "FragmentList"*/"./FragmentList")

    export default {
        name: "ressources-subpage",
        mixins:[Selectable],
        components: {
            Btn,
            TreeNav2,
            OpenMessage,
            Closer,
            SubpageTitle,
            TreeNav,
            RessourceAdder,
            FragmentList,
            ScopeMenu,
        },
        props: {
            tree: Object
        },
        data: () => ({
            adding: false,
            ROOTS, TANK, BRANCHES, rootScope
        }),
        computed: {
            ...mapState({
                idx: s => s.nav.tree.root.idx
            }),
            deQtUnitName() {
                return de(qtUnitName(this.tree))
            },
            section: function () {
                return {
                    title: `Discussion sur les ressources de \"${name(this.tree)}\"`,
                    filter: {
                        type: 'trunk-root',
                        topicId: this.tree._id
                    }
                }
            }
        },

        methods: {
            de, qtUnitName, name,
            ...mapActions({
                goTree: On.GO_TREE,
                dispatchGoRoot: On.GO_ROOT,
                deleteRoot: On.DELETE_ROOT,
                dispatchLoadRoots: On.LOAD_ROOTS,
                dispatchGoEquiv: On.GO_EQUIV,
                goEquiv: On.GO_EQUIV,
                goQuiDeuxFoisPlus: On.GO_QUI_DEUX_FOIS_PLUS
            }),
            ...mapMutations({
                setIdx: Do.SET_TREE_ROOT_IDX
            }),
            goRoot: function (root) {
                this.dispatchGoRoot({treeId: this.tree._id, rootId: root._id})
                this.unselect()
            },
            remove(items) {
                for (let i = 0; i < items.length; i++) {
                    this.deleteRoot(items[i].linkId)
                }
                this.unselect()
            },
            goEquiv(root) {
                this.dispatchGoEquiv({
                    _id: this.tree._id,
                    bqt: this.tree.trunk.quantity.bqt,
                    s_id: root._id,
                    sbqt: root.trunk.quantity.bqt
                })
            },
            setAdding(adding) {
                this.adding = adding
                if (adding) {
                    this.$nextTick(() => scrollTo("#adder"))
                } else {
                    scrollSubPage()
                }
            }
        }
    }
</script>