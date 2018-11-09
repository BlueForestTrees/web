<template>
    <v-container v-if="items.length > 0">
        <v-layout row wrap justify-center>
            <template v-for="item in items">
                <v-card :key="item._id" class="ma-1" :style="{borderRadius: '1.5em',background: isSelected(item) ? '#D8E9F5' : '', transition: 'background .2s ease'}">
                    <v-container py-2 pr-3 pl-2 @click="toggleSelect(item)" class="hand">
                        <v-layout row align-center>
                            <v-icon v-if="isSelected(item)" color="primary" style="margin-right:0.3em">check_circle</v-icon>
                            <v-icon v-else :style="'color: '+ color(item) +';margin-right:0.3em'">panorama_fish_eye</v-icon>
                            <span>{{name(item)}}</span>
                        </v-layout>
                    </v-container>
                </v-card>
            </template>
        </v-layout>
    </v-container>
</template>

<script>
    import selectable from "../mixin/Selectable"
    import {name, color} from "../../services/calculations"

    export default {
        name: 'basket-comp',
        props: ['maxSelectionSize','items'],
        mixins: [selectable],
        methods:{
            name, color
        }
    }
</script>