<template>
    <v-list-tile v-if="item">
        <v-icon x-large :style="{color: item.color || 0,marginRight:'0.2em'}">lens</v-icon>
        <h3>{{`${item.qt} ${item.unit} ${item.name}`}}</h3>
    </v-list-tile>
</template>

<script>
    export default {
        name: 'color-qt-unit-name',
        props: ['item']
    }
</script>