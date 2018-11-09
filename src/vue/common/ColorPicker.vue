<template>
    <v-layout row align-center>
        <v-btn flat icon>
            <v-icon @click="color=null">autorenew</v-icon>
        </v-btn>
        <v-text-field label="Couleur" :rules="[isColor]" required v-model="color"/>
        <v-menu>
            <v-btn slot="activator" x-large fab :style="{backgroundColor:color}">
                <v-icon :color="arrowColor">edit</v-icon>
            </v-btn>
            <swatches v-model="color" inline colors="text-advanced" popover-to="left"/>
        </v-menu>
    </v-layout>
</template>

<script>
    import {getRandomColor, overcolor} from "../../services/calculations"
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
        mounted() {
            this.emitColorChange()
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