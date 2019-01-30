<template>
    <v-card>
        <v-layout row>
            <div class="ma-3 display-1 font-weight-thin">{{title}}</div>
            <v-spacer></v-spacer>
            <scope-menu v-model="idx" :dense="$vuetify.breakpoint.xsOnly"/>
        </v-layout>

        <transition name="slide-fade" mode="out-in">
            <fragment-list v-if="idx === 0" :tree="tree" :selection="selection" :fragment="ROOTS" none="Pas encore d'informations sur les ingrédients" key="0"></fragment-list>
            <fragment-list v-else-if="idx === 1" :tree="tree" :selection="selection" :fragment="TANK" none="Pas encore d'informations sur les matières premières" key="1"></fragment-list>
            <!--<fragment-list v-else-if="idx === 2" :tree="tree" :selection="selection" :fragment="TANK" none="Pas encore d'informations sur les matières" key="1"></fragment-list>-->
            <fragment-list v-else-if="idx === 3" :tree="tree" :selection="selection" :fragment="BRANCHES" none="Pas encore d'informations sur les usages" key="1"></fragment-list>
        </transition>
        <open-message :section="section"/>

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
    import ScopeMenu from "../root/ScopeMenu"
    import FragmentList from "./FragmentList"
    import {BRANCHES, ROOTS, TANK} from "../../const/fragments"

    export default {
        name: "ressources-subpage",
        components: {
            FragmentList,
            ScopeMenu,
            Card,
            Maquette,
            OpenMessage,
            SelectableList,
        },
        props: {
            tree: Object, selection: Array, bilan: {type: Boolean, default: false}
        },
        mixins: [goTree],
        data: () => ({
            idx: 0, maquettes, maqIdx: 0,
            ROOTS, TANK, BRANCHES
        }),
        computed: {
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
                switch (this.idx) {
                    case 0:
                        return "Ingrédients"
                    case 1:
                        return "Matières premières"
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