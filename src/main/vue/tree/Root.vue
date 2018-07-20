<template>
    <v-container fluid>
        <v-layout justify-center align-center column>
            <v-card style="width: 100%">


                <tree-head :tree="tree"/>


                <v-divider/>
                <v-list>
                    <v-list-tile v-if="item && item.trunk" @click="editQt = !editQt">
                        <v-icon :style="{color: item.trunk.color,marginRight:'0.2em'}">lens</v-icon>
                        {{qtUnitName(item.trunk)}}
                        <v-spacer/>
                    </v-list-tile>
                </v-list>
                <v-form v-model="validQtForm" v-on:submit.prevent="">
                    <v-card-text v-if="editQt">
                        <v-text-field type="number" label="Quantité... (ex.: 10)" v-model="qt" :rules="[required, isNumber]"/>
                        <unit-select v-model="unit" :grandeur="grandeur" :rules="[required]"/>
                        <v-layout row>
                            <v-spacer/>
                            <v-btn icon flat>
                                <v-icon color="green darken-1" @click="validateQuantity">done</v-icon>
                            </v-btn>
                        </v-layout>
                    </v-card-text>
                </v-form>

                <v-divider/>
                <v-list-tile v-for="transport in tree && tree.roots && tree.roots.items" v-if="transport.trunk.relativeTo && transport.trunk.relativeTo._id===item._id" :key="transport._id"
                             @click="toggleSelect(transport)" :style="{background: isSelected(transport) ? '#E8F5E9' : '', transition: 'background .2s ease'}">
                    <v-icon :style="'color: '+transport.trunk.color+';margin-right:0.2em'">lens</v-icon>
                    {{qtUnitName({qt:transport.trunk.relativeTo.disqt.qt,unit:transport.trunk.relativeTo.disqt.unit,name:transport.trunk.name})}}
                </v-list-tile>
                <transition name="slide-fade">
                    <v-toolbar v-if="anySelected" app dark class="elevation-0" color="green lighten-2">
                        <v-toolbar-items>
                            <v-tooltip bottom>
                                <v-btn slot="activator" v-if="oneSelected" flat @click="goTree(oneSelected)"><span class="hidden-xs-only">ouvrir</span><v-icon>launch</v-icon></v-btn>
                                <span style="pointer-events: none">Ouvrir</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                                <v-btn slot="activator" v-if="anySelected" flat @click="remove(anySelected)"><span class="hidden-xs-only">supprimer</span>
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
                </transition>

                <v-divider/>
                <v-card-title v-if="item && item.trunk">
                    <v-btn color="primary" v-if="!transport" block @click="addingTransport = !addingTransport">ajout transport</v-btn>
                    <template v-if="addingTransport">
                        <search-comp v-if="!transport" maxSelectionSize="1" type="TR">
                            <template slot-scope="{ s }">
                                <v-tooltip bottom v-if="s.oneSelected">
                                    <v-btn slot="activator" v-if="s.selectionCount" flat dense @click="transport = s.oneSelected">
                                        <v-icon>done</v-icon>
                                        Valider
                                    </v-btn>
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
                            <v-card-title>
                                <v-icon large :style="{color: transport.trunk.color,marginRight:'0.2em'}">lens</v-icon>{{transport.trunk.name}}
                            </v-card-title>
                            <v-card-text>
                                <v-form v-model="validTransportForm" v-on:submit.prevent="">
                                    <v-text-field type="number" label="Quantité... (ex.: 10)" autofocus v-model="transportQt" :rules="[required, isNumber]"/>
                                    <unit-select v-model="transportUnit" :rules="[required]"/>
                                </v-form>
                            </v-card-text>
                            <v-layout row>
                                <v-spacer/>
                                <v-btn icon flat>
                                    <v-icon color="green darken-1" @click="ajoutTransport">done</v-icon>
                                </v-btn>
                            </v-layout>
                        </template>
                    </template>
                </v-card-title>
            </v-card>
        </v-layout>
    </v-container>
</template>

<script>

    import {mapActions} from "vuex";
    import On from "../../const/on";
    import TreeHead from "./TreeHead";
    import {qtUnit, qtUnitName} from "../../services/calculations";
    import {find} from "lodash";
    import {getGrandeur, unit} from 'trees-units'
    import {isNumber, required} from "../../services/rules";
    import UnitSelect from "../common/UnitSelect";
    import SearchComp from "../SearchComp";
    import selectable from "../mixin/Selectable";
    import {unit as lookupUnit} from 'trees-units';


    export default {
        name: 'root',
        props: ['treeId', 'rootId'],
        mixins: [selectable],
        components: {SearchComp, UnitSelect, TreeHead},
        data: function () {
            return {
                editQt: false,
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
                return {_id: this.item._id, name: this.item.trunk.name, quantity: {qt: this.qt, unit: this.unit && this.unit.shortname}}
            }
        },
        methods: {
            ...mapActions({
                dispatchLoadTree: On.LOAD_OPEN_TREE,
                dispatchGoTree: On.GO_TREE,
                dispatchLink: On.LINK,
                dispatchDeleteLink: On.DELETE_LINK,
                dispatchRefreshRessources: On.LOAD_ROOTS,
                dispatchAddTransport: On.ADD_TRANSPORT
            }),
            async validateQuantity() {
                if (this.validQtForm) {
                    const rootQuantity = {qt: this.qt, unit: this.unit.shortname};
                    const hasChanges = qtUnit(rootQuantity) !== qtUnit(this.item.trunk.quantity);
                    if (hasChanges) {
                        await this.dispatchLink({
                            trunk: {_id: this.tree._id, quantity: this.tree.trunk.quantity},
                            root: {_id: this.item._id, quantity: rootQuantity}
                        });
                    }
                    this.editQt = false;
                }
            },
            cancelAddingTransport(sel) {
                sel.unselect();
                this.addingTransport = false;
            },
            ajoutTransport() {
                if (this.transport && this.validTransportForm) {
                    this.transport.quantity = {qt: this.transportQt, unit: this.transportUnit.shortname};
                    this.dispatchAddTransport({tree: this.tree, item: this.item, transport: this.transport});
                    this.addingTransport = false;
                    this.transport = null;
                    this.transportQt = null;
                }
            },
            remove(items) {
                for (let i = 0; i < items.length; i++) {
                    this.dispatchDeleteLink({left: this.tree, right: items[i]});
                }
                this.unselect();
            },
            goTree(tree) {
                this.dispatchGoTree(tree);
            },
            refresh: async function () {
                this.tree = await this.dispatchLoadTree({_id: this.treeId});
                this.item = find(this.tree.roots.items, {_id: this.rootId});
            },
            qtUnitName, qtUnit, required, isNumber,
        },
        created: function () {
            this.refresh();
        },
        watch: {
            '$route'(to, from) {
                this.refresh();
            },
            item(item) {
                if (item) {
                    this.qt = item.trunk.quantity.qt;
                    this.unit = unit(item.trunk.quantity.unit);
                    this.grandeur = getGrandeur(this.unit.grandeur);
                } else {
                    this.qt = null;
                    this.unit = null;
                    this.grandeur = null;
                }
            }
        }
    }
</script>