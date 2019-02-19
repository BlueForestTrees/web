<template>
    <p class="font-weight-thin subheading font-italic">{{text}}</p>
</template>
<script>
    export default {
        name: "note",
        props: {text: String}
    }
</script>