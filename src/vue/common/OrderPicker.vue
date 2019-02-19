<template>
    <v-card>
        <v-container>
            <v-layout column align-center>
                <destination noqt :tree="up"/>
                <v-list-tile>
                    <v-icon x-large>call_merge</v-icon>
                </v-list-tile>
                <destination noqt :tree="down"/>
            </v-layout>
        </v-container>
        <v-layout>
            <v-spacer/>
            <v-btn dense @click="$emit('revert')"><v-icon>swap_horiz</v-icon>inverser</v-btn>
            <v-btn color="primary" @click="$emit('validate')">Ok</v-btn>
        </v-layout>
    </v-card>
</template>

<script>
    import Destination from "./Destination"
    export default{
        name:"order-picker",
        components: {Destination},
        props:['up','down']
    }
</script>