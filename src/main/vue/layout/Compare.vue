<template>
    <v-container fluid grid-list-md class="grey lighten-4">
        <v-layout>

            <axis-list :axises="commonLeftRightAxises.left" :name="leftTree.trunk.name" :color="namedColors[0]"/>

            <v-card style="max-height: 100%;width: 100%;">
                <div class="leftRightRadar" @click.native="base = $event" style="height: 100%;width: 100%;"/>
            </v-card>

            <axis-list :axises="commonLeftRightAxises.right" :name="rightTree.trunk.name" :color="namedColors[1]"/>

        </v-layout>
    </v-container>

</template>

<script>
    import Do from "../../const/do";
    import {mapMutations} from 'vuex';
    import {applyCoef, buildAxises, coefToBase, insertRatios, separate} from "../../services/axis";
    import AxisList from "../common/AxisList";
    import {cloneDeep} from 'lodash';
    import {baseQt} from "trees-units";

    export default {
        components: {
            AxisList
        },
        name: 'compare',
        props: ['leftTree', 'rightTree'],
        methods: {
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
                colors: ["#00A0B0", "#CC333F"]
            }
        },
        computed: {
            leftAxises: function () {
                return buildAxises(this.leftTree)
            },
            rightAxises: function () {
                return buildAxises(this.rightTree)
            },

            commonLeftRightAxises: function () {
                const data = separate(cloneDeep(this.leftAxisWithCoef), cloneDeep(this.rightAxisWithCoef));
                insertRatios(data.common, baseQt);
                return data;
            },

            rightCoef: function () {
                return coefToBase(this.base, this.rightAxises);
            },
            leftCoef: function () {
                return coefToBase(this.base, this.leftAxises);
            },
            leftAxisWithCoef: function () {
                return applyCoef(cloneDeep(this.leftAxises), this.leftCoef);
            },
            rightAxisWithCoef: function () {
                return applyCoef(cloneDeep(this.rightAxises), this.rightCoef);
            },

        },
        mounted: function () {
            this.draw(this.commonLeftRightAxises);
        }
    }
</script>