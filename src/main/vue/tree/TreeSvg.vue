<template>
    <v-layout justify-center align-center>
        <svg :width="params.widthTrunk + 500" :height="500 + heightTrunk" viewbox="0 0 1000 800" v-if="tree">
            <rect width="100%" height="100%" fill="pink"/>
            <svg-trunk :tree="tree" :widthTrunk="params.widthTrunk" :heightTrunk="heightTrunk" :position="params.treePosition"/>
            <svg-bush :tree="tree" :widthTrunk="params.widthTrunk" :heightTrunk="heightTrunk" :position="params.treePosition" :paramsBush="paramsBush"/>
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
        data: function () {
            return {
                params: {
                    treePosition: {
                        x: 145,
                        y:275,
                    },
                    widthTrunk: 20,
                },
                paramsBush: {
                    radiusFullBush: 40,
                    radiusCoefEachLeaf: 2,
                    colorLeaf : "SpringGreen",
                }
            }
        },
        computed: {
            heightTrunk: function () {
                return this.tree.trunk ? Math.log(1+this.tree.trunk.quantity.bqt) * 10 : 0;
            },
        }
    } 
</script>