<template>
    <v-layout row>
        <v-menu>
            <v-btn slot="activator" x-large fab :style="{backgroundColor:color}">
                <v-icon :color="arrowColor">autorenew</v-icon>
            </v-btn>
            <swatches v-model="color" inline colors="text-advanced" popover-to="left"/>
        </v-menu>
        <v-text-field label="Couleur" :rules="[isColor]" required v-model="color"/>
    </v-layout>
</template>

<script>
    import {getLuma, getRandomColor, overcolor} from "../../services/calculations"
    import {isColor, required} from "../../services/rules"
    import Swatches from 'vue-swatches'

    export default {
        name: 'color-picker',
        props: ['value'],
        data: function () {
            return {
                c: null
            }
        },
        components: {
            Swatches
        },
        computed: {
            color: {
                get: function () {
                    if (!this.c) this.c = getRandomColor()
                    return this.c
                },
                set: function (value) {
                    this.c = value
                    this.emitColorChange()
                }
            },
            arrowColor: function () {
                return overcolor(this.c)
            }
        },
        methods: {
            emitColorChange: function () {
                this.$emit('input', this.color)
            },
            required, isColor
        }
    }
</script>