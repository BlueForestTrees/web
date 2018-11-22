<template>
    <span>
        <v-item-group v-model="window" class="mt-4" mandatory tag="v-flex">
            <v-layout row justify-center>
                <v-item key="bb">
                    <div slot-scope="{ active, toggle }">
                        <v-btn :input-value="active" icon @click="toggle">
                            <v-icon color="primary">fiber_manual_record</v-icon>
                        </v-btn>
                    </div>
                </v-item>
                <v-item key="bc">
                    <div slot-scope="{ active, toggle }">
                        <v-btn :input-value="active" icon @click="toggle">
                            <v-icon color="primary">fiber_manual_record</v-icon>
                        </v-btn>
                    </div>
                </v-item>
                <v-item key="bf">
                    <div slot-scope="{ active, toggle }">
                        <v-btn :input-value="active" icon @click="toggle">
                            <v-icon color="primary">fiber_manual_record</v-icon>
                        </v-btn>
                    </div>
                </v-item>
            </v-layout>
        </v-item-group>
        <card>
            <v-window v-model="window">
                <v-window-item>
                    <selectable-list :items="items" :selection="selection">
                        <open-message slot="no-items" :section="section" class="mt-5"/>
                    </selectable-list>
                </v-window-item>
                <v-window-item>
                    <maquette :maquette="[maquettes.ARBRE_RESSOURCE, maquettes.ARBRE_USAGE][maqIdx]">
                        <v-btn slot="corner" flat icon><v-icon color="blue" large @click="maqIdx ? maqIdx-- : maqIdx++">swap_vert</v-icon></v-btn>
                    </maquette>
                </v-window-item>
                <v-window-item>
                    <selectable-list :items="bilanItems" :selection="selection">
                        <open-message slot="no-items" :section="section" class="mt-5"/>
                    </selectable-list>
                </v-window-item>
            </v-window>
        </card>
    </span>
</template>

<script>
    import On from "../../const/on"
    import {mapActions} from 'vuex'
    import goTree from "../mixin/GoTree"
    import {getRandomColor, qtUnitName} from "../../services/calculations"
    import {bqtGToQtUnit} from "unit-manip"
    import SelectableList from "../common/SelectableList"
    import OpenMessage from "../common/OpenMessage"
    import Maquette from "../maquette/Maquette"
    import Card from "../common/Card"
    import maquettes from "../../const/maquettes"

    export default {
        components: {
            Card,
            Maquette,
            OpenMessage,
            SelectableList,
        },
        props: {
            tree: Object, selection: Array, bilan: {type: Boolean, default: false}
        },
        mixins: [goTree],
        data: () => ({window: null, maquettes, maqIdx: 0}),
        computed: {
            items() {
                return this.tree && this.tree.roots
            },
            bilanItems() {
                return this.tree && this.tree.tank
            },
            section: function () {
                return {
                    title: `Il n'y a pas d'informations sur les ressources.`,
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