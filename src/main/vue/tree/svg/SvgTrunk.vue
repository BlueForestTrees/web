<template>
    <g>
        <ellipse :cx="ellipse.cx" :cy="ellipse.cy + heightTrunk + 2" 
        :rx="ellipse.rx + 20" :ry="ellipse.ry + 10" 
        @mouseover="onFocus" @mouseleave="disFocus" :fill="colorBase"/>

        <rect :x="position.x" :y="position.y" :width="widthTrunk" :height="heightTrunk" fill="orange"/>

        <ellipse :cx="ellipse.cx" :cy="ellipse.cy + heightTrunk" 
        :rx="ellipse.rx" :ry="ellipse.ry" fill="orange"/>

        <ellipse :cx="ellipse.cx" :cy="ellipse.cy" 
        :rx="ellipse.rx" :ry="ellipse.ry" fill="brown"/> <!-- brown before -->

        <text v-if="tree.trunk" :x="position.x + 30" :y="position.y + heightTrunk" font-size="12" fill="black">{{qtUnitName(tree.trunk)}}</text>
    </g>
</template>

<script>
    import {qtUnitName} from "../../../services/calculations"
    import On from "../../../const/on"
    import {mapActions} from "vuex"
    export default {
        name: 'svg-trunk',
        props: ['tree', 'widthTrunk', 'heightTrunk', 'position'],
        data: function () {
            return {
                colorBase: 'ForestGreen',
            } 
        },
        methods: {
            qtUnitName,
            ...mapActions({close:On.GO_HOME}),
            onFocus: function() {
                    this.colorBase = this.tree.trunk.color
            },
            disFocus: function() {
                    this.colorBase = 'ForestGreen'
            },
        },
        computed: {
            ellipse: function () {
                var objectEllipse = {
                    cx: this.position.x + ( this.widthTrunk/2),
                    cy: this.position.y,
                    rx: this.widthTrunk/2,
                    ry: this.widthTrunk <= 11 ? this.widthTrunk/4 : this.widthTrunk/5,
                }
                return objectEllipse;
            },
        }
    } 
</script>