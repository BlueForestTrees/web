<template>
    <selectable-list :items="items" :maxSelectionSize="1" :selection="selection">
        <template slot="bar" slot-scope="{ s }">
            <v-toolbar-items>
                <v-tooltip bottom>
                    <v-btn slot="activator" flat dense @click="goEquiv(s.oneSelected)">Equivalence<v-icon>arrow_right_alt</v-icon><v-icon>search</v-icon></v-btn>
                    <span style="pointer-events: none">Trouver des équivalences</span>
                </v-tooltip>
            </v-toolbar-items>
            <v-spacer/>
            <v-toolbar-items>
                <v-tooltip bottom>
                    <v-btn slot="activator" icon dense @click="s.unselect()"><v-icon>close</v-icon></v-btn>
                    <span style="pointer-events: none">Fermer</span>
                </v-tooltip>
            </v-toolbar-items>
        </template>
        <h5 slot="no-items">Ce produit ne contient pas encore d'impacts sur l'environnement.</h5>
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

    export default {
        components: {
            SelectableList,
        },
        props: ['tree', 'selection'],
        mixins: [goTree],
        computed: {
            items: function () {
                return this.tree && this.tree.roots
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