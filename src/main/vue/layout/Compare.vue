<template>
    <v-container grid-list-md text-xs-center>
        <v-layout>
            <v-flex>
                <v-toolbar color="pink" dark>
                    <v-toolbar-side-icon/>
                    <v-toolbar-title>Comparer {{leftTree.trunk.name}} avec {{rightTree.trunk.name}}</v-toolbar-title>
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
    import {align, denorm, separate} from "../../services/mapper";

    export default {
        name: 'compare',
        props: ['leftTree', 'rightTree'],
        methods: {
            ...mapMutations({"close": Do.CLOSE_COMPARE_TO})
        },
        data: function () {
            return {
                axis: QUANTITY
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
            rightAligned: function() {
                return align(this.rightDenorm, this.coef);
            },
            separated: function(){
                return separate(this.leftDenorm, this.rightAligned);
            }
            /*radarData: function () {
                return treeToRadar(_.cloneDeep({
                    axis: this.axis,
                    leftTree: this.leftTree,
                    rightTree: this.rightTree
                }));
            }*/
            /*,
            render: function () {
                radar({
                    selectAxis: this.selectAxis,
                    id: ".leftRightRadar",
                    data: [this.radarData.leftTree, this.radarData.rightTree],
                    selectedAxis: this.axis,
                    options: {color: this.colors}
                });
            }*/
        }
    }
</script>