<template>
    <v-snackbar
            v-model="snack.visible"
            bottom
            :multi-line="snack.multiline"
            :timeout="snack.timeout"
            :vertical="snack.vertical"
            :color="snack.color"
    >
        {{ snack.text }}
        <v-btn icon flat color="white" @click="close"><v-icon>close</v-icon></v-btn>
    </v-snackbar>
</template>

<script>
    export default {
        name: "snack",
        props: ['snack'],
        methods: {
            close: function () {
                this.snack.visible = false;
            }
        }
    }
</script>