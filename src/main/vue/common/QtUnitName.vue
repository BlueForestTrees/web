<template>
    <span>
        {{ trunk.quantity ? trunk.quantity.qt : '?' }}{{ trunk.quantity ? trunk.quantity.unit : '?'}} {{ trunk.name }}
    </span>
</template>

<script>
    export default {
        name: 'qt-unit-name',
        props: ['trunk']
    }
</script>