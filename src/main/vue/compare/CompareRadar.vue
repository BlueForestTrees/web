<template>
        <v-container>
            <v-layout>
                <v-flex>
                    <v-card>
                            <span v-if="commonAxisesCount === 0">
                                pas d'axes en commun!
                            </span>
                            <span v-else-if="commonAxisesCount === 1">
                                un axe en commun
                            </span>
                            <span v-else-if="commonAxisesCount === 2">
                                <svg viewBox="-200 -200 400 400">
                                    <path :d="`M-100 ${squareAxisY[0]} L-100 -100 L100 -100 L100 ${squareAxisY[1]} Z`" :fill="leftColor" fill-opacity="0.3" :stroke="leftColor" stroke-width="1" stroke-opacity="0.8"></path>
                                    <path :d="`M-100 ${squareAxisY[0]} L-100 100 L100 100 L100 ${squareAxisY[1]} Z`" :fill="rightColor" fill-opacity="0.3" :stroke="rightColor" stroke-width="1" stroke-opacity="0.8"></path>
                                    <path stroke="black" stroke-width="1" d="M-100 -110 L-100 105" stroke-opacity="1" stroke-dasharray="2,3,2,2,3"></path>
                                    <path stroke="black" stroke-width="1" d="M100 -110 L100 105" stroke-opacity="1" stroke-dasharray="2,3,2,2,3"></path>
                                    <text v-for="(axis,i) in axises.common.left" :x="squareAxisCoord(i,textRatio).x" :y="squareAxisCoord(i,textRatio).y"
                                          :style="{fill:'#696955'}" text-anchor="middle" alignment-baseline="central">{{axis.name}}</text>
                                </svg>
                            </span>
                            <span v-else="commonAxisesCount > 2">
                                <svg viewBox="-200 -200 400 500">
                                    <g transform="translate(-197 198)">
                                        <circle :fill="leftColor" fill-opacity="0.05" :stroke="leftColor" stroke-width="1" stroke-opacity="0.8"
                                                r="20" cx="30" cy="30"
                                        ></circle>
                                        <text x="55" y="30" alignment-baseline="central">{{axises.right[0].tree}}</text>
                                        <circle :fill="rightColor" fill-opacity="0.05" :stroke="rightColor" stroke-width="1" stroke-opacity="0.8"
                                                r="20" cx="30" cy="80"
                                        ></circle>
                                        <text x="55" y="80" alignment-baseline="central">{{axises.left[0].tree}}</text>
                                        <line x1="-10" y1="0" x2="400" y2="0" fill="none" stroke-width="1" :stroke="shadeColor('#000000',0.7)"></line>
                                    </g>

                                    <path v-for="i in commonAxisesCount" stroke="grey" stroke-width="0.5" :d="radialLineD(i,1.01)" stroke-opacity="0.3" stroke-dasharray="10,5,5,5,10"></path>

                                    <path :fill="leftColor" fill-opacity="0.05" :stroke="leftColor" stroke-width="1" stroke-opacity="0.8">
                                        <animate ref="animLeftLine" attributeName="d" attributeType="XML" :from="previousLeftLine" :to="leftLine" dur=".25s" fill="freeze"></animate>
                                    </path>

                                    <path :fill="rightColor" fill-opacity="0.05" :stroke="rightColor" stroke-width="1" stroke-opacity="0.8">
                                        <animate ref="animRightLine" attributeName="d" attributeType="XML" :from="previousRightLine" :to="rightLine" dur=".25s" fill="freeze"></animate>
                                    </path>

                                    <!--<text @click="clickedOn(axis)" v-for="(axis,i) in axises.common.left" :x="radialAxisCoord(i,textRatio).x" :y="radialAxisCoord(i,textRatio).y"-->
                                          <!--:style="{fill:'#696955',cursor: 'pointer'}" text-anchor="middle" alignment-baseline="central">{{qtUnitName(axis)}}</text>-->
                                </svg>
                            </span>

                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
</template>

<script>
    import {qtUnitName, rad, range, shadeColor} from "../../services/calculations"
    import {bezierCommand} from "./bezier"

    export default {
        name: "compare-radar",
        props: ['axises', 'left', 'right', 'leftColor', 'rightColor'],
        data: function () {
            return {
                taille: 100,
                textRatio: 1.3,
                previousLeftLine: null,
                previousRightLine: null
            }
        },
        watch: {
            leftLine(c, old) {
                this.previousLeftLine = old
                this.$refs.animLeftLine.beginElement()
            },
            rightLine(c, old) {
                this.previousRightLine = old
                this.$refs.animRightLine.beginElement()
            }
        },
        computed: {
            commonAxisesCount: function () {
                return this.axises && this.axises.common.left.length && this.axises.common.right.length
            },
            angleStart: function () {
                return -90
            },
            angleStep: function () {
                return 360 / this.commonAxisesCount
            },
            squareAxisY: function () {
                const ratios = []
                for (let i = 0; i < this.commonAxisesCount; i++) {
                    const leftBaseQt = this.axises.common.left[i].baseQt
                    const rightBaseQt = this.axises.common.right[i].baseQt
                    const leftRatio = leftBaseQt / (leftBaseQt + rightBaseQt)
                    ratios.push(-this.taille + leftRatio * 2 * this.taille)
                }
                return ratios
            },
            leftLine: function () {
                return this.commonAxisesCount && this.radialAxisD(this.axises.common.left)
            },
            rightLine: function () {
                return this.commonAxisesCount && this.radialAxisD(this.axises.common.right)
            }
        },
        methods: {
            range, qtUnitName, shadeColor,
            clickedOn(axis) {
                this.$emit('baseChange', axis)


            },
            axisAngle: function (i) {
                return this.angleStart + this.angleStep * i
            },
            radialAxisCoord: function (i, ratio) {
                ratio = ratio || 1
                const angle = this.axisAngle(i)
                return {
                    x: Math.round(Math.cos(rad(angle - 90)) * (this.taille * ratio)),
                    y: Math.round(Math.sin(rad(angle - 90)) * (this.taille * ratio))
                }
            },
            // radialAxisD: function (a) {
            //     const points = []
            //     for (let i = 0; i < a.length; i++) {
            //         points.push(this.radialAxisCoord(i, a[i].ratio))
            //     }
            //     points.unshift(points[points.length - 1])
            //     points.push(points[1])
            //     const d = [`M${points[0].x} ${points[0].y}`]
            //     for (let i = 1; i < points.length-1; i++) {
            //         d.push(bezierCommand(i, points))
            //     }
            //     d.push("z")
            //     return d.join(" ")
            // },
            radialAxisD: function (a) {
                const points = []
                for (let i = 0; i < a.length; i++) {
                    points.push(this.radialAxisCoord(i, a[i].ratio))
                }
                const d = [`M${points[0].x} ${points[0].y}`]
                for (let i = 1; i < points.length; i++) {
                    d.push(`${points[i].x} ${points[i].y}`)
                }
                d.push("z")
                return d.join(" ")
            },
            radialLineD: function (i, ratio) {
                const p = this.radialAxisCoord(i, ratio)
                return `M0 0 ${p.x} ${p.y}`
            },

            squareAxisCoord: function (i, ratio) {
                ratio = ratio || 1
                return {
                    x: -100 + 2 * i * this.taille,
                    y: -this.taille * ratio
                }
            }
        }
    }
</script>