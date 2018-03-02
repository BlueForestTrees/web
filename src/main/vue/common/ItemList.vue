<template>
    <v-layout v-if="dir" row wrap justify-center align-center>
        <template v-for="item in dir.items">
            <v-chip :key="item._id"
                    color="primary" text-color="white"
                    @click="$emit('select', item)">
                <qt-unit-name :item="item.trunk"/>
            </v-chip>
        </template>

        <v-chip key="addChip" color="primary" text-color="white"
                @click="$emit('add')">
            <v-icon>add</v-icon>
        </v-chip>

    </v-layout>
    <v-layout v-else row wrap justify-center align-center>
        <loading/>
    </v-layout>
</template>

<script>
    import Loading from "./Loading";
    import QtUnitName from "./QtUnitName";

    export default {
        components: {
            QtUnitName,
            Loading
        },
        name: 'item-list',
        props: ['dir']
    }
</script>