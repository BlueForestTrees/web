<template>
    <info-base :info="info">
        <v-layout :column="$vuetify.breakpoint.smAndDown" align-center justify-center>

            <selection-card-front :selection="info.leftSelection" :attribute="leftAttribute" no-selection="A"/>

            <div class="bold-font align display-2 ma-4">=</div>

            <selection-card-front :selection="info.rightSelection" :attribute="rightAttribute" no-selection="B"/>

        </v-layout>
    </info-base>
</template>

<script>
    import {attributeCoef, getFragment} from "../../services/calculations"
    import {mapActions} from "vuex"
    import SelectionCardFront from "../tree/SelectionCardFront"
    import On from "../../const/on"
    import InfoBase from "./InfoBase"

    export default {
        name: "eq-show",
        components: {InfoBase, SelectionCardFront},
        props: ['info'],
        data: () => ({On, leftTree: null, rightTree: null}),
        created() {
            this.refresh()
        },
        methods: {
            ...mapActions({
                loadSelectionTree: On.LOAD_SELECTION_TREE,
                applyCoefAll: On.APPLY_QUANTITY_COEF_ALL
            }),
            async refresh() {
                try {
                    this.leftTree = this.info && this.info.leftSelection && this.info.fragment && await this.refreshTree(this.info.leftSelection, this.info.fragment)
                    this.rightTree = this.info && this.info.rightSelection && this.info.fragment && await this.refreshTree(this.info.rightSelection, this.info.fragment)
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
            coef() {
                return this.leftAttribute && this.rightAttribute && attributeCoef(this.leftAttribute, this.rightAttribute)
            }
        },
        watch: {
            info() {
                this.refresh()
            },
            coef(c) {
                if (c && c !== 1) {
                    this.applyCoefAll({tree: this.rightTree, coef: c})
                }
            }
        }
    }
</script>