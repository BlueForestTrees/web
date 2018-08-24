<template>
    <v-layout column>
        <TreeHead :tree="left" @close="" :bg-color="leftColor" no-close @nav="goTree(left)" :style="{cursor: 'pointer'}"/>
        <svg :viewBox="viewbox" v-if="lines" @mouseout="curI = null">

            <!--GRAPHIQUE-->
            <g>
                <path :d="lines.left" :fill="leftColor"></path>
                <path :d="lines.right" :fill="rightColor"></path>
            </g>

            <g>
                <template v-for="(axis,i) in axises.common">
                    <!--LISTES DES NOM D'AXES-->
                    <text alignment-baseline="middle" :x="5+gwidth" :y="(0.5+i)*lineHeight" :style="{fill:textColor}">{{axis.left.name}}</text>

                    <!--SELECTION-->
                    <rect fill="green" x="0" :y="i*lineHeight" :width="gwidth*4" :height="lineHeight"
                          stroke-width="1" stroke-opacity="0.8" :fill-opacity="curI === i ? 0.1 : 0" @click="curI = i" @mouseover="curI = i"></rect>
                    <g v-if="curI === i">
                        <text alignment-baseline="middle" :x="border" :y="(0.5+i)*lineHeight" :font-size="9-(1.1*(qtUnit(axis.left).length-9))" :style="{fill:darkTextColor, pointerEvents:'none'}">{{qtUnit(axis.left)}}</text>
                        <text alignment-baseline="middle" text-anchor="end" :x="gwidth-border" :font-size="9-(1.1*(qtUnit(axis.right).length-9))" :y="(0.5+i)*lineHeight" :style="{fill:darkTextColor, pointerEvents:'none'}">{{qtUnit(axis.right)}}</text>
                    </g>
                </template>
            </g>
        </svg>
        <span v-else>Rien à Comparer!</span>
        <TreeHead :tree="right" @close="" :bg-color="rightColor" no-close @nav="goTree(right)" :style="{cursor: 'pointer'}"/>
    </v-layout>

</template>

<script>

    import {qtUnit, shadeColor} from "../../services/calculations"
    import TreeHead from "../tree/TreeHead"
    import On from "../../const/on"
    import {mapActions} from "vuex"

    export default {
        name: "compare-ribbon",
        components: {TreeHead},
        props: ['axises', 'left', 'right'],
        data: function () {
            const alpha = 0.85
            const textColor = '#696955'
            return {
                border: 2,
                lineHeight: 30,
                gwidth: 100,
                width: 400,
                curI: null,
                leftColor: shadeColor('#00ACC1', alpha),
                rightColor: shadeColor('#D81B60', alpha),
                textColor,
                darkTextColor: shadeColor(textColor, -0.15)
            }
        },
        computed: {
            axisCount: function () {
                return this.axises && this.axises.common && this.axises.common.length
            },
            gheight: function () {
                return this.axisCount * this.lineHeight
            },
            viewbox: function () {
                return `0 0 ${this.width} ${this.gheight}`
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
            shadeColor, qtUnit,
            ...mapActions({goTree: On.GO_TREE})
        }
    }
</script>