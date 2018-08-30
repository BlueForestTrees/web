<template>
    <g @mouseover="onFocus()" @mouseleave="disFocus()">
        <ellipse :cx="coor.x" :cy="coor.y" :rx="coor.r*coef" :ry="coor.r*coef" :fill="colorFocus" :opacity="opacity"/>
    </g>
</template>

<script>
    export default {
        name: 'svg-bush-leaf',
        props: ['coor', 'center', 'widthTrunk', 'colorBase', 'textItem', 'paramsBush'],
        data: function() {
            return {
                fontSize: 0,
                colorFocus: this.paramsBush.colorLeaf,
                opacity: 0.5,
                coef: this.paramsBush.radiusCoefEachLeaf,
            }
        },
        methods: {
            onFocus: function() {
                    this.fontSize = 16
                    this.colorFocus = this.colorBase
                    this.opacity = 1
            },
            disFocus: function() {
                    this.fontSize = 0
                    this.colorFocus = paramsBush.colorLeaf
                    this.opacity = 0.5         
            },
        },
    } 
</script>