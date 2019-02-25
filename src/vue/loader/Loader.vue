<template>
    <v-container fill-height>
        <v-layout align-center>
            <v-layout column align-center>
                <mini-loader :width="width" :size="size"/>
                <span v-if="text" class="font-italic" style="font-size: smaller">{{text}}</span>
            </v-layout>
        </v-layout>
    </v-container>
</template>
<script>
    import MiniLoader from "./miniloader"
    export default {
        name: "loader",
        components: {MiniLoader},
        props: {text: String, width: {default: 3}, size: {default: 29}}
    }
</script>