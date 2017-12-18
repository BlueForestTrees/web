<template>
    <div>
        <span v-for="(trunk, i) in path" v-bind:key="trunk._id" @click="select(i)">
            {{trunk.name}}<span v-if="i !== path.length - 1"> > </span>
        </span>
    </div>
</template>

<script>

    export default {
        name: "trunk-path",
        props: ['path'],
        methods: {
            select(idx) {
                this.$emit('select',idx);
            }
        }
    }
</script>