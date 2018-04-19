<template>
    <v-list two-line subheader>
        <v-subheader>{{header}}</v-subheader>
        <v-list-tile avatar v-for="item in items" :key="item.trunk.name" @click="">
            <v-list-tile-content>
                <v-list-tile-title>{{ item.trunk.name }}</v-list-tile-title>
                <v-list-tile-sub-title>
                    <QtUnit :quantity="item.trunk.quantity"/>
                </v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
                <v-btn icon ripple>
                    <v-icon color="grey lighten-1">info</v-icon>
                </v-btn>
            </v-list-tile-action>
        </v-list-tile>
    </v-list>
</template>
<script>
    import QtUnit from "../common/QtUnit";

    export default {
        name: "new-list",
        components: {QtUnit},
        props: ['items', 'header']
    }
</script>