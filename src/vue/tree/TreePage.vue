<template>
    <div>

        <tree-map :tree="tree" :selection-key="selectionKey"/>

        <v-navigation-drawer :value="!!oneSelected" @input="v => !v && unselect()" fixed app :width="`${this.width}px`">
            <tree-ruban :tree="oneSelected" @close="unselect"/>
        </v-navigation-drawer>

    </div>
</template>

<script>
    import {mapActions, mapState, mapGetters} from "vuex"
    import On from "../../const/on"
    import TreeMap from "../treenav/TreeMap"
    import Selectable from "../mixin/Selectable"

    import {treeMap} from "../../const/selections"
    import {OWNER, TRUNK} from "../../const/fragments"

    const TreeRuban = () => import(/* webpackChunkName: "TreeRuban" */ "./TreeRuban")


    export default {
        components: {
            TreeRuban,
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
            ...mapState({tree: s => s.tree}),
            width() {
                return this.$vuetify.breakpoint.xs ? 340 : 450
            },
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