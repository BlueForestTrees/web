<template>
    <v-container>
        <v-layout row align-center>
            <v-text-field label="Nom" autofocus v-model="name" @enter="emitSelect" clearable v-on:keyup.enter="emitSelect"/>
            <v-spacer/>
            <v-btn color="primary" @click="emitSelect">Ok</v-btn>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "search-name",
        data() {
            return {
                name: null
            }
        },
        methods: {
            emitSelect() {
                this.$emit("input", this.name)
                this.name = null
            }
        }
    }
</script>