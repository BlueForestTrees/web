<template>
    <main-dialog :dialog="Dial.ADD_IMPACT" title="Nouvel impact" ref="dialog"
                 @esc="close" @enter="validate" @focus="focus" :noaction="searching"
    >
        <v-card-text v-if="tree">
            <destination :tree="tree"/>
            <v-form v-model="valid" v-on:submit.prevent="" ref="form">

                <search-comp v-if="searching" :maxSelectionSize="1" :type="On.SEARCH_IMPACT_ENTRY">
                    <template slot-scope="{ s }">
                        <v-tooltip bottom>
                            <v-btn slot="activator" v-if="s.selectionCount" flat dense @click="validateSearch(s)">
                                <v-icon>done</v-icon>
                                Valider
                            </v-btn>
                            <span style="pointer-events: none">Valider</span>
                        </v-tooltip>
                        <v-spacer/>
                        <v-tooltip bottom>
                            <span slot="activator"><v-btn icon dense @click="closeSearch(s)"><v-icon>close</v-icon></v-btn></span>
                            <span style="pointer-events: none">Fermer</span>
                        </v-tooltip>
                    </template>
                </search-comp>

                <v-card v-else>
                    <v-card-title>
                        <v-icon large :style="{color: selectedItem.color,marginRight:'0.2em'}">lens</v-icon>
                        {{selectedItem.name}}
                        <v-spacer/>
                        <v-btn icon @click="cancelItem">
                            <v-icon color="grey darken-2">delete</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <unit-select v-model="unit" :grandeur="grandeur" :rules="[required]"/>
                        <v-text-field type="number" label="Quantité... (ex.: 10)" v-model="qt" :rules="[required, isNumber]"/>
                    </v-card-text>
                </v-card>
            </v-form>
        </v-card-text>
    </main-dialog>
</template>

<script>
    import {Dial} from "../../const/dial"
    import On from "../../const/on"
    import {mapActions, mapState} from "vuex"
    import MainDialog from "./MainDialog"
    import UnitGrid from "../common/UnitGrid"
    import {getGrandeur} from "unit-manip"
    import {bqtGToQtUnit, baseQt} from "unit-manip"
    import closable from "../mixin/Closable"
    import {isNumber, required} from "../../services/rules"
    import {find} from 'unit-manip'
    import Destination from "../common/Destination"
    import UnitSelect from "../common/UnitSelect"
    import SearchComp from "../SearchComp"
    import {createStringObjectId} from "../../services/calculations"

    export default {
        name: 'add-impact-dialog',
        mixins: [closable],
        components: {
            SearchComp,
            UnitSelect,
            Destination,
            UnitGrid,
            MainDialog
        },
        data() {
            return {
                Dial, On,
                searchAgain: false,
                selectedItem: null,
                qt: null,
                unit: null,
                grandeur: null,
                valid: false
            }
        },
        computed: {
            ...mapState({tree: state => state.dialogs[Dial.ADD_IMPACT].data.tree}),
            searching: function () {
                return this.searchAgain || !this.selectedItem
            },
        },
        methods: {
            ...mapActions({dispatchSearch: On.SEARCH_IMPACT_ENTRY, dispatchAddImpact: On.ADD_IMPACT}),
            validateSearch: function (s) {
                this.selectedItem = s.selection[0]
                this.searchAgain = false
                s.unselect()
            },
            closeSearch: function (s) {
                s.unselect()
            },
            cancelItem: function () {
                this.selectedItem = null
            },
            async validate() {
                this.$refs.form.validate()
                if (this.valid) {
                    const bqt = baseQt({qt: this.qt, unit: this.unit.shortname}) / this.tree.trunk.quantity.bqt
                    this.dispatchAddImpact({
                        _id: createStringObjectId(),
                        trunkId: this.tree._id,
                        impactId: this.selectedItem._id,
                        bqt
                    })
                    this.close()
                }
            },
            focus() {
                this.$refs.form.reset()
                this.selectedItem = null
            },
            required, isNumber
        },
        watch: {
            selectedItem(item) {
                if (item) {
                    this.grandeur = getGrandeur(item.g)
                } else {
                    this.qt = null
                    this.unit = null
                    this.grandeur = null
                }
            }
        }
    }
</script>