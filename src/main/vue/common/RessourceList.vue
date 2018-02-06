<template>
    <v-container>
        <v-layout v-if="last.roots" row wrap justify-center align-center>
            <template v-for="root in last.roots.items">
                <v-chip :key="root._id"
                        color="primary" text-color="white"
                        @click="$emit('select', root)">
                    <qt-unit-name :trunk="root.trunk"/>
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
    </v-container>
</template>

<script>
    import Loading from "./Loading";
    import QtUnitName from "./QtUnitName";

    export default {
        components: {
            QtUnitName,
            Loading
        },
        name: 'ressource-list',
        props: ['last']
    }
</script>