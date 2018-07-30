<template>
    <v-container v-if="axises">
        <v-layout row>
            <v-spacer/>
            <v-btn icon flat @click="close">
                <v-icon x-large color="grey">close</v-icon>
            </v-btn>
        </v-layout>
        <compare-radar :axises="axises" :left="left" :right="right" :left-color="'#00ACC1'" :rightColor="'#D81B60'" @baseChange="changeBase"/>
        <compare-table :axises="axises" :left="left" :right="right" :left-color="leftColor" :rightColor="rightColor"/>
    </v-container>
</template>

<script>
    import {applyBase, buildAxises, separate} from "../../services/axis"
    import On from "../../const/on"
    import {mapActions} from 'vuex'
    import CompareTable from "./CompareTable"
    import CompareRadar from "./CompareRadar"
    import {hasQuantity} from "../../services/calculations"

    export default {
        name: 'compare',
        props: ['leftId', 'rightId'],
        components: {
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
            }
        },
        created: async function () {
            await this.refreshTrees()
            this.treesToAxises()
            this.selectDefaultBase()
        },
        methods: {
            ...mapActions({refreshTree: On.LOAD_OPEN_TREE, close: On.GO_HOME, snack: On.SNACKBAR}),
            refreshTrees: async function () {
                let leftPromise = this.refreshTree({_id: this.leftId})
                let rightPromise = this.refreshTree({_id: this.rightId})

                this.left = await leftPromise
                this.right = await rightPromise
            },
            treesToAxises: function () {
                if (!hasQuantity(this.left.trunk) || !hasQuantity(this.right.trunk)) {
                    this.snack({text: "quantités non définies", color: "grey"});
                    throw "Quantités non définies";
                }
                try {
                    this.axises = separate(buildAxises(this.left), buildAxises(this.right))
                } catch (e) {
                    this.snack({text: "Erreur de calcul, données insuffisantes", color: "red"})
                    throw e
                }
            },
            selectDefaultBase: function () {
                this.changeBase(this.axises.common.left[0])
            },
            changeBase(v) {
                this.base = v
                applyBase(this.base, this.axises)
            }
        }
    }
</script>