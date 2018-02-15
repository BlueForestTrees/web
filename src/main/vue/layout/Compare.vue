<template>
    <v-container grid-list-md text-xs-center>
        <v-layout>
            <v-flex>
                <v-toolbar color="pink" dark>
                    <v-toolbar-side-icon/>
                    <v-toolbar-title>Comparer</v-toolbar-title>
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

                                        <v-card>
                                            <v-card-title><h4>
                                                <v-icon x-large :color="namedColors[0]">lens</v-icon>uniquement {{leftTree.trunk.name}}
                                            </h4></v-card-title>
                                            <v-divider/>
                                            <v-list dense>
                                                <v-list-tile v-for="leftOnlyAxis in separated.left" :key="leftOnlyAxis.axis">
                                                    <v-list-tile-content>
                                                        <qt-unit-name :axis="leftOnlyAxis"/>
                                                    </v-list-tile-content>
                                                </v-list-tile>
                                            </v-list>
                                        </v-card>


                                        <v-card>
                                            <v-card-title><h4>
                                                <v-icon x-large :color="namedColors[1]">lens</v-icon>uniquement {{rightTree.trunk.name}}
                                            </h4></v-card-title>
                                            <v-divider/>
                                            <v-list dense>
                                                <v-list-tile v-for="rightOnlyAxis in separated.right" :key="rightOnlyAxis.axis">
                                                    <v-list-tile-content>
                                                        <qt-unit-name :axis="rightOnlyAxis"/>
                                                    </v-list-tile-content>
                                                </v-list-tile>
                                            </v-list>
                                        </v-card>
                                        <v-card style="height: 100%;width: 100%;">
                                            <v-card-title>
                                                <v-flex><h4>
                                                    {{leftTree.trunk.name}}<v-icon x-large :color="namedColors[0]" style="padding-right: 2em">lens</v-icon>
                                                    {{rightTree.trunk.name}}<v-icon x-large :color="namedColors[1]">lens</v-icon>
                                                </h4></v-flex>
                                            </v-card-title>
                                            <div class="leftRightRadar" @click.native="axis = $event" style="height: 100%;width: 100%;"/>
                                        </v-card>

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
    import {mapGetters, mapMutations} from 'vuex';
    import {QUANTITY} from "../../const/labels";
    import {align, applyRatio, denorm, separate} from "../../services/mapper";
    import {drawRadar} from "../../services/d3/radar";
    import QtUnitName from "../common/QtUnitName";

    export default {
        components: {QtUnitName},
        name: 'compare',
        props: ['leftTree', 'rightTree'],
        methods: {
            ...mapMutations({"close": Do.CLOSE_COMPARE_TO}),
            changeAxis: function (axis) {
                this.axis = axis;
                this.draw(this.separated);
                //TODO ajouter les lefts et right sur les cotés.
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
            ...mapGetters(['calcCoef']),

            coef: function () {
                return this.calcCoef(this.axis, this.leftDenorm, this.rightDenorm);
            },
            leftAligned: function () {
                return this.leftDenorm;
            },
            rightAligned: function () {
                return align(this.rightDenorm, this.coef);
            },
            separated: function () {
                const data = separate(this.leftAligned, this.rightAligned);
                applyRatio(data.common, qt => this.$store.getters.baseQt(qt));
                return data;
            },
        },
        mounted: function () {
            this.draw(this.separated);
        }
    }
</script>