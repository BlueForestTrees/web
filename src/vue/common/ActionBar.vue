<template>
    <v-toolbar v-if="anySelected" dense app dark class="elevation-5" color="primary">

        <v-layout row>

            <v-btn icon v-if="oneSelected && selectionIsTree" @click="goTree(oneSelected)">
                <v-list-tile-avatar class="blueforest logo"></v-list-tile-avatar>
            </v-btn>

            <v-btn icon v-if="$route.name === GO.TREE && oneSelected" @click="goEquiv({tree, oneSelected})">
                <v-list-tile-avatar class="balance logo"/>
            </v-btn>

            <v-btn icon v-if="$route.name === GO.TREE && oneSelected" @click="goQuiDeuxFoisPlus({tree, oneSelected})">
                <v-list-tile-avatar class="game logo"></v-list-tile-avatar>
            </v-btn>

            <v-spacer/>
            <v-tooltip bottom>
                <v-btn slot="activator" icon dense @click="unselect">
                    <v-icon x-large>close</v-icon>
                </v-btn>
                <span style="pointer-events: none">Fermer</span>
            </v-tooltip>
        </v-layout>
    </v-toolbar>
</template>

<script>
    import selectable from "../mixin/Selectable"
    import {GO} from "../../const/go"
    import {mapGetters} from "vuex"

    export default {
        name: "action-bar",
        mixins: [selectable],
        data: () => ({GO}),
        computed: {
            ...mapGetters(['selectionIsTree'])
        }
    }
</script>