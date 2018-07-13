<template>
    <span>
        <v-container>
            <v-layout>
                <v-flex>
                    <v-card>
                        <svg viewBox="-200 -200 400 400">

                            <path v-for="i in commonAxisesCount" stroke="grey" stroke-width="0.5" :d="doudou(i,1.1)" stroke-opacity="0.6" stroke-dasharray="10,5,5,5,10"/>

                            <path :d="axisD(axises.common.left)" :fill="leftColor" fill-opacity="0.3"
                                  :stroke="leftColor" stroke-width="1" stroke-opacity="0.8"/>
                            <path :d="axisD(axises.common.right)" :fill="rightColor" fill-opacity="0.3"
                                  :stroke="rightColor" stroke-width="1" stroke-opacity="0.8"/>

                            <text v-for="(axis,i) in axises.common.left" :x="axisCoord(i,textRatio).x" :y="axisCoord(i,textRatio).y" fill="black" text-anchor="middle" alignment-baseline="central">{{axis.name}}</text>

                        </svg>
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
                return this.axises && this.axises.common.left.length;
            },
            angleStart: function () {
                return -90;
            },
            angleStep: function () {
                return this.commonAxisesCount < 5 ? 90 : 360 / this.commonAxisesCount;
            }
        },
        methods: {
            range,
            axisAngle: function (i) {
                return this.angleStart + this.angleStep * i;
            },
            axisCoord: function (i, ratio) {
                ratio = ratio || 1;
                const angle = this.axisAngle(i);
                return {
                    x: Math.round(Math.cos(rad(angle - 90)) * (this.taille * ratio)),
                    y: Math.round(Math.sin(rad(angle - 90)) * (this.taille * ratio))
                };
            },
            axisD: function (a) {
                const points = [];
                for (let i = 0; i < a.length; i++) {
                    points.push(this.axisCoord(i, a[i].ratio));
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
            doudou: function(i, ratio){
                const p = this.axisCoord(i,ratio);
                return `M0 0 ${p.x} ${p.y}`;
            }
        }
    }
</script>