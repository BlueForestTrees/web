<template>
    <svg :viewBox="viewbox" class="ma-4" style="min-width: 40em;min-height:20em;">
        <g>
            <!--FORMES-->
            <path :d="lines.right" :fill="rightColor"></path>
            <path :d="lines.left" :fill="leftColor"></path>
        </g>
        <g>
            <template v-for="(axis,i) in axises">
                <g :key="axis._id">
                    <!--LISTES DES NOM D'AXES-->
                    <text alignment-baseline="middle" :x="5+gwidth" :y="(0.5+i)*lineHeight"
                          :style="{fill:textColor}">{{axis.left.name}} {{curI === i ? equiv(axis.left) : ""}}
                    </text>

                    <!-- POINTILLES-->
                    <line :x1="0" :x2="gwidth" :y1="i*lineHeight" :y2="i*lineHeight" stroke="grey"
                          stroke-width="0.4" stroke-opacity="0.3" stroke-dasharray="5, 10"></line>
                    <line :x1="gwidth" :x2="width" :y1="i*lineHeight" :y2="i*lineHeight" stroke="grey"
                          stroke-width="0.4" stroke-opacity="0.3"></line>

                    <!--SELECTION-->
                    <rect fill="primary" x="0" :y="i*lineHeight" :width="width" :height="lineHeight"
                          stroke-width="1" stroke-opacity="0.8" :fill-opacity="curI === i ? 0.1 : 0"
                          @click="curI = i" @mouseover="curI = i"></rect>
                    <g v-if="curI === i">
                        <text alignment-baseline="middle" :x="border" :y="(0.5+i)*lineHeight"
                              :font-size="9-(1.1*(qtUnit(axis.left).length-9))"
                              :style="{fill:leftTextColor, pointerEvents:'none'}">{{qtUnit(axis.left)}}
                        </text>
                        <text alignment-baseline="middle" text-anchor="end" :x="gwidth-border"
                              :font-size="9-(1.1*(qtUnit(axis.right).length-9))" :y="(0.5+i)*lineHeight"
                              :style="{fill:rightTextColor, pointerEvents:'none'}">{{qtUnit(axis.right)}}
                        </text>
                    </g>
                </g>
            </template>
        </g>
    </svg>
</template>

<script>

    import {equiv, overcolor, qtUnit, shadeColor} from "../../services/calculations"
    import On from "../../const/on"
    import {mapActions} from "vuex"

    export default {
        name: "compare-cams",
        props: ['axises', 'leftColor', 'rightColor'],
        data: function () {
            const alpha = 0.7
            const textColor = '#696955'
            return {
                border: 2,
                lineHeight: 25,
                gwidth: 100,
                width: 550,
                curI: 0,
                leftLightColor: shadeColor('#00ACC1', alpha),
                rightLightColor: shadeColor('#D81B60', alpha),
                textColor,
                darkTextColor: shadeColor(textColor, -0.35),
                previousLVB: null
            }
        },
        watch: {
            viewbox(c, old) {
                this.previousLVB = old
                this.$refs.animListViewbox && this.$refs.animListViewbox.beginElement()
            }
        },
        computed: {
            leftTextColor: function () {
                return overcolor(this.leftColor)
            },
            rightTextColor: function () {
                return overcolor(this.rightColor)
            },
            axisCount: function () {
                return this.axises && this.axises.length
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

                    let initialPoint = `L${this.axises[0].left.ratio * this.gwidth} 0`
                    ld.push(initialPoint)
                    rd.push(initialPoint)

                    for (let i = 0; i < this.axises.length; i++) {
                        let lratio = this.axises[i].left.ratio
                        let draw = `L${lratio * this.gwidth} ${(0.5 + i) * this.lineHeight}`
                        ld.push(draw)
                        rd.push(draw)
                    }

                    let finalPoint = `L${this.axises[this.axises.length - 1].left.ratio * this.gwidth} ${this.gheight}`
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