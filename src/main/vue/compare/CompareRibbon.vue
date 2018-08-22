<template>
    <v-card>
        <v-container fluid grid-list-md>
            <v-layout row wrap>
                <v-flex xs3>
                    <svg :viewBox="viewbox" v-if="lines" preserveAspectRatio="none" height="100%" width="100%">
                        <path :d="lines.left" :fill="leftColor" fill-opacity="0.05" :stroke="leftColor" stroke-width="1" stroke-opacity="0.5"></path>
                        <path :d="lines.right" :fill="rightColor" fill-opacity="0.05" :stroke="rightColor" stroke-width="1" stroke-opacity="0.5"></path>
                    </svg>
                </v-flex>
                <v-flex xs9>
                    <v-list dense>
                        <v-list-tile avatar :key="item.left.name" v-for="item in axises.common">
                            {{item.left.name}}
                        </v-list-tile>
                    </v-list>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script>
    
    import {qtUnitName} from "../../services/calculations"

    const width = 100
    export default {
        name: "compare-ribbon",
        props: ['axises', 'left', 'right', 'leftColor', 'rightColor'],
        data: function () {
            return {
                lineHeight: 30
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
                return `0 0 ${width} ${this.height}`
            },
            lines: function () {
                if (this.axisCount > 0) {
                    const ld = [`M0 ${this.height} L0 0`]
                    const rd = [`M${width} ${this.height} L${width} 0`]
                    for (let i = 0; i < this.axises.common.length; i++) {
                        let lratio = this.axises.common[i].left.ratio
                        ld.push(`L${lratio * width} ${i * this.lineHeight} L${lratio * width} ${(1 + i) * this.lineHeight}`)
                        rd.push(`L${lratio * width} ${i * this.lineHeight} L${lratio * width} ${(1 + i) * this.lineHeight}`)
                    }
                    ld.push("Z")
                    rd.push("Z")
                    return {left: ld.join(" "), right: rd.join(" ")}
                }
            },
        },
        methods:{
            qtUnitName
        }
    }
</script>