<template>
    <svg :viewBox="viewbox" class="ma-4" style="max-height: 30em">
        <!--CERCLES-->
        <defs>
            <clipPath id="rectRatio">
                <rect x="0" y="0" :width="width" :height="width*leftRatio"></rect>
            </clipPath>
        </defs>
        <circle :cx="width*0.5" :cy="width*0.5" :r="width*0.5" :fill="rightColor"></circle>
        <circle :cx="width*0.5" :cy="width*0.5" :r="width*0.5" :fill="leftColor" clip-path="url(#rectRatio)"></circle>

        <!--POURCENTAGES-->
        <text v-if="leftPercent > 5"  :x="width*0.5" font-size="25" text-anchor="middle" alignment-baseline="central" :y="width*leftRatio*0.5" :style="{fill:leftTextColor}">{{leftPercent}}%</text>

        <text v-else                  :x="width*0.5" font-size="25" text-anchor="middle" alignment-baseline="central" :y="25" :style="{fill:rightTextColor}">{{leftPercent}}%</text>

        <text v-if="rightPercent > 5" :x="width*0.5" font-size="25" text-anchor="middle" alignment-baseline="central" :y="width - (width*rightRatio*0.5)" :style="{fill:rightTextColor}">{{rightPercent}}%</text>
    </svg>
</template>

<script>

    import {equiv, overcolor, qtUnit, shadeColor} from "../../services/calculations"
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import {rightRatio} from "../../services/axis"

    export default {
        name: "compare-ribbon",
        props: ['axises', 'leftColor', 'rightColor'],
        data: function () {
            const alpha = 0.7
            return {
                border: 2,
                width: 550,
                leftLightColor: shadeColor('#00ACC1', alpha),
                rightLightColor: shadeColor('#D81B60', alpha),
            }
        },
        computed: {
            leftPercent: function () {
                return Math.round(this.leftRatio * 100)
            },
            rightPercent: function () {
                return Math.round(this.rightRatio * 100)
            },
            leftTextColor: function () {
                return overcolor(this.leftColor)
            },
            rightTextColor: function () {
                return overcolor(this.rightColor)
            },
            leftRatio: function () {
                return 1 - this.rightRatio
            },
            rightRatio: function () {
                return this.axises && rightRatio(this.axises)
            },
            viewbox: function () {
                return `0 0 ${this.width} ${this.width}`
            }
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