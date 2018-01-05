<template>
    <v-container grid-list-md text-xs-center>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <v-toolbar color="pink" dark>
                    <v-toolbar-side-icon/>
                    <v-toolbar-title>{{tree.name}} et {{compareTo.name}}</v-toolbar-title>
                    <v-spacer/>
                    <v-btn @click="close" icon>
                        <v-icon large>highlight_off</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-container fluid grid-list-md class="grey lighten-4">
                    <v-layout row wrap>
                        <v-flex xs-12>
                            <v-card>
                                <v-card-text>
                                    <div class="facetRadar"></div>
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
                        <v-flex xs-6>
                            <v-card>
                                <v-card-text>ici réglage axe</v-card-text>
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
                        <v-flex xs-6>
                            <v-card>
                                <v-card-text>ici radar ressources</v-card-text>
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
    import * as d3 from 'd3';


    export default {
        props: ['tree', 'compareTo'],
        methods: {
            ...mapMutations({close: Do.CLEAR_COMPARE_TO})
        },
        mounted(){
            //////////////////////////////////////////////////////////////
            //////////////////////// Set-Up //////////////////////////////
            //////////////////////////////////////////////////////////////

            var margin = {top: 100, right: 100, bottom: 100, left: 100};

            //////////////////////////////////////////////////////////////
            ////////////////////////// Data //////////////////////////////
            //////////////////////////////////////////////////////////////

            var data = [
                [
                    {axis:"Battery Life",value:1},
                    {axis:"Brand",value:1},
                    {axis:"Contract Cost",value:1},
                    {axis:"Design And Quality",value:1},
                    {axis:"Have Internet Connectivity",value:1}
                ],
                [
                    {axis:"Battery Life",value:0.22},
                    {axis:"Brand",value:2.8},
                    {axis:"Contract Cost",value:0.29},
                    {axis:"Design And Quality",value:0.17},
                    {axis:"Have Internet Connectivity",value:0.22}
                ]
            ];
            //////////////////////////////////////////////////////////////
            //////////////////// Draw the Chart //////////////////////////
            //////////////////////////////////////////////////////////////

            var radarChartOptions = {
                margin: margin,
                maxValue: 1,
                levels: 4,
                roundStrokes: true,
                color: d3.scaleOrdinal().range(["#00A0B0","#CC333F"])
            };


            radar(".facetRadar", data, radarChartOptions);
        }
    }
</script>