<template>
    <v-card v-if="axises.length > 0" style="width: 200px">
        <v-card-title><v-flex><h4 class="no-wrap rightAir">
            <v-icon x-large :color="color">lens</v-icon>{{name}}
        </h4></v-flex></v-card-title>
        <v-divider/>
        <v-list dense>
            <v-list-tile v-for="axis in axises" :key="axis.axis">
                <v-list-tile-content>
                    <qt-unit-name :axis="axis"/>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-card>
</template>

<script>
    import QtUnitName from "./QtUnitName";

    export default {
        components: {QtUnitName},
        name:'axis-list',
        props:['name', 'axises', 'color']
    }
</script>