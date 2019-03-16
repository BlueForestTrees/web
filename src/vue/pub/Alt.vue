<template>
    <info-base :info="info">
        <v-layout column align-center justify-center>

            <v-layout :column="$vuetify.breakpoint.smAndDown">
                <v-layout column align-center>
                    <div class="font-weight-thin text-no-wrap display-1 mx-5">Choisir</div>
                    <selection-card-front :selection="info.leftSelection" :attribute="leftAttribute" no-selection="A"/>
                </v-layout>

                <v-layout column align-center :mt-5="$vuetify.breakpoint.smAndDown">
                    <div class="font-weight-thin text-no-wrap display-1 mx-5">au lieu de</div>
                    <selection-card-front :selection="info.rightSelection" :attribute="rightAttribute" no-selection="B"/>
                </v-layout>
            </v-layout>

            <div class="font-weight-thin align display-1 mt-5">c'est éviter l'équivalent de</div>
            <selection-card-front :selection="info.equivSelection" :attribute="deltaAttribute" no-selection="C"/>


            <v-layout align-center class="font-weight-thin" v-if="deltaQt < 0">
                <v-icon color="red" large>warning</v-icon>
                Le résultat est négatif, ce n'est pas une alternative!
            </v-layout>

        </v-layout>
    </info-base>
</template>

<script>
    import {getFragment, qtUnitName} from "../../services/calculations"
    import {mapActions} from "vuex"
    import {GO} from "../../const/go"
    import SelectionCardFront from "../tree/SelectionCardFront"
    import On from "../../const/on"
    import InfoBase from "./InfoBase"

    export default {
        name: "alt-show",
        components: {InfoBase, SelectionCardFront},
        props: ['info'],
        data: () => ({
            GO,
            leftTree: null, rightTree: null, equivTree: null
        }),
        created() {
            this.refresh()
        },
        methods: {
            qtUnitName,
            ...mapActions({
                loadSelectionTree: On.LOAD_SELECTION_TREE,
                applyCoefAll: On.APPLY_QUANTITY_COEF_ALL
            }),
            async refresh() {
                try {
                    this.leftTree = this.info && this.info.leftSelection && this.info.fragment && await this.refreshTree(this.info.leftSelection, this.info.fragment)
                    this.rightTree = this.info && this.info.rightSelection && this.info.fragment && await this.refreshTree(this.info.rightSelection, this.info.fragment)
                    this.equivTree = this.info && this.info.equivSelection && this.info.fragment && await this.refreshTree(this.info.equivSelection, this.info.fragment)
                } catch (e) {
                    console.error(e)
                }
            },
            refreshTree(selection, fragment) {
                return this.loadSelectionTree({selection, fragments: [fragment.type]})
            }
        },
        computed: {
            leftAttribute() {
                return this.leftTree && this.info.fragment && getFragment(this.leftTree, this.info.fragment)
            },
            rightAttribute() {
                return this.rightTree && this.info.fragment && getFragment(this.rightTree, this.info.fragment)
            },
            deltaAttribute() {
                if (this.leftAttribute && this.rightAttribute) {
                    const deltaBqt = this.rightAttribute.quantity.bqt - this.leftAttribute.quantity.bqt
                    const delta = JSON.parse(JSON.stringify(this.rightAttribute))
                    delta.quantity.bqt = deltaBqt
                    return delta
                }
            },
            deltaQt() {
                return this.deltaAttribute && this.deltaAttribute.quantity.bqt
            },
            equivAttribute() {
                return this.equivTree && this.info.fragment && getFragment(this.equivTree, this.info.fragment)
            },
            coef() {
                if (this.deltaAttribute && this.equivAttribute) {
                    return this.deltaAttribute.quantity.bqt / this.equivAttribute.quantity.bqt
                }
            }
        },
        watch: {
            info() {
                this.refresh()
            },
            coef(c) {
                if (c && c !== 1) {
                    this.applyCoefAll({tree: this.equivTree, coef: c})
                }
            }
        }
    }
</script>