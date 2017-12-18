<template>
    <div>
        <span v-for="(trunk, i) in trunks" v-bind:key="trunk._id" @click="select(trunk)">
            {{trunk.name}}<span v-if="i !== trunks.length - 1">, </span>
        </span>
    </div>
</template>

<script>

    export default {
        name: "trunk-list",
        props: ['trunks'],
        methods: {
            select(trunk) {
                this.$emit('select', trunk);
            }
        }
    }
</script>