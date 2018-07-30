<template>
    <v-card>
        <v-card-title>
            <h4 class="no-wrap rightAir">
                <v-icon x-large :color="color">lens</v-icon>{{name}}
            </h4>
        </v-card-title>
    <v-list dense>
        <v-list-tile v-if="axises.length > 0" v-for="axis in axises" :key="axis.name">
            <v-list-tile-content>
                <v-flex class="no-wrap">{{qtUnitName(axis)}}</v-flex>
            </v-list-tile-content>
        </v-list-tile>
    </v-list>
    </v-card>
</template>

<script>

    import {qtUnitName} from "../../services/calculations"

    export default {
        name: 'axis-list',
        props: ['name', 'axises', 'color'],
        methods: {
            qtUnitName
        }
    }
</script>