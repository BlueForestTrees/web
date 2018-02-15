<template>
    <span v-if="item">
        {{ item.quantity ? item.quantity.qt : '?' }}{{ item.quantity ? item.quantity.unit : '?'}} {{ item.name }}
    </span>
    <span v-else-if="axis">
        {{axis.qt}}{{axis.unit}} {{axis.axis}}
    </span>
</template>

<script>
    export default {
        name: 'qt-unit-name',
        props: ['item','axis']
    }
</script>