<template>
    <span>
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
                                    <path :d="`M-100 ${squareAxisY[0]} L-100 -100 L100 -100 L100 ${squareAxisY[1]} Z`" :fill="leftColor" fill-opacity="0.3" :stroke="leftColor" stroke-width="1" stroke-opacity="0.8"/>
                                    <path :d="`M-100 ${squareAxisY[0]} L-100 100 L100 100 L100 ${squareAxisY[1]} Z`" :fill="rightColor" fill-opacity="0.3" :stroke="rightColor" stroke-width="1" stroke-opacity="0.8"/>
                                    <path stroke="black" stroke-width="1" d="M-100 -110 L-100 105" stroke-opacity="1" stroke-dasharray="2,3,2,2,3"/>
                                    <path stroke="black" stroke-width="1" d="M100 -110 L100 105" stroke-opacity="1" stroke-dasharray="2,3,2,2,3"/>
                                    <text v-for="(axis,i) in axises.common.left" :x="squareAxisCoord(i,textRatio).x" :y="squareAxisCoord(i,textRatio).y" fill="black" text-anchor="middle" alignment-baseline="central">{{axis.name}}</text>
                                </svg>
                            </span>
                            <span v-else="commonAxisesCount > 2">
                                <svg viewBox="-200 -200 400 400">
                                        <path v-for="i in commonAxisesCount" stroke="grey" stroke-width="0.5" :d="radialLineD(i,1.1)" stroke-opacity="0.6" stroke-dasharray="10,5,5,5,10"/>
                                        <path :d="radialAxisD(axises.common.left)" :fill="leftColor" fill-opacity="0.3" :stroke="leftColor" stroke-width="1" stroke-opacity="0.8"/>
                                        <path :d="radialAxisD(axises.common.right)" :fill="rightColor" fill-opacity="0.3" :stroke="rightColor" stroke-width="1" stroke-opacity="0.8"/>
                                        <text v-for="(axis,i) in axises.common.left" :x="radialAxisCoord(i,textRatio).x" :y="radialAxisCoord(i,textRatio).y" fill="black" text-anchor="middle" alignment-baseline="central">{{axis.name}}</text>
                                </svg>
                            </span>

                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </span>
</template>

<script>
    import {rad, range} from "../../services/calculations";
    import {bezierCommand} from "./bezier";

    export default {
        name: "compare-radar",
        props: ['axises', 'left', 'right', 'leftColor', 'rightColor'],
        data: function () {
            return {
                taille: 100,
                textRatio: 1.3
            }
        },
        computed: {
            commonAxisesCount: function () {
                return this.axises && this.axises.common.left.length && this.axises.common.right.length;
            },
            angleStart: function () {
                return -90;
            },
            angleStep: function () {
                return this.commonAxisesCount < 5 ? 90 : 360 / this.commonAxisesCount;
            },

            squareAxisY: function () {
                const ratios = [];
                for (let i = 0; i < this.commonAxisesCount; i++) {
                    const leftBaseQt = this.axises.common.left[i].baseQt;
                    const rightBaseQt = this.axises.common.right[i].baseQt;
                    const leftRatio = leftBaseQt / (leftBaseQt + rightBaseQt);
                    ratios.push(-this.taille + leftRatio * 2 * this.taille);
                }
                return ratios;
            }
        },
        methods: {
            range,
            axisAngle: function (i) {
                return this.angleStart + this.angleStep * i;
            },
            radialAxisCoord: function (i, ratio) {
                ratio = ratio || 1;
                const angle = this.axisAngle(i);
                return {
                    x: Math.round(Math.cos(rad(angle - 90)) * (this.taille * ratio)),
                    y: Math.round(Math.sin(rad(angle - 90)) * (this.taille * ratio))
                };
            },
            radialAxisD: function (a) {
                const points = [];
                for (let i = 0; i < a.length; i++) {
                    points.push(this.radialAxisCoord(i, a[i].ratio));
                }
                points.unshift(points[points.length - 1]);
                points.push(points[1]);
                const d = [`M${points[0].x} ${points[0].y}`];
                for (let i = 1; i < points.length-1; i++) {
                    d.push(bezierCommand(i, points));
                }
                d.push("z");
                return d.join(" ");
            },
            radialLineD: function (i, ratio) {
                const p = this.radialAxisCoord(i, ratio);
                return `M0 0 ${p.x} ${p.y}`;
            },

            squareAxisCoord: function (i, ratio) {
                ratio = ratio || 1;
                return {
                    x: -100 + 2 * i * this.taille,
                    y: -this.taille * ratio
                };
            }
        }
    }
</script>