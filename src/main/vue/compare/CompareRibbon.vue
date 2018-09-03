<template>
    <v-container v-if="lines" pt-0>
        <v-card>
            <v-layout row><v-spacer/><v-icon class="mr-1 mt-1" large @click="zoom = !zoom">{{zoom ? 'pie_chart' : 'list'}}</v-icon></v-layout>
            <svg v-if="zoom" :viewBox="listViewbox" class="ma-4" style="min-width: 40em;min-height:20em">
                <g>
                    <path :d="lines.right" :fill="rightLightColor" :stroke="rightColor" stroke-width="0.4"></path>
                    <path :d="lines.left" :fill="leftLightColor" :stroke="leftColor" stroke-width="0.4"></path>
                </g>
                <g>
                    <template v-for="(axis,i) in axises.common">
                        <!--LISTES DES NOM D'AXES-->
                        <text alignment-baseline="middle" :x="5+gwidth" :y="(0.5+i)*lineHeight" :style="{fill:textColor}">{{axis.left.name}} {{curI === i ? equiv(axis.left) : ""}}</text>

                        <!-- POINTILLES-->
                        <line :x1="0" :x2="gwidth" :y1="i*lineHeight" :y2="i*lineHeight" stroke="grey" stroke-width="0.4" stroke-opacity="0.3" stroke-dasharray="5, 10" ></line>
                        <line :x1="gwidth" :x2="width" :y1="i*lineHeight" :y2="i*lineHeight" stroke="grey" stroke-width="0.4" stroke-opacity="0.3"></line>

                        <!--SELECTION-->
                        <rect fill="green" x="0" :y="i*lineHeight" :width="width" :height="lineHeight" stroke-width="1" stroke-opacity="0.8" :fill-opacity="curI === i ? 0.1 : 0" @click="curI = i" @mouseover="curI = i"></rect>
                        <g v-if="curI === i">
                            <text alignment-baseline="middle" :x="border" :y="(0.5+i)*lineHeight" :font-size="9-(1.1*(qtUnit(axis.left).length-9))" :style="{fill:darkTextColor, pointerEvents:'none'}">{{qtUnit(axis.left)}}</text>
                            <text alignment-baseline="middle" text-anchor="end" :x="gwidth-border" :font-size="9-(1.1*(qtUnit(axis.right).length-9))" :y="(0.5+i)*lineHeight" :style="{fill:darkTextColor, pointerEvents:'none'}">{{qtUnit(axis.right)}}</text>
                        </g>
                    </template>
                </g>
            </svg>
            <svg v-else :viewBox="camViewbox" class="ma-4" style="max-height: 30em">
                <circle :cx="width*0.5" :cy="width*0.5" :r="width*0.5" :fill="leftColor"></circle>
                <circle :cx="width*0.5" :cy="width*0.5" :r="width*0.25" fill="none" :stroke="rightColor" :stroke-width="width*0.5" :stroke-dasharray="camDashArray" :style="`transform-origin: center;transform:rotate(${camAngle}deg);`"></circle>
            </svg>
        </v-card>

            <v-layout row wrap justify-center>
                <v-card class="mb-1 mt-2 pl-2 pr-3" style="border-radius:2em">
                    <tree-head :tree="left" class="my-2" @nav="goTree(left)" :style="{cursor: 'pointer'}"/>
                    <tree-head :tree="right" class="my-2" @nav="goTree(right)" :style="{cursor: 'pointer'}"/>
                </v-card>
            </v-layout>
    </v-container>

</template>

<script>

    import {equiv, qtUnit, shadeColor} from "../../services/calculations"
    import TreeHead from "../tree/TreeHead"
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import {rightRatio} from "../../services/axis"

    export default {
        name: "compare-ribbon",
        components: {TreeHead},
        props: ['axises', 'left', 'right'],
        data: function () {
            const alpha = 0.7
            const textColor = '#696955'
            return {
                zoom: false,
                border: 2,
                lineHeight: 25,
                gwidth: 100,
                width: 550,
                curI: 0,
                leftColor: '#00ACC1',
                rightColor: '#D81B60',
                leftLightColor: shadeColor('#00ACC1', alpha),
                rightLightColor: shadeColor('#D81B60', alpha),
                textColor,
                darkTextColor: shadeColor(textColor, -0.35)
            }
        },
        computed: {
            rightRatio: function(){
                return this.axises && rightRatio(this.axises)
            },
            camAngle: function(){
                return 90 -180*this.rightRatio
            },
            camDashArray: function(){
                const peri = 0.5 * this.width * Math.PI
                return `${peri * this.rightRatio} ${peri}`
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
                    for (let i = 0; i < this.axises.common.length; i++) {
                        let lratio = this.axises.common[i].left.ratio
                        ld.push(`L${lratio * this.gwidth} ${i * this.lineHeight} L${lratio * this.gwidth} ${(1 + i) * this.lineHeight}`)
                        rd.push(`L${lratio * this.gwidth} ${i * this.lineHeight} L${lratio * this.gwidth} ${(1 + i) * this.lineHeight}`)
                    }
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