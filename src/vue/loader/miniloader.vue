<template>
    <v-progress-circular indeterminate color="primary" :width="width" :size="size"/>
</template>
<script>
    export default {
        name: "mini-loader",
        props:['width', 'size']
    }
</script>