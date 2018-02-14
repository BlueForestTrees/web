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

                                        <div class="elevation-1 leftRightRadar" @click.native="axis = $event"
                                             style="height: 100%;width: 100%;">
                                            <v-icon x-large :color="namedColors[0]">label</v-icon>
                                            {{leftTree.trunk.name}}
                                            <v-icon x-large :color="namedColors[1]" style="padding-left:0.5em">label
                                            </v-icon>
                                            {{rightTree.trunk.name}}
                                        </div>

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

    export default {
        name: 'compare',
        props: ['leftTree', 'rightTree'],
        methods: {
            ...mapMutations({"close": Do.CLOSE_COMPARE_TO}),
            changeAxis: function (axis) {
                this.axis = axis;
            },
            draw: function (data) {
                console.log("draw");
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
                console.log("leftDenorm");
                return denorm(this.leftTree)
            },
            rightDenorm: function () {
                console.log("rightDenorm");
                return denorm(this.rightTree)
            },
            ...mapGetters(['calcCoef']),

            coef: function () {
                console.log("coef");
                return this.calcCoef(this.axis, this.leftDenorm, this.rightDenorm);
            },
            leftAligned: function () {
                console.log("leftAlign");
                return this.leftDenorm;
            },
            rightAligned: function () {
                console.log("rightAlign");
                return align(this.rightDenorm, this.coef);
            },
            separated: function () {
                console.log("separated");
                const data = separate(this.leftAligned, this.rightAligned);
                console.log("ratio");
                applyRatio(data.common, qt => this.$store.getters.baseQt(qt));
                return data;
            },
        },
        mounted: function () {
            console.log("mounted");
            this.draw(this.separated);
        }
        // ,
        // watch: {
        //     separated: function (data) {
        //         console.log("watch");
        //         this.draw(data);
        //     }
        // }
    }
</script>