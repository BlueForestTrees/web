<template>
    <div class="font-weight-thin subheading font-italic pa-2">{{text}}</div>
</template>
<script>
    export default {
        name: "note",
        props: {text: String}
    }
</script>