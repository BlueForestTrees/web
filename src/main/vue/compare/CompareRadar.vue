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
                                    <text v-for="(axis,i) in axises.common.left" :x="squareAxisCoord(i,textRatio).x" :y="squareAxisCoord(i,textRatio).y" :style="{fill:'#696955'}" text-anchor="middle" alignment-baseline="central">{{axis.name}}</text>
                                </svg>
                    </span>
                    <span v-else="commonAxisesCount > 2">
                                <svg viewBox="-200 -200 400 500">
                                    <!--Légendes-->
                                    <g transform="translate(-197 -200)">
                                        <g :style="{cursor: 'pointer'}" @click="goTree(left)">
                                            <circle :fill="leftColor" fill-opacity="0.05" :stroke="leftColor" stroke-width="1" stroke-opacity="0.8" r="20" cx="30" cy="30"></circle>
                                            <text x="55" y="30" alignment-baseline="central">{{left.trunk.name}}</text>
                                        </g>

                                        <g :style="{cursor: 'pointer'}" @click="goTree(right)">
                                            <circle :fill="rightColor" fill-opacity="0.05" :stroke="rightColor" stroke-width="1" stroke-opacity="0.8" r="20" cx="30" cy="80"></circle>
                                            <text x="55" y="80" alignment-baseline="central">{{right.trunk.name}}</text>
                                        </g>

                                        <text x="200" y="320" alignment-baseline="central" text-anchor="middle" :style="{fill:'#696955'}">{{subtitle}}</text>
                                    </g>

                                    <!--rayons-->
                                    <path v-for="i in commonAxisesCount" stroke="grey" stroke-width="0.2" :d="radialLineD(i,1.01)" stroke-opacity="1" stroke-dasharray="0,90,10"></path>

                                    <!--Lignes d'axes-->
                                    <path :fill="leftColor" fill-opacity="0.05" :stroke="leftColor" stroke-width="1" stroke-opacity="0.8">
                                        <animate ref="animLeftLine" attributeName="d" attributeType="XML" :from="previousLines && previousLines.left" :to="lines.left" dur=".25s" fill="freeze"></animate>
                                    </path>
                                    <path :fill="rightColor" fill-opacity="0.05" :stroke="rightColor" stroke-width="1" stroke-opacity="0.8">
                                        <animate ref="animRightLine" attributeName="d" attributeType="XML" :from="previousLines && previousLines.right" :to="lines.right" dur=".25s" fill="freeze"></animate>
                                    </path>

                                    <!--parts cliquables-->
                                    <path v-for="(n,i) in commonAxisesCount" fill="green" :d="radialTriangleD(i,1.05)" stroke-width="1" stroke-opacity="0.8" :fill-opacity="curI === i ? 0.2 : 0" @click="curI = i" @mouseover="curI = i"></path>

                                </svg>
                            </span>

                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {qtUnitName, rad, range, shadeColor} from "../../services/calculations"
    import On from "../../const/on"
    import {mapActions} from "vuex"

    export default {
        name: "compare-radar",
        props: ['axises', 'left', 'right', 'leftColor', 'rightColor'],
        data: function () {
            return {
                taille: 100,
                textRatio: 1.3,
                previousLines: null,
                curI: null
            }
        },
        watch: {
            lines(c, old) {
                this.previousLines = old
                this.$refs.animLeftLine.beginElement()
                this.$refs.animRightLine.beginElement()
            }
        },
        computed: {
            subtitle: function () {
                if (this.curI === null) {
                    return "Survolez le graphique"
                } else {
                    return this.axises.common[this.curI].left.name
                }
            },
            commonAxisesCount: function () {
                return this.axises && this.axises.common && this.axises.common.length
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
                    const leftBaseQt = this.axises.common[i].left.baseQt
                    const rightBaseQt = this.axises.common[i].right.baseQt
                    const leftRatio = leftBaseQt / (leftBaseQt + rightBaseQt)
                    ratios.push(-this.taille + leftRatio * 2 * this.taille)
                }
                return ratios
            },
            lines: function () {
                return this.commonAxisesCount && this.radialAxisD(this.axises.common)
            }
        },
        methods: {
            range, qtUnitName, shadeColor,
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
            radialAxisD: function (a) {
                const nbPoints = a.length
                const leftPoints = []
                const rightPoints = []
                for (let i = 0; i < nbPoints; i++) {
                    leftPoints.push(this.radialAxisCoord(i, a[i].left.ratio))
                    rightPoints.push(this.radialAxisCoord(i, a[i].right.ratio))
                }
                const ld = [`M${leftPoints[0].x} ${leftPoints[0].y}`]
                const rd = [`M${rightPoints[0].x} ${rightPoints[0].y}`]
                for (let i = 1; i < nbPoints; i++) {
                    ld.push(`${leftPoints[i].x} ${leftPoints[i].y}`)
                    rd.push(`${rightPoints[i].x} ${rightPoints[i].y}`)
                }
                ld.push("z")
                rd.push("z")
                return {left: ld.join(" "), right: rd.join(" ")}
            },
            radialLineD: function (i, ratio) {
                const p = this.radialAxisCoord(i, ratio)
                return `M0 0 ${p.x} ${p.y}`
            },
            radialTriangleD: function (i, ratio) {
                const tailleTriangle = 0.5
                const p1 = this.radialAxisCoord(i - tailleTriangle, ratio)
                const p2 = this.radialAxisCoord(i + tailleTriangle, ratio)
                return `M0 0 ${p1.x} ${p1.y} ${p2.x} ${p2.y} z`
            },

            squareAxisCoord: function (i, ratio) {
                ratio = ratio || 1
                return {
                    x: -100 + 2 * i * this.taille,
                    y: -this.taille * ratio
                }
            },
            ...mapActions({
                goTree: On.GO_TREE,
            })
        }
    }
</script>