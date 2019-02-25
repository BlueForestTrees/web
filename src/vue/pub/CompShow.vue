<template>
    <info-base :info="info">
        <v-layout :column="$vuetify.breakpoint.smAndDown" align-center justify-center>

            <selection-card-front :selection="info.leftSelection" :attribute="leftAttribute" no-selection="A"/>

            <div class="font-weight-thin text-no-wrap display-1 ma-4">compense</div>

            <selection-card-front :selection="info.rightSelection" :attribute="rightAttribute" no-selection="B"/>

        </v-layout>
    </info-base>
</template>

<script>
    import SelectionCardFront from "../tree/SelectionCardFront"
    import InfoBase from "./InfoBase"
    import On from "../../const/on"
    import {attributeCoef, getAttributeByFragment} from "../../services/calculations"
    import {mapActions} from "vuex"

    export default {
        name: "comp-show",
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
                return this.leftTree && this.info.fragment && getAttributeByFragment(this.leftTree, this.info.fragment)
            },
            rightAttribute() {
                return this.rightTree && this.info.fragment && getAttributeByFragment(this.rightTree, this.info.fragment)
            },
            coef() {
                return this.leftAttribute && this.rightAttribute && -attributeCoef(this.leftAttribute, this.rightAttribute)
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