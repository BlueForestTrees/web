<template>
    <svg v-if="defined" viewBox="-10 0 120 30" preserveAspectRatio="xMidYMid slice">
        <line :x1="middle" y1="0" :x2="middle" y2="30" stroke-width="0.5" stroke="grey"></line>
        <line :x1="leftX" y1="15" :x2="rightX" y2="15" stroke-width="2" stroke="#1565c0CC" stroke-linecap="round"></line>
    </svg>
</template>

<script>
    import {notNil} from "../../services/calculations"
    import {initTween} from "../../services/anim"
    import Static from "../mixin/Static"
    import TWEEN from "@tweenjs/tween.js"

    export default {
        name: "CompareBar",
        mixins: [Static],
        props: {
            left: {type: Number},
            right: {type: Number}
        },
        data: () => ({drawnLeftX: 50, drawnRightX: 50}),
        static: () => ({leftEdge: 0, middle: 50, rightEdge: 100}),
        mounted() {
            this.toto = 8
            initTween()
        },
        computed: {
            defined() {
                return notNil(this.left) && notNil(this.right)
            },
            sum() {
                return this.left + this.right
            },
            leftX() {
                return this.middle - (this.middle * this.left / this.sum)
            },
            rightX() {
                return this.middle + (this.middle * this.right / this.sum)
            }
        },
        watch: {
            leftX: {
                immediate: true,
                handler(v) {
                    const current = {v: this.drawnLeftX}
                    new TWEEN.Tween(current)
                        .to({v}, 300)
                        .easing(TWEEN.Easing.Quadratic.Out)
                        .onUpdate(() => {
                            this.drawnLeftX = current.v
                        })
                        .start()
                }
            },
            rightX: {
                immediate: true,
                handler(v) {
                    const current = {v: this.drawnRightX}
                    new TWEEN.Tween(current)
                        .to({v}, 300)
                        .easing(TWEEN.Easing.Quadratic.Out)
                        .onUpdate(() => {
                            this.drawnRightX = current.v
                        })
                        .start()
                }
            },
        }
    }
</script>