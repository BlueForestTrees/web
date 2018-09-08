<template>
    <v-card>

        <v-container>

            <tree-head :tree="tree" @nav="dispatchGoTree(tree)" :style="{cursor: 'pointer'}"/>
            <tree-sub-head style="margin-left:3.6em" :tree="item" icon="call_merge" @nav="dispatchGoTree(item)" :style="{cursor: 'pointer'}"/>

    <v-expansion-panel popout v-model="panels">
                    <v-expansion-panel-content v-if="tree && item">
                        <subheader slot="header" title="Quantité"/>
                        <v-form v-if="!qtUpdating" v-model="validQtForm" v-on:submit.prevent="">
                            <v-card-text>
                                <v-text-field type="number" label="Quantité... (ex.: 10)" v-model="qt" autofocus v-on:keyup.enter="validateQuantity" :rules="[required, isNumber]"/>
                                <unit-select v-model="unit" :grandeur="grandeur" :rules="[required]"/>
                                <v-layout row>
                                    <v-spacer/>
                                    <v-btn icon flat>
                                        <v-icon color="primary" @click="validateQuantity">done</v-icon>
                                    </v-btn>
                                </v-layout>
                            </v-card-text>
                        </v-form>
                        <v-progress-circular v-else :size="50" color="primary" indeterminate></v-progress-circular>
                    </v-expansion-panel-content>

                    <v-expansion-panel-content v-if="tree && item && item.trunk.quantity.g === 'Mass'">
                        <subheader slot="header" title="Transport"/>
                            <v-toolbar v-if="anySelected" app dark class="elevation-0" color="primary">
                                <v-toolbar-items>
                                    <v-tooltip bottom>
                                        <v-btn slot="activator" v-if="oneSelected" flat @click="goTree(oneSelected)"><span
                                                class="hidden-xs-only">ouvrir</span>
                                            <v-icon>category</v-icon>
                                        </v-btn>
                                        <span style="pointer-events: none">Ouvrir</span>
                                    </v-tooltip>
                                    <v-tooltip bottom>
                                        <v-btn slot="activator" v-if="anySelected" flat @click="remove(anySelected)"><span
                                                class="hidden-xs-only">supprimer</span>
                                            <v-icon>delete</v-icon>
                                        </v-btn>
                                        <span style="pointer-events: none">Supprimer</span>
                                    </v-tooltip>
                                </v-toolbar-items>
                                <v-spacer/>
                                <v-toolbar-items>
                                    <v-tooltip bottom>
                                        <v-btn slot="activator" icon dense @click="unselect()">
                                            <v-icon>close</v-icon>
                                        </v-btn>
                                        <span style="pointer-events: none">Fermer</span>
                                    </v-tooltip>
                                </v-toolbar-items>
                            </v-toolbar>
                        <v-list-tile v-for="transport in tree.roots"  :key="transport._id" v-if="transport.relativeTo && transport.relativeTo._id===item._id"
                                     @click="toggleSelect(transport)" :style="{background: isSelected(transport) ? '#D8E9F5' : '', transition: 'background .2s ease'}">
                            <v-icon :style="'color: '+transport.trunk.color+';margin-right:0.2em'">lens</v-icon>
                            <span>{{(transport.relativeTo.bqt / 1000)+" km"}} {{transport.trunk.name}}</span>
                        </v-list-tile>
                        <v-card-text>
                        <v-divider/>
                        <v-layout column>
                            <template v-if="addingTransport">
                                <search-comp :filter="{g:'Tran'}" v-if="!transport" :maxSelectionSize="1">
                                    <template slot-scope="{ s }">
                                        <v-tooltip bottom v-if="s.oneSelected">
                                            <v-btn slot="activator" v-if="s.selectionCount" flat dense @click="transport = s.oneSelected"><v-icon>done</v-icon>Ajouter</v-btn>
                                            <span style="pointer-events: none">Ajouter ce transport</span>
                                        </v-tooltip>
                                        <v-spacer/>
                                        <v-tooltip bottom>
                                            <span slot="activator"><v-btn icon dense @click="cancelAddingTransport(s)"><v-icon>close</v-icon></v-btn></span>
                                            <span style="pointer-events: none">Fermer</span>
                                        </v-tooltip>
                                    </template>
                                </search-comp>
                                <template v-else>
                                    <v-card-title><v-icon large :style="{color: transport.trunk.color,marginRight:'0.2em'}">lens</v-icon>{{transport.trunk.name}}</v-card-title>
                                    <v-card-text>
                                        <v-form v-model="validTransportForm" v-on:submit.prevent="">
                                            <v-text-field type="number" label="Quantité... (ex.: 10)" autofocus v-model="transportQt" :rules="[required, isNumber]" v-on:keyup.enter="ajoutTransport"/>
                                            <unit-select v-model="transportUnit" :rules="[required]"/>
                                        </v-form>
                                    </v-card-text>
                                    <v-layout row>
                                        <v-spacer/>
                                        <v-btn icon flat><v-icon color="primary" @click="ajoutTransport">done</v-icon></v-btn>
                                    </v-layout>
                                </template>
                            </template>
                            <v-layout row v-if="!transport && !addingTransport"><v-spacer/><v-btn color="primary" @click="addingTransport = true">ajouter...</v-btn></v-layout>
                        </v-layout>
                        </v-card-text>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                </v-container>
    </v-card>

