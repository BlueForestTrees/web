<template>
    <v-menu v-if="tree" offset-y>
        <v-btn fab bottom right color="blue darken-3" dark fixed slot="activator">
            <v-icon>add</v-icon>
        </v-btn>
        <v-list>
            <v-list-tile @click="show(Dial.ADD_USAGE)">
                <v-list-tile-avatar><v-icon>call_split</v-icon></v-list-tile-avatar>
                <v-list-tile-title>Usage</v-list-tile-title>
            </v-list-tile>
            <v-divider/>
            <v-list-tile @click="show(Dial.ADD_IMPACT)">
                <v-list-tile-avatar><v-icon>keyboard_tab</v-icon></v-list-tile-avatar>
                <v-list-tile-title>Impact</v-list-tile-title>
            </v-list-tile>
            <v-divider/>
            <v-list-tile @click="show(Dial.ADD_FACET)">
                <v-list-tile-avatar><v-icon>more_horiz</v-icon></v-list-tile-avatar>
                <v-list-tile-title>Propriété</v-list-tile-title>
            </v-list-tile>
            <v-divider/>
            <v-list-tile @click="show(Dial.ADD_RESSOURCE)">
                <v-list-tile-avatar><v-icon>call_merge</v-icon></v-list-tile-avatar>
                <v-list-tile-title>Ressource</v-list-tile-title>
            </v-list-tile>
        </v-list>
    </v-menu>
    <v-btn v-else fab bottom right color="pink" dark fixed @click.stop="show(Dial.ADD_TRUNK)">
        <v-icon>add</v-icon>
    </v-btn>
</template>

<script>
    import Do from "../../const/do";
    import {mapMutations, mapState} from 'vuex';
    import {Dial} from "../../const/dial";

    export default {
        data: function () {return {Dial}},
        computed: {
            ...mapState({basket: state => state.basket}),
            tree: function () {
                return this.basket[0];
            }
        },
        methods: {
            ...mapMutations([Do.SHOW_DIALOG]),
            show(dialog) {
                this.showDialog({dialog, data: {tree: this.tree}});
            }
        }
    }
</script>