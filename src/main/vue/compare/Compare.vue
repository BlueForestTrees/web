<template>
    <v-container v-if="axises">
        <span v-if="nothingCommon">Rien à comparer</span>
        <compare-radar :axises="axises" :left="left" :right="right" :left-color="'#00ACC1'" :rightColor="'#D81B60'"/>
        <compare-ribbon :axises="axises" :left="left" :right="right" :left-color="'#00ACC1'" :rightColor="'#D81B60'"/>
        <!--<compare-table :axises="axises" :left="left" :right="right" :left-color="leftColor" :rightColor="rightColor"/>-->
    </v-container>
</template>

<script>
    import {applyBase, buildAxises, separate} from "../../services/axis"
    import On from "../../const/on"
    import {mapActions} from 'vuex'
    import CompareTable from "./CompareTable"
    import CompareRadar from "./CompareRadar"
    import CompareRibbon from "./CompareRibbon"

    export default {
        name: 'compare',
        props: ['leftId', 'rightId'],
        components: {
            CompareRibbon,
            CompareRadar,
            CompareTable
        },
        data: function () {
            return {
                left: null,
                right: null,
                base: null,
                axises: null,
                leftColor: "cyan darken1",
                rightColor: "pink darken1",
                nothingCommon: false
            }
        },
        created: async function () {
            this.init()
        },
        watch: {
            '$route'(to, from) {
                this.refresh()
            }
        },
        methods: {
            init: async function () {
                await this.refreshTrees()
                this.treesToAxises()
                this.selectDefaultBase()
            },
            ...mapActions({loadTree: On.LOAD_TREE, snack: On.SNACKBAR}),
            refreshTrees: async function () {
                this.left = await this.loadTree({_id: this.leftId})
                this.right = await this.loadTree({_id: this.rightId})
                await this.left.promises.all
                await this.right.promises.all
            },
            treesToAxises: function () {
                try {
                    this.axises = separate(buildAxises(this.left), buildAxises(this.right))
                } catch (e) {
                    this.snack({text: "Erreur de calcul, données insuffisantes", color: "red"})
                    throw e
                }
            },
            selectDefaultBase: function () {
                if (this.axises.common.length > 0) {
                    this.nothingCommon = false
                    this.changeBase(this.axises.common[0].left)
                } else {
                    this.nothingCommon = true
                }
            },
            changeBase(v) {
                this.base = v
                applyBase(this.base, this.axises)
            }
        }
    }
</script>