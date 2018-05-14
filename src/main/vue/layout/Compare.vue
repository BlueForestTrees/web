<template>
    <span v-if="axises">
        <v-layout row>
            <v-menu offset-y style="width:100%">
                <v-btn flat block slot="activator">A {{base && base.name}} égal(e)</v-btn>
                <v-list>
                    <v-list-tile v-for="axis in axises.common.left" :key="axis.name" @click="changeBase(axis)">
                      <v-list-tile-title>A {{ axis.name.toLowerCase() }} égal(e)</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
        </v-layout>
        <v-layout row wrap>
            <v-flex><axis-list :axises="axises.left" :name="leftTree.trunk.name" :color="namedColors[0]"/></v-flex>
            <v-flex><axis-list :axises="axises.common.left" :name="leftTree.trunk.name" :color="namedColors[0]"/></v-flex>
            <v-flex><axis-list :axises="axises.common.right" :name="rightTree.trunk.name" :color="namedColors[1]"/></v-flex>
            <v-flex><axis-list :axises="axises.right" :name="rightTree.trunk.name" :color="namedColors[1]"/></v-flex>
        </v-layout>
    </span>

</template>

<script>
    import {applyBase, buildAxises, separate} from "../../services/axis";
    import AxisList from "../common/AxisList";
    import {cloneDeep} from 'lodash';

    export default {
        components: {
            AxisList
        },
        name: 'compare',
        props: ['leftTree', 'rightTree'],
        data: function () {
            return {
                namedColors: ["cyan darken1", "pink darken1"],
                colors: ["#00A0B0", "#CC333F"],
                base: null,
                axises: null
            }
        },
        mounted: function () {
            this.axises = separate(cloneDeep(buildAxises(this.leftTree)), cloneDeep(buildAxises(this.rightTree)));
            this.changeBase(this.axises.common.left[0]);
        },
        methods: {
            changeBase(v) {
                this.base = v;
                applyBase(this.base, this.axises);
            }
        }
    }
</script>