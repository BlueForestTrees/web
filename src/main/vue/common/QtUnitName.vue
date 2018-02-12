<template>
    <span>
        {{ item.quantity ? item.quantity.qt : '?' }}{{ item.quantity ? item.quantity.unit : '?'}} {{ item.name }}
    </span>
</template>

<script>
    export default {
        name: 'qt-unit-name',
        props: ['item']
    }
</script>