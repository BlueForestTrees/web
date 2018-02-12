<template>
    <v-card>
        <v-toolbar>
            <v-toolbar-title>Bilan Ressources</v-toolbar-title>
            <v-spacer/>
            <v-icon @click="" style="cursor: pointer">add</v-icon>
        </v-toolbar>

        <v-container grid-list-md text-xs-center v-if="tank">
            <v-layout row>
                <v-flex>
                    <template v-for="item in tank.items">
                        <v-chip :key="item._id"
                                color="primary" text-color="white">
                            <qt-unit-name :item="item"/>
                        </v-chip>
                    </template>
                </v-flex>
            </v-layout>
        </v-container>

    </v-card>

</template>

<script>
    import QtUnitName from "../common/QtUnitName";

    export default {
        components: {QtUnitName},
        name: 'tank',
        props: ["tree"],
        computed: {
            tank: function () {
                return this.tree.tank;
            }
        }
    }
</script>