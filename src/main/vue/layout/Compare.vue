<template>
    <v-container fluid grid-list-md class="grey lighten-4">
        <v-layout v-if="base">
            <v-flex>
                Base: {{qtUnitName(this.base)}}
            </v-flex>
        </v-layout>
        <v-layout>
            <axis-list :axises="axises.left" :name="leftTree.trunk.name" :color="namedColors[0]"/>

            <axis-list :axises="axises.common.left" :name="leftTree.trunk.name" :color="namedColors[0]"/>
            <axis-list :axises="axises.common.right" :name="rightTree.trunk.name" :color="namedColors[1]"/>

            <axis-list :axises="axises.right" :name="rightTree.trunk.name" :color="namedColors[1]"/>
        </v-layout>
    </v-container>

</template>

<script>
    import Do from "../../const/do";
    import {mapMutations} from 'vuex';
    import {applyCoef, buildAxises, coefToBase, separate} from "../../services/axis";
    import AxisList from "../common/AxisList";
    import {cloneDeep} from 'lodash';
    import {baseQt} from "trees-units";
    import {qtUnitName} from "../../services/calculations";

    export default {
        components: {
            AxisList
        },
        name: 'compare',
        props: ['leftTree', 'rightTree'],
        methods: {
            qtUnitName,
            ...mapMutations({"close": Do.CLOSE_COMPARE_TO}),
            draw: function (data) {
                console.log(data);
                // console.log({
                //     selectAxis: this.changeAxis,
                //     id: ".leftRightRadar",
                //     data: [data.common.left, data.common.right],
                //     selectedAxis: this.axis,
                //     options: {color: this.colors}
                // });
            }
        },
        data: function () {
            return {
                namedColors: ["cyan darken1", "pink darken1"],
                colors: ["#00A0B0", "#CC333F"],
                base: null
            }
        },
        computed: {
            axises: function () {
                const data = separate(cloneDeep(buildAxises(this.leftTree)), cloneDeep(buildAxises(this.rightTree)));
                this.base = data.common.left[0];

                if (this.base) {
                    const leftCoef = coefToBase(this.base, data.common.left);
                    if (leftCoef !== 1) {
                        applyCoef(data.left, leftCoef);
                        applyCoef(data.common.left, leftCoef);
                    }

                    const rightCoef = coefToBase(this.base, data.common.right);
                    if (rightCoef !== 1) {
                        applyCoef(data.right, rightCoef);
                        applyCoef(data.common.right, rightCoef);
                    }
                }

                return data;
            },


            //insertRatios(data.common, baseQt);
        },
        mounted: function () {
            this.draw(this.axises);
        }
    }
</script>