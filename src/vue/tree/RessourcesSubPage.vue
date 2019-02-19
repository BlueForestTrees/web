<template>
    <ressource-adder v-if="modeAdd" :tree="tree" @close="$emit('close')"/>
    <v-card v-else>
        <subpage-title :title="title" iconClass="scope-tree logo"/>

        <transition name="slide-fade" mode="out-in">
            <tree-nav v-if="idx === 0" :tree="tree" key="2"/>
            <fragment-list v-if="idx === 1" :tree="tree" :fragment="ROOTS" none="Pas encore d'informations sur les ressources" key="0"></fragment-list>
            <fragment-list v-else-if="idx === 2" :tree="tree" :fragment="TANK" none="Pas encore d'informations sur les matières premières" key="1"></fragment-list>
            <fragment-list v-else-if="idx === 3" :tree="tree" :fragment="BRANCHES" none="Pas encore d'informations sur les usages" key="4"></fragment-list>
        </transition>

        <v-divider/>
        <v-layout>
            <v-spacer/>
            <scope-menu :value="idx" @input="setIdx" :dense="$vuetify.breakpoint.xsOnly" :scope="rootScope"/>
            <open-message :section="section" no-text/>
        </v-layout>
    </v-card>
</template>

<script>
    import On from "../../const/on"
    import {mapActions, mapMutations, mapState} from 'vuex'
    import goTree from "../mixin/GoTree"
    import {getRandomColor, qtUnitName} from "../../services/calculations"
    import {bqtGToQtUnit} from "unit-manip"
    import OpenMessage from "../common/OpenMessage"
    import Card from "../common/Card"
    import ScopeMenu from "../root/ScopeMenu"
    import {BRANCHES, ROOTS, TANK} from "../../const/fragments"
    import Do from "../../const/do"
    import SubpageTitle from "./SubpageTitle"
    import {rootScope} from "../../const/img"
    import {name} from "../../services/calculations"

    const TreeNav = () => import(/* webpackChunkName: "RootsNav"*/"../root/TreeNav")
    const RessourceAdder = () => import(/* webpackChunkName: "RessourceAdder"*/"../root/RessourceAdder")
    const FragmentList = () => import(/* webpackChunkName: "FragmentList"*/"./FragmentList")

    export default {
        name: "ressources-subpage",
        components: {
            SubpageTitle,
            TreeNav,
            RessourceAdder,
            FragmentList,
            ScopeMenu,
            Card,
            OpenMessage
        },
        props: {
            modeAdd: Boolean,
            tree: Object, selection: Array, bilan: {type: Boolean, default: false}
        },
        mixins: [goTree],
        data: () => ({
            ROOTS, TANK, BRANCHES, rootScope
        }),
        computed: {
            ...mapState({
                idx: s => s.nav.tree.root.idx
            }),
            section: function () {
                return {
                    title: `Discussion sur les ressources de \"${name(this.tree)}\"`,
                    filter: {
                        type: 'trunk-root',
                        topicId: this.tree._id
                    }
                }
            },
            title() {
                switch (this.idx) {
                    case 0:
                        return "Fabrication"
                    case 1:
                        return "Ressources"
                    case 2:
                        return "Matières premières"
                    case 3:
                        return "Usages"
                }
            }
        },

        methods: {
            ...mapActions({
                dispatchGoRoot: On.GO_ROOT,
                deleteRoot: On.DELETE_ROOT,
                dispatchLoadRoots: On.LOAD_ROOTS,
                dispatchGoEquiv: On.GO_EQUIV
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
            qtUnitName, getRandomColor, bqtGToQtUnit
        }
    }
</script>