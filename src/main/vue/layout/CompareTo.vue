<template>
    <v-container grid-list-md text-xs-center>
        <v-layout>
            <v-flex>

                <v-toolbar color="pink" dark>
                    <v-toolbar-side-icon/>
                    <v-toolbar-title>Comparer {{tree.name}} et {{compareTo.name}}, à {{axis}} égal(e).</v-toolbar-title>
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
                                        <div class="facetRadar" style="height: 100%;width: 100%;"></div>
                                        <v-layout column>
                                            <v-data-table :headers="leftHeader" :items="leftItems" hide-actions>
                                                <template slot="items" slot-scope="props">
                                                    <td>{{ props.item.name }}</td>
                                                    <td class="text-xs-right">{{ props.item.qt }}</td>
                                                    <td class="text-xs-right">{{ props.item.unit }}</td>
                                                    <td class="text-xs-right">{{ props.item.coef }}</td>
                                                </template>
                                            </v-data-table>
                                            <v-data-table :headers="rightHeader" :items="rightItems" hide-actions>
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
                                    <v-spacer></v-spacer>
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
    import radar from '../../services/radar';
    import {applyCoef, egaliserSelonAxe, extraireCoef, toRadarData} from "../../services/mapper";

    export default {
        props: ['tree', 'compareTo'],
        data() {
            return {
                axis: "Quantité",
                leftHeader: [{text: this.tree.name}, {text: 'qt'},{text: 'unit'}, {text: 'coef'}],
                rightHeader: [{text: this.compareTo.name}, {text: 'qt'}, {text: 'unit'}, {text: 'coef'}]
            }
        },
        mounted() {
            this.updateRadar();
        },
        methods: {
            ...mapMutations({close: Do.CLEAR_COMPARE_TO}),
            updateRadar() {
                radar(".facetRadar", [this.compareData.left, this.compareData.right]);
            }
        },
        computed: {
            compareData: {
                get: function () {

                    const leftRightTrees = _.cloneDeep({leftTree: this.tree, rightTree: this.compareTo});

                    const coef = extraireCoef(this.axis, leftRightTrees);

                    applyCoef(leftRightTrees.rightTree, coef);

                    return toRadarData(leftRightTrees);
                }
            },
            leftItems: {
                get: function () {
                    return this.compareData.left;
                }
            },
            rightItems: {
                get: function () {
                    return this.compareData.right;
                }
            }
        },
        watch: {
            compareData(data) {
                //    this.updateRadar(data);
                console.log("compareDate change");
            }
        }
    }
</script>