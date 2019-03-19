<template>

    <div v-if="tree && tree.trunk">

        <tree-map :tree="tree" :selection-key="selectionKey"/>

        <transition name="slide-left-right">
            <tree-ruban v-if="showTreeRuban" :tree="oneSelected" :tabIdx="tabIdx" @close="unselect"/>
        </transition>

        <transition name="slide-up-down">
            <tree-menu v-if="oneSelected" :value="tabIdx" @input="setTabidx" :tree="oneSelected" class="mt-5 top-left"/>
        </transition>
    </div>

</template>

<script>
    import {mapActions, mapState, mapMutations, mapGetters} from "vuex"
    import On from "../../const/on"
    import Do from "../../const/do"
    import TreeMap from "../treenav/TreeMap"
    import Selectable from "../mixin/Selectable"

    import {treeMap} from "../../const/selections"
    import {OWNER, TRUNK} from "../../const/fragments"

    const TreeRuban = () => import(/* webpackChunkName: "TreeRuban" */ "./TreeRuban")
    const TreeMenu = () => import(/* webpackChunkName: "TreeMenu" */ "./TreeMenu")


    export default {
        components: {
            TreeRuban,
            TreeMenu,
            TreeMap,
        },
        data: () => ({
            selectionKey: treeMap
        }),
        mixins: [Selectable],
        props: ['_id', 'bqt', 'sid'],
        created: function () {
            this.refresh()
        },
        computed: {
            ...mapGetters(['showTreeRuban']),
            ...mapState({
                tree: s => s.tree,
                tabIdx: s => s.nav.tree.tabIdx
            })
        },
        watch: {
            '$route'(to, from) {
                this.refresh()
            }
        },
        beforeRouteLeave(to, from, next) {
            this.unselect()
            next()
        },
        methods: {
            ...mapMutations({
                setTabidx: Do.SET_NAV_TREE_TAB_IDX
            }),
            ...mapActions({
                loadOpenTree: On.LOAD_OPEN_TREE,
                loadSelection: On.LOAD_SELECTION,
                snack: On.SNACKBAR,
                snackError: On.SNACKERROR,
                goTree: On.GO_TREE
            }),
            getTreeLoad() {
                const fragments = [TRUNK, OWNER]
                if (this.bqt && this._id) {
                    if (!this.tree || this.tree._id !== this._id
                        ||
                        !this.tree.trunk || this.tree.trunk.quantity.bqt !== this.bqt) {
                        return this.loadOpenTree({bqt: this.bqt, _id: this._id, fragments})
                    }
                } else if (this.sid) {
                    return this.loadSelection({_id: this.sid, fragments})
                } else {
                    console.warn(`bad params. bqt:${this.bqt}, _id:${this._id}, sid:${this.sid}`)
                }
            },
            refresh: async function () {
                const work = this.getTreeLoad()
                work && work.then(tree => tree.promises.all.catch(this.snackError))
            }
        }
    }
</script>