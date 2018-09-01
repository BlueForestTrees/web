<template>
        <v-menu offset-y>
            <v-btn class="elevation-3"  fab bottom right color="blue" dark fixed slot="activator">
                <v-icon>add</v-icon>
            </v-btn>
            <v-list>
                <v-list-tile @click="show(Dial.ADD_USAGE)" style="padding-right: 2em">
                    <v-list-tile-avatar><v-icon>call_split</v-icon></v-list-tile-avatar>
                    <v-list-tile-title>Usage</v-list-tile-title>
                </v-list-tile>
                <v-divider/>
                <v-list-tile @click="show(Dial.ADD_IMPACT)" style="padding-right: 2em">
                    <v-list-tile-avatar><v-icon>keyboard_tab</v-icon></v-list-tile-avatar>
                    <v-list-tile-title>Externalité</v-list-tile-title>
                </v-list-tile>
                <v-divider/>
                <v-list-tile @click="show(Dial.ADD_FACET)" style="padding-right: 2em">
                    <v-list-tile-avatar><v-icon>more_horiz</v-icon></v-list-tile-avatar>
                    <v-list-tile-title>Propriété</v-list-tile-title>
                </v-list-tile>
                <v-divider/>
                <v-list-tile @click="show(Dial.ADD_RESSOURCE)" style="padding-right: 2em">
                    <v-list-tile-avatar><v-icon>call_merge</v-icon></v-list-tile-avatar>
                    <v-list-tile-title>Ressource</v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-menu>

</template>

<script>
    import Do from "../../const/do"
    import {mapMutations} from 'vuex'
    import {Dial} from "../../const/dial"

    export default {
        name:"add-tree-part-btn",
        data: function () {return {Dial}},
        props:['tree'],
        methods: {
            ...mapMutations([Do.SHOW_DIALOG]),
            show(dialog) {
                this.showDialog({dialog, data: {tree: this.tree}})
            }
        }
    }
</script>