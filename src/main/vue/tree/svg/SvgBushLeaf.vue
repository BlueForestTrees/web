<template>
    <g @mouseover="onFocus()" @mouseleave="disFocus()">
        <ellipse :cx="coor.x" :cy="coor.y" :rx="coor.r" :ry="coor.r" :fill="colorFocus" :opacity="opacity"/>
        <text :x="coor.x + 10" :y="coor.y" fill="black" :font-size="fontSize">{{ textItem }}</text>
    </g>
</template>

<script>
    export default {
        name: 'svg-bush-leaf',
        props: ['coor', 'center', 'widthTrunk', 'colorBase', 'textItem'],
        data: function() {
            return {
                fontSize: 0,
                colorFocus: "red",
                opacity: 1,
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
                    this.colorFocus = this.colorBase
                    this.opacity = 1         
            },
        },
    } 
</script>