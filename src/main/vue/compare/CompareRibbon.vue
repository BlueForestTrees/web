<template>
    <v-container v-if="lines">
        <v-card style="max-width: 60em">
            <v-card-title>
                <tree-head :tree="left" @close="" :bg-color="leftColor" no-close no-icon @nav="goTree(left)" :style="{cursor: 'pointer'}"/>
            </v-card-title>

            <v-card-text style="padding-top:0;padding-bottom:0">
                <svg :viewBox="viewbox" style="min-width: 40em">
                    <!--GRAPHIQUE-->
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
            </v-card-text>

            <v-card-title>
                <tree-head :tree="right" @close="" :bg-color="rightColor" no-close no-icon @nav="goTree(right)" :style="{cursor: 'pointer'}"/>
            </v-card-title>
        </v-card>
    </v-container>

</template>

<script>

    import {equiv, qtUnit, shadeColor} from "../../services/calculations"
    import TreeHead from "../tree/TreeHead"
    import On from "../../const/on"
    import {mapActions} from "vuex"

    export default {
        name: "compare-ribbon",
        components: {TreeHead},
        props: ['axises', 'left', 'right'],
        data: function () {
            const alpha = 0.7
            const textColor = '#696955'
            return {
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
            shadeColor, qtUnit, equiv,
            ...mapActions({goTree: On.GO_TREE})
        }
    }
</script>