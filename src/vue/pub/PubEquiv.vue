<template>
    <v-container>

        <v-layout :column="$vuetify.breakpoint.xsOnly" align-center class="my-5">
            <span class="font-weight-thin text-no-wrap display-1 ma-2">Préférer:</span>
            <v-card class="mx-3 rounded">
                <v-container>
                    <tree-card :tree="leftTree"></tree-card>
                </v-container>
                <div class="ma-2">Soit {{qtUnitName(leftAttribute)}}</div>
            </v-card>
            <span class="font-weight-thin text-no-wrap display-1 ma-2">Plutôt que:</span>
            <v-card class="mx-3 rounded">
                <v-container>
                    <tree-card :tree="rightTree"></tree-card>
                </v-container>
                <div class="ma-2">Soit {{qtUnitName(rightAttribute)}}</div>
            </v-card>
        </v-layout>

        <v-layout :column="$vuetify.breakpoint.xsOnly" align-center>
            <span class="font-weight-thin display-1  ma-2">C'est {{verb}} l'équivalent de :</span>
            <v-card class="mx-3 rounded">
                <v-container>
                    <tree-card :tree="equivTree"></tree-card>
                </v-container>
                <div class="ma-2">Soit {{qtUnitName(etalonAttribute)}}</div>
            </v-card>
        </v-layout>


    </v-container>
</template>

<script>
    import {filter} from "unit-manip"
    import Loader from "../loader/Loader"
    import On from "../../const/on"
    import states from "../../const/states"
    import {mapActions} from "vuex"
    import TreeCardFront from "../tree/TreeCardFront"
    import Card from "../common/Card"
    import * as fragments from "../../const/fragments"
    import {getAttribute, qtUnitName} from "../../services/calculations"
    import TreeCard from "../tree/TreeCard"

    export default {
        name: "pub-equiv",
        components: {TreeCard, Card, TreeCardFront, Loader},
        data: () => ({
            LOADING: states.LOADING,
            leftTree: null, rightTree: null, equivTree: null,
            fragment: null
        }),
        props: ['_id'],
        watch: {
            '$route'(to, from) {
                this.refresh()
            },
            coef(v) {
                if (v && v !== 1) {
                    this.applyCoef({tree: this.equivTree, coef: Math.abs(v)})
                }
            }
        },
        computed: {
            leftAttribute() {
                return this.leftTree && this.fragment && this.getAttribute(this.leftTree, this.fragment)
            },
            rightAttribute() {
                return this.rightTree && this.fragment && this.getAttribute(this.rightTree, this.fragment)
            },
            etalonAttribute() {
                return this.equivTree && this.fragment && this.getAttribute(this.equivTree, this.fragment)
            },
            deltaAttribute() {
                if (this.leftAttribute && this.rightAttribute) {
                    const deltaBqt = this.rightAttribute.quantity.bqt - this.leftAttribute.quantity.bqt
                    const delta = JSON.parse(JSON.stringify(this.rightAttribute))
                    delta.quantity.bqt = deltaBqt
                    return delta
                }
            },
            coef() {
                if (this.deltaAttribute && this.etalonAttribute) {
                    return this.deltaAttribute.quantity.bqt / this.etalonAttribute.quantity.bqt
                }
            },
            verb() {
                return this.coef && this.coef > 0 ? "éviter" : "créer"
            }
        },
        methods: {
            qtUnitName, getAttribute,
            ...mapActions({
                loadTree: On.LOAD_TREE,
                snack: On.SNACKBAR,
                applyCoef: On.APPLY_QUANTITY_COEF
            }),
            refresh: async function () {

                // this.updateFragment()
                //
                // this.leftTree = await this.loadTree({_id: this.leftId, fragments: ["trunk", this.fragment.type]})
                // this.rightTree = await this.loadTree({_id: this.rightId, fragments: ["trunk", this.fragment.type]})
                // this.equivTree = await this.loadTree({_id: this.equivId, fragments: ["trunk", this.fragment.type]})
                //
                // await this.leftTree.promises.all
                // await this.rightTree.promises.all
                // await this.equivTree.promises.all


            },
            updateFragment() {
                this.fragment = this.$route.query.iid ?
                    {type: fragments.IMPACT_TANK, _id: this.$route.query.iid}
                    :
                    this.$route.query.fid ?
                        {type: fragments.FACETS, _id: this.$route.query.fid}
                        :
                        this.$route.query.tid ?
                            {type: fragments.TANK, _id: this.$route.query.tid}
                            : null
            }
        },
        created: function () {
            this.refresh()
        }
    }
</script>