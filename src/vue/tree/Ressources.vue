<template>
    <v-card>
        <v-layout row>
            <v-container>
                <div class="display-1 font-weight-thin">{{title}}</div>
            </v-container>
            <v-spacer></v-spacer>
            <roots-menu v-model="window" :dense="$vuetify.breakpoint.xsOnly"/>
        </v-layout>

        <v-window v-model="window">
            <v-window-item>
                <selectable-list :items="items" :maxSelectionSize="1" :selection="selection">
                    <template slot="no-items">
                        <v-layout class="align-center justify-center my-5 font-weight-thin title"><img src="/img/broken-heart.svg" class="logo-petit ma-1"/>Pas encore d'informations sur les ressources</v-layout>
                    </template>
                </selectable-list>
                <open-message :section="section"/>
            </v-window-item>
            <v-window-item>
                <selectable-list :items="bilanItems" :maxSelectionSize="1" :selection="selection">
                    <template slot="no-items">
                        <v-layout class="align-center justify-center my-5 font-weight-thin title"><img src="/img/broken-heart.svg" class="logo-petit ma-1"/>Pas encore d'informations sur les ressources</v-layout>
                    </template>
                </selectable-list>
                <open-message :section="section"/>
            </v-window-item>
            <v-window-item>
                <maquette :maquette="[maquettes.ARBRE_RESSOURCE, maquettes.ARBRE_USAGE][maqIdx]">
                    <v-btn slot="corner" flat icon>
                        <v-icon color="blue" large @click="maqIdx ? maqIdx-- : maqIdx++">swap_vert</v-icon>
                    </v-btn>
                </maquette>
            </v-window-item>
            <v-window-item>
                <selectable-list :items="bilanItems" :maxSelectionSize="1" :selection="selection">
                    <template slot="no-items">
                        <v-layout class="align-center justify-center my-5 font-weight-thin title"><img src="/img/broken-heart.svg" class="logo-petit ma-1"/>Pas encore d'informations sur les ressources</v-layout>
                    </template>
                </selectable-list>
                <open-message :section="section"/>
            </v-window-item>
        </v-window>
    </v-card>
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
    import RootsMenu from "../root/RootsMenu"

    export default {
        components: {
            RootsMenu,
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
                    title: `Participer`,
                    filter: {
                        type: 'trunk-root',
                        topicId: this.tree._id
                    }
                }
            },
            title() {
                switch (this.window) {
                    case 0:
                        return "Ressources directes"
                    case 1:
                        return "Ressources premières"
                    case 2:
                        return "Ressources"
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