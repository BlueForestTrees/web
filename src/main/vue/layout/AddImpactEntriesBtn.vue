<template>
    <v-menu offset-y>
        <v-btn class="elevation-3" fab bottom right color="grey" dark fixed slot="activator">
            <v-icon>add</v-icon>
        </v-btn>
        <v-list>
            <v-list-tile @click="show(Dial.ADD_IMPACT_ENTRY)">
                <v-list-tile-avatar>
                    <v-icon>keyboard_tab</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-title>Créer une catégorie d'impact</v-list-tile-title>
            </v-list-tile>
        </v-list>
    </v-menu>
</template>

<script>
    import {Dial} from "../../const/dial"
    import {mapActions} from 'vuex'
    import On from "../../const/on"

    export default {
        name: "add-impact-entries-btn",
        data: function () {
            return {Dial}
        },
        methods: {
            ...mapActions([On.SHOW_DIALOG]),
            show(dialog) {
                this.showDialog({dialog, data: {tree: this.tree}})
            }
        }
    }
</script>