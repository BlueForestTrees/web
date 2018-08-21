<template>
    <v-card>
        <v-container fluid grid-list-md>
            <v-layout row wrap>
                <v-flex xs3>
                    <svg :viewBox="viewbox" v-if="lines">
                        <path :d="lines.left" :fill="leftColor" fill-opacity="0.05" :stroke="leftColor" stroke-width="1" stroke-opacity="0.5"></path>
                        <path :d="lines.right" :fill="rightColor" fill-opacity="0.05" :stroke="rightColor" stroke-width="1" stroke-opacity="0.5"></path>
                    </svg>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script>
    
    const width = 100
    export default {
        name: "compare-ribbon",
        props: ['axises', 'left', 'right', 'leftColor', 'rightColor'],
        data: function () {
            return {
                lineHeight: 10
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
        }
    }
</script>