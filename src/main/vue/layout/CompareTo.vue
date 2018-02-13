<template>
    <v-container grid-list-md text-xs-center>
        <v-layout>
            <v-flex>

                <v-toolbar color="pink" dark>
                    <v-toolbar-side-icon/>
                    <v-toolbar-title>
                        Comparer
                        <!--{{axis.qt}}{{axis.unit}} de {{leftTree.name}} et {{axis.qt}}{{axis.unit}} de {{rightTree.name}}-->
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

                                        <v-data-table :headers="headers" :items="items" hide-actions v-if="showTables" class="elevation-1">
                                            <template slot="items" slot-scope="props">
                                                <td @click="selectAxis(props.item.name)">{{ props.item.name }}</td>
                                                <td @click="selectAxis(props.item.name)">{{props.item.leftQt }}{{props.item.leftUnit}}</td>
                                                <td @click="selectAxis(props.item.name)">{{props.item.rightQt }}{{props.item.rightUnit}}</td>
                                            </template>
                                        </v-data-table>

                                        <div class="elevation-1 leftRightRadar" @click.native="axis = $event" style="height: 100%;width: 100%;">
                                                <v-icon x-large :color="namedColors[0]">label</v-icon>{{leftTree.name}}
                                                <v-icon x-large :color="namedColors[1]" style="padding-left:0.5em">label</v-icon>{{rightTree.name}}
                                        </div>


                                    </v-layout>
                                </v-card-text>
                                <v-card-actions class="white">
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
    import Do from "../../const/do";
    import {mapMutations} from 'vuex';
    import {extraireAxisCoef, treeToRadar} from "../../services/mapper";
    import {drawRadar} from "../../services/d3/radar";

    export default {
        props: ['leftTree', 'rightTree'],
        data() {
            return {
                defaultAxis: "Nombre",
                axis: {name: null, coef: NaN},
                leftHeader: [{text: this.leftTree.name}, {text: 'qt'}, {text: 'unit'}, {text: 'coef'}],
                rightHeader: [{text: this.rightTree.name}, {text: 'qt'}, {text: 'unit'}, {text: 'coef'}],
                namedColors:["cyan darken1","pink darken1"],
                colors:["#00A0B0", "#CC333F"],
                showTables:true
            }
        },
        mounted() {
            this.selectAxis(this.defaultAxis);
        },
        methods: {
            ...mapMutations({close: Do.CLEAR_COMPARE_TO,commitSwapLeftRight:Do.SWAP_LEFT_RIGHT}),
            selectAxis(name) {
                const axis = extraireAxisCoef(name, this.leftTree, this.rightTree);
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
                drawRadar({
                    selectAxis: this.selectAxis,
                    id: ".leftRightRadar",
                    data: [this.radarData.leftTree, this.radarData.rightTree],
                    selectedAxis: this.axis.name,
                    options:{color:this.colors}
                });
            }
        },
        computed: {
            headers:{
                get(){
                    return [{text:`${this.axis.name} égal(e)`, value:"name"},{text:this.leftTree.name, sortable:false},{text:this.rightTree.name, sortable:false}]
                }
            },
            radarData: {
                get() {
                    return treeToRadar(_.cloneDeep({
                        leftTree: this.leftTree,
                        rightTree: this.rightTree,
                        coef: this.axis.coef
                    }));
                }
            },
            items:{
                get() {
                    const result = [];

                    /*_.forEach(this.radarData.leftTree,leftAxis=>{
                        const isMainAxis = this.axis.name === leftAxis.name;
                        const rightAxis = _.find(this.radarData.rightTree,{name:leftAxis.name});

                        result.push({
                            isMainAxis,
                            name:leftAxis.name,
                            leftUnit:leftAxis.unit,
                            leftQt:leftAxis.qt,
                            rightUnit:rightAxis.unit,
                            rightQt:rightAxis.qt
                        })
                    });*/

                    return result;
                }
            }
        }
    }
</script>