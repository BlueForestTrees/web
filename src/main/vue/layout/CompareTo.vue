<template>
    <v-container grid-list-md text-xs-center>
        <v-layout>
            <v-flex>

                <v-toolbar color="pink" dark>
                    <v-toolbar-side-icon/>
                    <v-toolbar-title>{{tree.name}} et {{compareTo.name}}</v-toolbar-title>
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
                                    <div class="facetRadar" style="height: 100%;width: 100%;"></div>
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
                        <!--        <v-flex xs-6>
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
                                </v-flex>-->
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
    import {toRadarData} from "../../services/mapper";

    export default {
        props: ['tree', 'compareTo'],
        computed: {
            compareData: {
                get:function(){
                    let radarData = toRadarData(this.tree, this.compareTo);

                     console.log(radarData);

                    return radarData;
                }
            }
        },
        watch: {
            compareData(data) {
                this.updateRadar(data);
            }
        },
        methods: {
            ...mapMutations({close: Do.CLEAR_COMPARE_TO}),
            updateRadar(data){
                radar(".facetRadar", data);
            }
        },
        mounted(){
            this.updateRadar(this.compareData);
        }
    }
</script>