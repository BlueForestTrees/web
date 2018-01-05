<template>
    <h1>{{tree.name}}</h1>

    <!--<trunk-path :path="path" v-on:select="onPathClick"-->
    <!--v-on:select-link="onPathLinkClick"></trunk-path>-->

</template>

<script>
    export default {
        props:['tree']
    }
</script>