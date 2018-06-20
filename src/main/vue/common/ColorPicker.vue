<template>
    <v-layout row>
        <v-btn x-large fab @click="randomizeColor" :style="{backgroundColor:color}">
            <v-icon :color="arrowColor">autorenew</v-icon>
        </v-btn>
        <v-text-field label="Couleur" :rules="[isColor]" required v-model="color"/>
    </v-layout>
</template>

<script>
    import {getLuma, getRandomColor} from "../../services/calculations";
    import {isColor, required} from "../../services/rules";

    export default {
        name: 'color-picker',
        props: ['value'],
        data: function () {
            return {
                c: null
            }
        },
        computed: {
            color: {
                get: function () {
                    if (!this.c) this.c = getRandomColor();
                    return this.c;
                },
                set: function (value) {
                    this.c = value;
                    this.emitColorChange();
                }
            },
            arrowColor: function () {
                return getLuma(this.c) < 120 ? "white" : "black";
            }
        },
        methods: {
            randomizeColor: function () {
                this.color = getRandomColor();
            },
            emitColorChange: function () {
                this.$emit('input', this.color);
            },
            required, isColor
        }
    }
</script>