<template>
    <v-container grid-list-md text-xs-center>
        <v-layout>
            <v-flex>
                <v-toolbar color="pink" dark>
                    <v-toolbar-side-icon/>
                    <v-toolbar-title>Comparer à {{axis}} égal(e)</v-toolbar-title>
                    <v-spacer/>
                    <v-btn @click="close" icon>
                        <v-icon large>highlight_off</v-icon>
                    </v-btn>
                </v-toolbar>

                <v-container fluid grid-list-md class="grey lighten-4">
                    <v-layout>
                        <v-flex>
                            <v-card>
                                <v-card-text style="height:700px">
                                    <v-layout row style="height: 100%;width: 100%;">

                                        <axis-list :axises="separated.left" :name="leftTree.trunk.name"
                                                   :color="namedColors[0]"/>

                                        <v-card style="height: 100%;width: 100%;">
                                            <v-card-title>
                                                <v-flex>
                                                    <h4 class="no-wrap">
                                                        <span class="leftAir">{{leftTree.trunk.name}}</span>
                                                        <v-icon x-large :color="namedColors[0]" class="rightAir">lens
                                                        </v-icon>
                                                        <span>{{rightTree.trunk.name}}</span>
                                                        <v-icon x-large :color="namedColors[1]" class="rightAir">lens
                                                        </v-icon>
                                                    </h4>
                                                </v-flex>
                                            </v-card-title>
                                            <v-divider/>
                                            <div class="leftRightRadar" @click.native="axis = $event"
                                                 style="height: 100%;width: 100%;"/>
                                        </v-card>

                                        <axis-list :axises="separated.right" :name="rightTree.trunk.name"
                                                   :color="namedColors[1]"/>

                                    </v-layout>
                                </v-card-text>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import Do from "../../const/do";
    import {mapMutations} from 'vuex';
    import {QUANTITY} from "../../const/labels";
    import {align, applyRatio, denorm, separate} from "../../services/radar-calc";
    import {drawRadar} from "../../services/d3/radar";
    import AxisList from "../common/AxisList";
    import _ from 'lodash';
    import {baseQt, calcCoef} from "trees-units";

    export default {
        components: {
            AxisList
        },
        name: 'compare',
        props: ['leftTree', 'rightTree'],
        methods: {
            ...mapMutations({"close": Do.CLOSE_COMPARE_TO}),
            changeAxis: function (axis) {
                this.axis = axis;
                this.draw(this.separated);
            },
            draw: function (data) {
                drawRadar({
                    selectAxis: this.changeAxis,
                    id: ".leftRightRadar",
                    data: [data.common.left, data.common.right],
                    selectedAxis: this.axis,
                    options: {color: this.colors}
                });
            }
        },
        data: function () {
            return {
                axis: QUANTITY,
                namedColors: ["cyan darken1", "pink darken1"],
                colors: ["#00A0B0", "#CC333F"]
            }
        },
        computed: {
            leftDenorm: function () {
                return denorm(this.leftTree)
            },
            rightDenorm: function () {
                return denorm(this.rightTree)
            },

            coef: function () {
                return calcCoef(this.axis, this.leftDenorm, this.rightDenorm);
            },
            leftAligned: function () {
                return this.leftDenorm;
            },
            rightAligned: function () {
                return align(_.cloneDeep(this.rightDenorm), this.coef);
            },
            separated: function () {
                const data = separate(_.cloneDeep(this.leftAligned), _.cloneDeep(this.rightAligned));
                applyRatio(data.common, baseQt);
                return data;
            },
        },
        mounted: function () {
            this.draw(this.separated);
        }
    }
</script>

<style>
    .no-wrap {
        flex: 0 0 auto;
    }

    .rightAir {
        padding-right: 2em
    }

    .leftAir {
        padding-left: 2em
    }
</style>