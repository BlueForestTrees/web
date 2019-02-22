<template>
    <v-container fill-height>
        <v-layout align-center>
            <v-layout column align-center>
                <v-progress-circular indeterminate color="primary" :width="width" :size="size"></v-progress-circular>
                <span v-if="text" class="font-italic" style="font-size: smaller">{{text}}</span>
            </v-layout>
        </v-layout>
    </v-container>
</template>
<script>
    export default {
        name: "loader",
        props: {text: String, width: {default: 3}, size: {default: 29}}
    }
</script>