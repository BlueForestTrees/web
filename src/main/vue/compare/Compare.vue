<template>
    <v-container v-if="axises">
        <v-layout row>
            <v-menu v-if="axises.common.left.length > 0" offset-y style="width:100%">
                <v-btn flat block slot="activator">A {{base && base.name}} égal(e)</v-btn>
                <v-list>
                    <v-list-tile v-for="axis in axises.common.left" :key="axis.name" @click="changeBase(axis)">
                      <v-list-tile-title>A {{ axis.name.toLowerCase() }} égal(e)</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
            <v-spacer/>
            <v-btn icon flat @click="close">
                <v-icon x-large color="grey">close</v-icon>
            </v-btn>
        </v-layout>
        <compare-table :axises="axises" :left="left" :right="right" :left-color="leftColor" :rightColor="rightColor"/>
        <compare-radar :axises="axises" :left="left" :right="right" :left-color="'#00ACC1'" :rightColor="'#D81B60'"/>
    </v-container>

</template>

<script>
    import {applyBase, buildAxises, updateRatios, separate} from "../../services/axis";
    import On from "../../const/on";
    import {cloneDeep} from 'lodash';
    import {mapActions} from 'vuex';
    import CompareTable from "./CompareTable";
    import CompareRadar from "./CompareRadar";

    export default {
        components: {
            CompareRadar,
            CompareTable
        },
        name: 'compare',
        props: ['leftId', 'rightId'],
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
            await this.refreshTrees();
            this.treesToAxises();
            this.selectDefaultBase();
        },
        methods: {
            ...mapActions({refreshTree: On.LOAD_OPEN_TREE, close: On.GO_HOME}),
            refreshTrees: async function () {
                let leftPromise = this.refreshTree({_id: this.leftId});
                let rightPromise = this.refreshTree({_id: this.rightId});

                this.left = await leftPromise;
                this.right = await rightPromise;
            },
            treesToAxises: function () {
                this.axises = separate(cloneDeep(buildAxises(this.left)), cloneDeep(buildAxises(this.right)));
            },
            selectDefaultBase: function () {
                this.changeBase(this.axises.common.left[0]);
            },
            changeBase(v) {
                this.base = v;
                applyBase(this.base, this.axises);
            }
        }
    }
</script>