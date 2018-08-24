<template>
    <v-layout column>
        <TreeHead :tree="left" @close=""/>
        <TreeHead :tree="right" @close=""/>
        <v-layout row wrap>
            <v-flex>
                <svg :viewBox="viewbox" v-if="lines">
                    <g>
                        <path :d="lines.left" :fill="leftColor" fill-opacity="0.06" :stroke="leftColor" stroke-this.width="0.5" stroke-opacity="0.3"></path>
                        <path :d="lines.right" :fill="rightColor" fill-opacity="0.06" :stroke="rightColor" stroke-this.width="0.5" stroke-opacity="0.3"></path>
                    </g>
                    <g>
                        <text v-for="(axis,i) in axises.common" alignment-baseline="middle" :x="5+width" :y="(0.5+i)*lineHeight" :style="{fill:'#696955'}">{{axis.left.name}}</text>
                    </g>
                    <g>
                        <rect v-for="(axis,i) in axises.common" fill="green" x="0" :y="i*lineHeight" :width="width*4" :height="lineHeight"
                              stroke-width="1" stroke-opacity="0.8" :fill-opacity="curI === i ? 0.1 : 0" @click="curI = i" @mouseover="curI = i"></rect>
                    </g>
                </svg>
            </v-flex>
        </v-layout>

    </v-layout>

</template>

<script>

    import {qtUnitName} from "../../services/calculations"
    import TreeHead from "../tree/TreeHead"

    export default {
        name: "compare-ribbon",
        components: {TreeHead},
        props: ['axises', 'left', 'right', 'leftColor', 'rightColor'],
        data: function () {
            return {
                lineHeight: 30,
                width: 100,
                curI: null
            }
        },
        computed: {
            axisCount: function () {
                return this.axises && this.axises.common && this.axises.common.length
            },
            height: function () {
                return this.axisCount * this.lineHeight
            },
            viewbox: function () {
                return `0 0 ${this.width * 4} ${this.height}`
            },
            lines: function () {
                if (this.axisCount > 0) {
                    const ld = [`M0 ${this.height} L0 0`]
                    const rd = [`M${this.width} ${this.height} L${this.width} 0`]
                    for (let i = 0; i < this.axises.common.length; i++) {
                        let lratio = this.axises.common[i].left.ratio
                        ld.push(`L${lratio * this.width} ${i * this.lineHeight} L${lratio * this.width} ${(1 + i) * this.lineHeight}`)
                        rd.push(`L${lratio * this.width} ${i * this.lineHeight} L${lratio * this.width} ${(1 + i) * this.lineHeight}`)
                    }
                    ld.push("Z")
                    rd.push("Z")
                    return {left: ld.join(" "), right: rd.join(" ")}
                }
            },
        },
        methods: {
            qtUnitName
        }
    }
</script>