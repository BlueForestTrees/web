<template>
    <v-layout v-if="dir" row wrap justify-center align-center>
        <template v-for="item in dir.items">
            <v-chip :key="item._id"
                    color="primary" text-color="white"
                    @click="select(item)">
                <qt-unit-name-label :item="item.trunk"/>
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
    import QtUnitName from "QtUnitNameLabel";

    export default {
        components: {
            QtUnitName,
            Loading
        },
        name: 'item-list',
        props: ['dir'],
        methods: {
            select(item) {
                this.$emit('select', item);
            }
        }
    }
</script>