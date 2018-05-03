<template>
    <v-list two-line>
        <v-subheader>Bilan Ressources
            <v-spacer/>
            <v-icon @click="open" style="cursor: pointer" v-if="oneSelected()">launch</v-icon>
            <v-tooltip top>
                <span slot="activator"><v-icon color="grey lighten-1">info</v-icon></span>
                <span>"BILAN RESSOURCES" : Ce sont les éléments qui ont été utilisés par les éléments qui ont été utilisés etc. mais qui n'utilisent rien eux-mêmes.</span>
            </v-tooltip>
        </v-subheader>
        <template v-for="item in items">
            <v-divider/>
            <v-list-tile avatar :key="item.name" @click="">
                <v-list-tile-content>
                    <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                    <v-list-tile-sub-title>
                        <qt-unit :quantity="item.quantity"/>
                    </v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-checkbox v-model="selection" :value="item"/>
                </v-list-tile-action>
            </v-list-tile>
        </template>
    </v-list>
</template>

<script>
    import QtUnit from "../common/QtUnit";
    import selectable from "../mixin/Selectable";
    import On from "../../const/on";
    import {mapActions} from 'vuex';


    export default {
        components: {QtUnit},
        name: 'bilan-ressources',
        props: ["tank"],
        mixins: [selectable],
        computed: {
            items: function () {
                return this.tank && this.tank.items;
            }
        },
        methods: {
            open() {
                this.dispatchOpenItem(this.selection[0]);
            },
            ...mapActions({
                dispatchOpenItem: On.LOAD_OPEN_TREE
            }),
        }

    }
</script>