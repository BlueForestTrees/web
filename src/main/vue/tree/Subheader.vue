<template>
    <span>
        <v-subheader>
            <v-layout row align-center justify-center><v-icon>{{icon}}</v-icon><h4>{{title}}</h4></v-layout>
        </v-subheader>
        <v-divider/>
    </span>
</template>
<script>
    export default {
        props:['icon','title']
    }
</script>