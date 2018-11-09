<template>
    <selectable-list :items="items" :selection="selection">
        <open-message class="mt-5" slot="no-items" :section="section"/>
    </selectable-list>
</template>

<script>
    import On from "../../const/on"
    import {mapActions} from 'vuex'
    import QtUnit from "../common/QtUnit"
    import selectable from "../mixin/Selectable"
    import goTree from "../mixin/GoTree"
    import {getRandomColor, qtUnitName} from "../../services/calculations"
    import Subheader from "./Subheader"
    import {bqtGToQtUnit} from "unit-manip"
    import TransDeco from "./TransDeco"
    import SelectableList from "../common/SelectableList"
    import OpenMessage from "../common/OpenMessage"

    export default {
        components: {
            OpenMessage,
            SelectableList,
        },
        props: ['tree', 'selection'],
        mixins: [goTree],
        computed: {
            items: function () {
                return this.tree && this.tree.roots
            },
            section: function () {
                return {
                    title: `On ne sait pas encore ce qui entre dans la composition de ce produit. Indiquez que vous aimeriez le savoir.`,
                    filter: {
                        type: 'trunk-root',
                        topicId: this.tree._id
                    }
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