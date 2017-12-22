<template>
    <div>
        <span v-for="(trunk, i) in path" v-bind:key="trunk._id">
            <span @click="$emit('select',i)">{{trunk.qt}} {{trunk.name}}</span>
            <span v-if="i !== path.length - 1" @click="$emit('select-link',{trunk:path[i],root:path[i+1]})">></span>
        </span>
    </div>
</template>

<script>

    export default {
        name: "trunk-path",
        props: ['path']
    }
</script>