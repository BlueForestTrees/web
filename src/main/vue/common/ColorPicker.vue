<template>
    <v-layout row>
        <v-btn x-large fab @click="changeColor" :style="{backgroundColor:color}">
            <v-icon :color="renewColor">autorenew</v-icon>
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
                color: getRandomColor()
            }
        },
        computed: {
            renewColor: function () {
                return getLuma(this.color) < 120 ? "white" : "black";
            }
        },
        methods: {
            changeColor: function () {
                this.color = getRandomColor();
                this.emitColorChange();
            },
            emitColorChange: function () {
                this.$emit('input', this.color);
            },
            required, isColor
        },
        mounted: function () {
            this.emitColorChange();
        }
    }
</script>