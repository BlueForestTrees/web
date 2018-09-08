<template>
    <v-container v-if="lines">
        <v-card>
            <v-layout row>
                <v-select class="title mt-1 ml-1 pl-2" style="max-width: 16em;margin-bottom:0em" :items="types" v-model="type" item-text="text" item-value="code"></v-select>
                <v-spacer/>
                <v-icon class="mr-1" x-large @click="zoom = !zoom">{{zoom ? 'pie_chart' : 'list'}}</v-icon>
            </v-layout>
            <svg v-if="zoom" :viewBox="listViewbox" class="ma-4" style="min-width: 40em;min-height:20em;">
                <g>
                    <!--FORMES-->
                    <path :d="lines.right" :fill="rightColor"></path>
                    <path :d="lines.left" :fill="leftColor"></path>
                </g>
                <g>
                    <template v-for="(axis,i) in axises.common">
                        <!--LISTES DES NOM D'AXES-->
                        <text alignment-baseline="middle" :x="5+gwidth" :y="(0.5+i)*lineHeight" :style="{fill:textColor}">{{axis.left.name}} {{curI === i ? equiv(axis.left) : ""}}</text>

                        <!-- POINTILLES-->
                        <line :x1="0" :x2="gwidth" :y1="i*lineHeight" :y2="i*lineHeight" stroke="grey" stroke-width="0.4" stroke-opacity="0.3" stroke-dasharray="5, 10" ></line>
                        <line :x1="gwidth" :x2="width" :y1="i*lineHeight" :y2="i*lineHeight" stroke="grey" stroke-width="0.4" stroke-opacity="0.3"></line>

                        <!--SELECTION-->
                        <rect fill="primary" x="0" :y="i*lineHeight" :width="width" :height="lineHeight" stroke-width="1" stroke-opacity="0.8" :fill-opacity="curI === i ? 0.1 : 0" @click="curI = i" @mouseover="curI = i"></rect>
                        <g v-if="curI === i">
                            <text alignment-baseline="middle" :x="border" :y="(0.5+i)*lineHeight" :font-size="9-(1.1*(qtUnit(axis.left).length-9))" :style="{fill:leftTextColor, pointerEvents:'none'}">{{qtUnit(axis.left)}}</text>
                            <text alignment-baseline="middle" text-anchor="end" :x="gwidth-border" :font-size="9-(1.1*(qtUnit(axis.right).length-9))" :y="(0.5+i)*lineHeight" :style="{fill:rightTextColor, pointerEvents:'none'}">{{qtUnit(axis.right)}}</text>
                        </g>
                    </template>
                </g>
            </svg>
            <svg v-else :viewBox="camViewbox" class="ma-4" style="max-height: 30em">

                <!--CERCLES-->
                <defs>
                    <clipPath id="rectRatio">
                        <rect x="0" y="0" :width="width" :height="width*leftRatio"></rect>
                    </clipPath>
                </defs>
                <circle :cx="width*0.5" :cy="width*0.5" :r="width*0.5" :fill="rightColor"></circle>
                <circle :cx="width*0.5" :cy="width*0.5" :r="width*0.5" :fill="leftColor" clip-path="url(#rectRatio)"></circle>

                <!--POURCENTAGES-->
                <text v-if="leftPercent > 5" :x="width*0.5" text-anchor="middle" alignment-baseline="central" :y="width*leftRatio*0.5" font-size="25" :style="{fill:leftTextColor}">{{leftPercent}}%</text>
                <text v-if="rightPercent > 5" :x="width*0.5" text-anchor="middle" alignment-baseline="central" :y="width - (width*rightRatio*0.5)" font-size="25" :style="{fill:rightTextColor}">{{rightPercent}}%</text>
            </svg>
        </v-card>

        <!--LEGENDE-->
        <v-layout row wrap justify-center>
            <v-card class="mb-1 mt-2 pl-2 pr-3" style="border-radius:2em">
                <v-layout row>
                    <v-layout column>
                        <tree-head :tree="left" class="my-2" @nav="goTree(left)" :style="{cursor: 'pointer'}"/>
                        <tree-head :tree="right" class="my-2" @nav="goTree(right)" :style="{cursor: 'pointer'}"/>
                    </v-layout>
                </v-layout>
            </v-card>
        </v-layout>
    </v-container>

</template>

<script>

    import {equiv, getLuma, qtUnit, shadeColor} from "../../services/calculations"
    import TreeHead from "../tree/TreeHead"
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import {rightRatio} from "../../services/axis"
    import Vue from 'vue'

    export default {
        name: "compare-ribbon",
        components: {TreeHead},
        props: ['axises', 'left', 'right', 'leftColor', 'rightColor'],
        data: function () {
            const alpha = 0.7
            const textColor = '#696955'
            return {
                type: 1,
                types: [{code:1, text:"Impact environmental"}],
                zoom: false,
                border: 2,
                lineHeight: 25,
                gwidth: 100,
                width: 550,
                curI: 0,
                leftLightColor: shadeColor('#00ACC1', alpha),
                rightLightColor: shadeColor('#D81B60', alpha),
                textColor,
                darkTextColor: shadeColor(textColor, -0.35),
                previousLVB:null
            }
        },
        watch: {
            listViewbox(c, old) {
                this.previousLVB = old
                this.$refs.animListViewbox && this.$refs.animListViewbox.beginElement()
            }
        },
        computed: {
            leftPercent:function(){
                return Math.round(this.leftRatio*100)
            },
            rightPercent:function(){
                return Math.round(this.rightRatio*100)
            },
            leftTextColor:function(){
                return this.leftColor && getLuma(this.leftColor) < 30 ? "white" : "black"
            },
            rightTextColor:function(){
                return this.rightColor && getLuma(this.rightColor) > 30 ? "white" : "black"
            },
            leftRatio: function(){
                return 1 - this.rightRatio
            },
            rightRatio: function(){
                return this.axises && rightRatio(this.axises)
            },
            axisCount: function () {
                return this.axises && this.axises.common && this.axises.common.length
            },
            gheight: function () {
                return this.axisCount * this.lineHeight
            },
            listViewbox: function () {
                return `0 0 ${this.width} ${this.gheight}`
            },
            camViewbox: function(){
                return `0 0 ${this.width} ${this.width}`
            },
            lines: function () {
                if (this.axisCount > 0) {
                    const ld = [`M0 ${this.gheight} L0 0`]
                    const rd = [`M${this.gwidth} ${this.gheight} L${this.gwidth} 0`]

                    let initialPoint = `L${this.axises.common[0].left.ratio * this.gwidth} 0`
                    ld.push(initialPoint)
                    rd.push(initialPoint)

                    for (let i = 0; i < this.axises.common.length; i++) {
                        let lratio = this.axises.common[i].left.ratio
                        let draw = `L${lratio * this.gwidth} ${(0.5 + i) * this.lineHeight}`
                        ld.push(draw)
                        rd.push(draw)
                    }

                    let finalPoint = `L${this.axises.common[this.axises.common.length-1].left.ratio * this.gwidth} ${this.gheight}`
                    ld.push(finalPoint)
                    rd.push(finalPoint)

                    ld.push("Z")
                    rd.push("Z")
                    return {left: ld.join(" "), right: rd.join(" ")}
                }
            },
        },
        methods: {
            shadeColor, qtUnit, equiv,
            ...mapActions({goTree: On.GO_TREE})
        }
    }
</script>
<style>
    /*Juste pour virer les espaces autour de la combo! */
    div.v-input__slot {
        margin-bottom: 0em;
    }
    div.v-text-field__details {
        display: none;
    }
</style>