<template>
    <v-container grid-list-md text-xs-center>
        <v-layout>
            <v-flex>

                <v-toolbar color="pink" dark>
                    <v-toolbar-side-icon/>
                    <v-toolbar-title>
                        Comparer {{axis.qt}}{{axis.unit}} de {{leftTree.name}} et {{axis.qt}}{{axis.unit}} de {{rightTree.name}}
                    </v-toolbar-title>
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
                                        <div @click.native="axis = $event" class="leftRightRadar"
                                             style="height: 100%;width: 100%;"></div>
                                        <v-layout column v-if="showTables">
                                            <v-data-table v-if="leftItems" :headers="leftHeader" :items="leftItems"
                                                          hide-actions>
                                                <template slot="items" slot-scope="props">
                                                    <td>{{ props.item.name }}</td>
                                                    <td class="text-xs-right">{{ props.item.qt }}</td>
                                                    <td class="text-xs-right">{{ props.item.unit }}</td>
                                                    <td class="text-xs-right">{{ props.item.coef }}</td>
                                                </template>
                                            </v-data-table>
                                            <v-data-table v-if="rightItems" :headers="rightHeader" :items="rightItems"
                                                          hide-actions>
                                                <template slot="items" slot-scope="props">
                                                    <td>{{ props.item.name }}</td>
                                                    <td class="text-xs-right">{{ props.item.qt }}</td>
                                                    <td class="text-xs-right">{{ props.item.unit }}</td>
                                                    <td class="text-xs-right">{{ props.item.coef }}</td>
                                                </template>
                                            </v-data-table>
                                        </v-layout>
                                    </v-layout>
                                </v-card-text>
                                <v-card-actions class="white">
                                    <v-icon x-large :color="namedColors[0]">label</v-icon>{{leftTree.name}}
                                    <v-icon x-large :color="namedColors[1]" style="padding-left:0.5em">label</v-icon>{{rightTree.name}}
                                    <v-spacer></v-spacer>
                                    <v-btn icon @click="swapLeftRight">
                                        <v-icon>swap_horiz</v-icon>
                                    </v-btn>
                                    <v-btn icon>
                                        <v-icon>favorite</v-icon>
                                    </v-btn>
                                    <v-btn icon>
                                        <v-icon>bookmark</v-icon>
                                    </v-btn>
                                    <v-btn icon>
                                        <v-icon>share</v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>
    import {Do} from "../../const/do";
    import {mapMutations} from 'vuex';
    import {extraireAxePrincipal, treeToRadar} from "../../services/mapper";
    import {radar} from "../../services/d3/radar";

    export default {
        props: ['leftTree', 'rightTree'],
        data() {
            return {
                defaultAxis: "Quantité",
                axis: {name: null, coef: NaN},
                leftHeader: [{text: this.leftTree.name}, {text: 'qt'}, {text: 'unit'}, {text: 'coef'}],
                rightHeader: [{text: this.rightTree.name}, {text: 'qt'}, {text: 'unit'}, {text: 'coef'}],
                namedColors:["cyan darken1","pink darken1"],
                colors:["#00A0B0", "#CC333F"],
                showTables:false
            }
        },
        mounted() {
            this.selectAxis(this.defaultAxis);
        },
        methods: {
            ...mapMutations({close: Do.CLEAR_COMPARE_TO,commitSwapLeftRight:Do.SWAP_LEFT_RIGHT}),
            selectAxis(name) {
                const axis = extraireAxePrincipal(name, this.leftTree, this.rightTree);
                if (this.isValid(axis)) {
                    this.axis = axis;
                    this.drawRadar();
                }
            },
            isValid(axis) {
                return isFinite(axis.coef);
            },
            swapLeftRight(){
                this.commitSwapLeftRight();
                this.selectAxis(this.axis.name);
            },
            drawRadar() {
                radar({
                    selectAxis: this.selectAxis,
                    id: ".leftRightRadar",
                    data: [this.radarData.leftTree, this.radarData.rightTree],
                    selectedAxis: this.axis.name,
                    options:{color:this.colors}
                });
            }
        },
        computed: {
            radarData: {
                get() {
                    return treeToRadar(_.cloneDeep({
                        leftTree: this.leftTree,
                        rightTree: this.rightTree,
                        coef: this.axis.coef
                    }));
                }
            },
            leftItems: {
                get() {
                    return this.radarData && this.radarData.leftTree;
                }
            },
            rightItems: {
                get() {
                    return this.radarData && this.radarData.rightTree;
                }
            }
        }
    }
</script>