<template>
    <v-chip color="primary" text-color="white" @click="$emit('select')">
        <qt-unit-name-label :item="item.trunk" />
        <span v-if="selected">
            <v-icon right color="white"
                    @click.stop="$emit('load')">
                search
            </v-icon>
            <v-icon right color="white"
                    @click.stop="$emit('configure')">
                edit
            </v-icon>
            <v-icon right color="white"
                    @click.stop="$emit('remove')">
                delete
            </v-icon>
        </span>
    </v-chip>
</template>

<script>
    import QtUnitName from "QtUnitNameLabel";

    export default {
        components: {QtUnitName},
        name:'item',
        props:['item','selected'],
    }
</script>