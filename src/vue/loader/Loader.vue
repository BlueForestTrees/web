<template>
    <v-flex my-2>
        <slot></slot>
        <v-layout column align-center>

        <svg class="loader" xmlns="http://www.w3.org/2000/svg" viewBox="-100 -100 400 400" preserveAspectRatio="xMidYMid">
            <g transform="translate(78,105)">
                <circle fill="none" stroke="#1565c0" stroke-width="25" r="150" stroke-dasharray="400 30 80 30 20 30 3 520">
                    <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0;360" dur="0.35s" begin="0s" repeatCount="indefinite"></animateTransform>
                </circle>
            </g>
        </svg>
        </v-layout>
    </v-flex>
</template>
<script>
    export default {
        name: "loader"
    }
</script>