<template>
    <v-layout row wrap>
        <v-flex><axis-list :axises="axises.left" :name="left.trunk.name" :color="leftColor"/></v-flex>
        <!--<v-flex><axis-list :axises="axises.common.left" :name="left.trunk.name" :color="leftColor"/></v-flex>-->
        <!--<v-flex><axis-list :axises="axises.common.right" :name="right.trunk.name" :color="rightColor"/></v-flex>-->
        <v-flex><axis-list :axises="axises.right" :name="right.trunk.name" :color="rightColor"/></v-flex>
    </v-layout>
</template>

<script>
    import AxisList from "../common/AxisList"
    export default {
        name: "compare-table",
        components: {AxisList},
        props:['axises','left','right', 'leftColor', 'rightColor']
    }
</script>