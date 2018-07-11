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
        <v-layout row wrap>
            <v-flex><axis-list :axises="axises.left" :name="leftTree.trunk.name" :color="namedColors[0]"/></v-flex>
            <v-flex><axis-list :axises="axises.common.left" :name="leftTree.trunk.name" :color="namedColors[0]"/></v-flex>
            <v-flex><axis-list :axises="axises.common.right" :name="rightTree.trunk.name" :color="namedColors[1]"/></v-flex>
            <v-flex><axis-list :axises="axises.right" :name="rightTree.trunk.name" :color="namedColors[1]"/></v-flex>
        </v-layout>
    </v-container>

</template>

<script>
    import {applyBase, buildAxises, separate} from "../services/axis";
    import AxisList from "./common/AxisList";
    import {cloneDeep} from 'lodash';
    import {mapActions} from 'vuex';
    import On from "../const/on";

    export default {
        components: {
            AxisList
        },
        name: 'compare',
        props: ['leftId', 'rightId'],
        data: function () {
            return {
                leftTree: null,
                rightTree: null,
                namedColors: ["cyan darken1", "pink darken1"],
                colors: ["#00A0B0", "#CC333F"],
                base: null,
                axises: null
            }
        },
        created: function () {
            this.refreshTrees();
        },
        methods: {
            ...mapActions({refreshTree: On.LOAD_OPEN_TREE, close: On.GO_HOME}),
            refreshTrees: async function () {
                let leftPromise = this.refreshTree({_id: this.leftId});
                let rightPromise = this.refreshTree({_id: this.rightId});

                this.leftTree = await leftPromise;
                this.rightTree = await rightPromise;
                this.refreshView();
            },
            refreshView: function () {
                if (this.leftTree && this.rightTree) {
                    this.axises = separate(cloneDeep(buildAxises(this.leftTree)), cloneDeep(buildAxises(this.rightTree)));
                    this.changeBase(this.axises.common.left[0]);
                }
            },
            changeBase(v) {
                this.base = v;
                applyBase(this.base, this.axises);
            }
        }
    }
</script>