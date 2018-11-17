<template>
    <v-snackbar
            v-model="snack.visible"
            auto-height bottom
            :multi-line="snack.multiline"
            :timeout="snack.timeout"
            :vertical="snack.vertical"
            :color="snack.color"
    >
        <v-layout column align-center>
            <v-layout row align-center>
                <span>{{ snack.text }}</span>
                <v-btn icon flat color="white" @click="close">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-layout>
            <v-btn v-if="snack.link" flat @click="dispatchAction">
                <v-icon>{{snack.link.icon}}</v-icon>
                {{snack.link.text}}
            </v-btn>
        </v-layout>
    </v-snackbar>
</template>

<script>

    export default {
        name: "snack",
        props: ['snack'],
        methods: {
            close: function () {
                this.snack.visible = false
            },
            dispatchAction() {
                this.$store.dispatch(this.snack.link.action)
                this.close()
            }
        }
    }
</script>