</template>

<script>

    import {mapActions} from "vuex"
    import On from "../../const/on"
    import TreeHead from "./TreeHead"
    import {qtUnit, qtUnitName} from "../../services/calculations"
    import {find} from "lodash"
    import {isNumber, required} from "../../services/rules"
    import UnitSelect from "../common/UnitSelect"
    import SearchComp from "../SearchComp"
    import selectable from "../mixin/Selectable"
    import TreeSubHead from "./TreeSubHead"
    import Subheader from "./Subheader"
    import {getGrandeur, unit} from 'unit-manip'
    import {unit as lookupUnit} from 'unit-manip'
    import {baseQt} from 'unit-manip'
    import {bqtGToQtUnit} from "unit-manip"

    export default {
        name: 'root',
        props: ['treeId', 'rootId'],
        mixins: [selectable],
        components: {Subheader, TreeSubHead, SearchComp, UnitSelect, TreeHead},
        data: function () {
            return {
                qtUpdating:false,
                panels: [],
                addingTransport: false,
                validQtForm: false,
                validTransportForm: false,
                tree: null,
                item: null,
                transport: null,
                qt: null,
                unit: null,
                transportQt: null,
                transportUnit: lookupUnit('km'),
                grandeur: null,
            }
        },
        computed: {
            newRootLink: function () {
                return {
                    _id: this.item._id,
                    name: this.item.trunk.name,
                    quantity: {qt: this.qt, unit: this.unit && this.unit.shortname}
                }
            }
        },
        methods: {
            ...mapActions({
                dispatchLoadTree: On.LOAD_OPEN_TREE,
                dispatchGoTree: On.GO_TREE,
                dispatchCreateRoot: On.UPDATE_ROOT,
                dispatchDeleteLink: On.DELETE_ROOT,
                dispatchAddTransport: On.ADD_TRANSPORT
            }),
            async validateQuantity() {
                if (this.validQtForm) {
                    this.qtUpdating = true
                    const bqt = baseQt({qt: this.qt, unit: this.unit.shortname}) / this.tree.trunk.quantity.bqt
                    if (bqt !== this.item.trunk.quantity.bqt) {
                        this.dispatchCreateRoot({
                            _id: this.item.linkId,
                            trunkId: this.tree._id,
                            rootId: this.item._id,
                            bqt
                        })
                            .then(() => {
                                this.qtUpdating = false
                                this.item.trunk.quantity.bqt = bqt
                            })
                    }else{
                        this.qtUpdating = false
                    }
                    this.panels = null
                }
            },
            cancelAddingTransport(sel) {
                sel.unselect()
                this.addingTransport = false
            },
            ajoutTransport() {
                if (this.transport && this.validTransportForm) {
                    this.transport.quantity = {qt: this.transportQt, unit: this.transportUnit.shortname}
                    this.dispatchAddTransport({tree: this.tree, item: this.item, transport: this.transport})
                    this.addingTransport = false
                    this.transport = null
                    this.transportQt = null
                }
            },
            remove(items) {
                for (let i = 0; i < items.length; i++) {
                    this.dispatchDeleteLink(items[i].linkId)
                }
                this.unselect()
            },
            goTree(tree) {
                this.dispatchGoTree(tree)
            },
            refresh: async function () {
                this.tree = await this.dispatchLoadTree({_id: this.treeId})
                await this.tree.promises.roots
                this.item = find(this.tree.roots, {_id: this.rootId})
            },
            qtUnitName, qtUnit, required, isNumber,
        },
        created: function () {
            this.refresh()
        },
        watch: {
            '$route'(to, from) {
                this.refresh()
            },
            item(item) {
                if (item) {
                    let bqtG = item.trunk.quantity
                    const qtUnit = bqtGToQtUnit(bqtG)
                    this.qt = qtUnit.qt
                    this.unit = unit(qtUnit.unit)
                    this.grandeur = getGrandeur(bqtG.g)
                } else {
                    this.qt = null
                    this.unit = null
                    this.grandeur = null
                }
            }
        }
    }
</script>