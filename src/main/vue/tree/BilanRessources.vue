<template>
    <v-list two-line>
        <v-subheader>Bilan Ressources<v-spacer/>
            <v-btn icon ripple><v-icon color="grey lighten-1">info</v-icon></v-btn></v-subheader>
        <template v-for="item in items">
            <v-divider/>
            <v-list-tile avatar :key="item.name" @click="">
                <v-list-tile-content>
                    <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                    <v-list-tile-sub-title>
                        <qt-unit :quantity="item.quantity"/>
                    </v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
        </template>
    </v-list>
</template>

<script>
    import QtUnit from "../common/QtUnit";

    export default {
        components: {QtUnit},
        name: 'bilan-ressources',
        props: ["tank"],
        computed: {
            items: function () {
                return this.tank && this.tank.items;
            }
        }
    }
</script>