<template>
    <div>

        <v-card class="ma-2">
            <subpage-title title="Fabrication" sub color="whitegrey">
                <open-message slot=right" :section="section" no-text/>
            </subpage-title>
            <v-layout justify-center>
                <scope-menu :value="idx" @input="setIdx" :scope="rootScope"/>
            </v-layout>

        </v-card>


        <v-card class="ma-2">
            <fragment-list v-if="idx === 0" :tree="tree" :fragment="ROOTS" :selectionKey="selectionKey" key="0" :note="`Les premières ressources`">
                <btn icon-class="root-add logo logo" @click="setAdding(true)"></btn>
            </fragment-list>
            <fragment-list v-else-if="idx === 1" :tree="tree" :fragment="TANK" :selectionKey="selectionKey" key="1" :note="`Les dernières ressources`"/>
            <fragment-list v-else-if="idx === 2" :tree="tree" :fragment="BRANCHES" :selectionKey="selectionKey" key="4" :note="`Les utilisations possibles`">
                <btn icon-class="branch-add logo logo" @click="setAdding(true, true)"></btn>
            </fragment-list>
        </v-card>

        <transition-expand>
            <v-card class="ma-2" v-if="adding">
                <v-card>
                    <subpage-title sub title="Ajouter une ressource" icon-class="root-add logo">
                        <closer slot="right" @close="setAdding(false)"/>
                    </subpage-title>
                    <ressource-adder :tree="oneSelected || tree" :reverted="reverted" @close="setAdding(false)"/>
                </v-card>
            </v-card>
        </transition-expand>

        <transition-expand>
            <v-card class="ma-2" v-if="oneSelected">
                <subpage-title title="Actions" sub color="whitegrey">
                </subpage-title>
                <v-layout justify-center>
                    <btn icon-class="balance logo" @click="goEquiv({tree, oneSelected})"></btn>
                    <btn icon-class="game logo" @click="goQuiDeuxFoisPlus({tree, oneSelected})"></btn>
                    <btn :enabled="idx !== 1" icon="delete" iconColor="grey"></btn>
                </v-layout>
                <note :text="qtUnitName(oneSelected)" />
            </v-card>
        </transition-expand>
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
    import OpenMessage from "../common/OpenMessage"
    import Selectable from "../mixin/Selectable"
    import Btn from "../common/btn"
    import TransitionExpand from "../common/TransitionExpand"
    import {rootbranch} from "../../const/selections"
    import Note from "../common/Note"

    const TreeNav2 = () => import(/* webpackChunkName: "TreeNav2"*/"../treenav/TreeMap")
    const RessourceAdder = () => import(/* webpackChunkName: "RessourceAdder"*/"../root/RessourceAdder")
    const FragmentList = () => import(/* webpackChunkName: "FragmentList"*/"./FragmentList")

    export default {
        name: "ressources-subpage",
        mixins: [Selectable],
        components: {
            Note,
            TransitionExpand,
            Btn,
            TreeNav2,
            OpenMessage,
            Closer,
            SubpageTitle,
            RessourceAdder,
            FragmentList,
            ScopeMenu,
        },
        props: {
            tree: Object
        },
        data: () => ({
            selectionKey:rootbranch,
            adding: false, reverted: false,
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
            setAdding(adding, reverted) {
                this.adding = adding
                this.reverted = reverted
            }
        }
    }
</script>