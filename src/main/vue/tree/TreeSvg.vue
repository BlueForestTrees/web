<template>
    <v-layout justify-center align-center>
        <svg :width="widthTrunk + 300" :height="300 + heightTrunk" viewbox="0 0 1000 800" v-if="tree">
            <!-- <rect width="100%" height="100%" fill="pink"/> -->
            <svg-trunk :tree="tree" :widthTrunk="widthTrunk" :heightTrunk="heightTrunk" :position="position"/>
            <svg-bush :tree="tree" :widthTrunk="widthTrunk" :heightTrunk="heightTrunk" :position="position"/>
        </svg>
    </v-layout>
</template>

<script>
    import SvgTrunk from "./svg/SvgTrunk"    
    import SvgBush from "./svg/SvgBush"
    import {qtUnitName} from "../../services/calculations"
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import {qtUnitCoef, unit} from "unit-manip"

    export default {
        name: 'tree-svg',
        components: {
            SvgTrunk,
            SvgBush,
        },
        props: ['tree'],
        methods: {
            qtUnitName,
            ...mapActions({close:On.GO_HOME}),
        },
        computed: {
            heightTrunk: function () {
                return this.tree.trunk ? Math.log(1+this.tree.trunk.quantity.bqt) * 10 : 0;
            },
            widthTrunk: function() {
                var w = 10 //Math.log(1+unit(this.tree.trunk.quantity.unit).coef) * 3.5
                return  w = (w > 10) ? w : 10;
            },
            position: function() {
                var objectPosition = {
                    x: 145,
                    y: 175,
                }
                return objectPosition;
            }
        }
    } 
</script>