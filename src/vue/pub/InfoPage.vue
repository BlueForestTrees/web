<template>
    <info :path="path" :_id="_id" class="mt-5"></info>
</template>

<script>
    import Info from "./Info"
    export default {
        name: "InfoPage",
        components: {Info},
        props: ['path', '_id'],
    }
</script>