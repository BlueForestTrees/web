<template>
    <v-container fluid fill-height style="max-width: 700px;">
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md8>
                <v-card class="elevation-3">
                    <slot name="content"></slot>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
    export default{
        name:"card"
    }
</script>